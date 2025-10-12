import Blog from '../Schema/Blog.js';
import User from '../Schema/User.js';
import Comment from '../Schema/Comment.js';
import Notification from '../Schema/Notification.js';
import { generateBlogId, formatTags } from '../utils/blog.js';

export const getLatestBlogs = async (req, res) => {
    const { page } = req.body;

    Blog.find({ draft: false })
        .populate("author", "personal_info.profile_img personal_info.username personal_info.fullname -_id")
        .sort({ "publishedAt": -1 })
        .select("blog_id title des banner activity tags publishedAt -_id")
        .then(blogs => {
            return res.status(200).json({ blogs });
        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        });
};

export const getTrendingBlogs = async (req, res) => {
    Blog.find({ draft: false })
        .populate("author", "personal_info.profile_img personal_info.username personal_info.fullname -_id")
        .sort({ "activity.total_read": -1, "activity.total_likes": -1, "publishedAt": -1 })
        .select("blog_id title publishedAt -_id")
        .limit(5)
        .then(blogs => {
            return res.status(200).json({ blogs });
        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        });
};

export const createBlog = async (req, res) => {
    const authorId = req.user;
    let { title, des, banner, tags, content, id } = req.body;

    tags = formatTags(tags);
    const blog_id = generateBlogId(title, id);

    if (id) {
        Blog.findOneAndUpdate({ blog_id }, {
            title, des, banner, tags, content
        })
            .then(blog => {
                return res.status(200).json({ id: blog.blog_id });
            })
            .catch(err => {
                return res.status(500).json({ error: err.message });
            });
    } else {
        const blog = new Blog({
            title, des, banner, content, tags, author: authorId, blog_id,
        });
        
        blog.save().then(blog => {
            User.findOneAndUpdate({ _id: authorId }, { 
                $inc: { "account_info.total_posts": 1 }, 
                $push: { "blogs": blog._id } 
            })
                .then(user => {
                    return res.status(200).json({ id: blog.blog_id });
                })
                .catch(err => {
                    return res.status(500).json({ error: "failed to update postNum" });
                });
        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        });
    }
};

export const getBlog = async (req, res) => {
    const { blog_id, mode } = req.body;
    const incrementVal = mode != 'edit' ? 1 : 0;
    
    Blog.findOneAndUpdate({ blog_id }, { $inc: { "activity.total_reads": incrementVal } })
        .populate("author", "personal_info.fullname personal_info.username personal_info.profile_img")
        .select("title des content banner activity publishedAt blog_id tags")
        .then(blog => {
            User.findOneAndUpdate({ "personal_info.username": blog.author.personal_info.username }, {
                $inc: { "account_info.total_reads": incrementVal }
            })
                .catch(err => {
                    return res.status(500).json({ error: err.message });
                });
            return res.status(200).json({ blog });
        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        });
};

export const getUserWrittenBlogs = async (req, res) => {
    const user_id = req.user;
    const { page } = req.body;

    Blog.find({ author: user_id })
        .sort({ "publishedAt": -1 })
        .select("blog_id title des banner activity publishedAt -_id")
        .then(blogs => {
            return res.status(200).json({ blogs });
        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        });
};

export const deleteBlog = async (req, res) => {
    const user_id = req.user;
    const { blog_id } = req.body;

    if (!blog_id) {
        return res.status(403).json({ error: "Blog ID is must" });
    }

    Blog.findOneAndDelete({ blog_id })
        .then(blog => {
            if (!blog) {
                return res.status(403).json({ error: "Blog not found" });
            }

            // Cleanup notifications and comments associated with the deleted blog
            Notification.deleteMany({ blog: blog._id })
                .then(() => console.log("Notifications deleted"))
                .catch(err => console.log("Error deleting notifications:", err));

            Comment.deleteMany({ blog_id: blog.blog_id })
                .then(() => console.log("Comments deleted"))
                .catch(err => console.log("Error deleting comments:", err));

            User.findOneAndUpdate(
                { _id: user_id },
                { $inc: { "account_info.total_posts": -1 }, $pull: { blog: blog._id } }
            )
                .then(() => console.log("User blog removed"))
                .catch(err => console.log("Error updating user:", err));

            Blog.find({ author: user_id })
                .sort({ "publishedAt": -1 })
                .select("blog_id title des banner activity publishedAt -_id")
                .then(updatedBlogs => {
                    return res.status(200).json({ status: "deleted", blogs: updatedBlogs });
                })
                .catch(err => {
                    return res.status(500).json({ error: "Error fetching updated blogs: " + err.message });
                });
        })
        .catch(err => {
            return res.status(500).json({ error: "Failed to delete blog: " + err.message });
        });
};
