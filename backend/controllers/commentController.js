import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import Notification from '../models/Notification.js';

export const addComment = async (req, res) => {
    const user_id = req.user;
    const { _id, comment, replying_to, blog_author } = req.body;

    const commentObj = {
        blog_id: _id,
        blog_author,
        comment,
        commented_by: user_id,
    };

    new Comment(commentObj).save().then(async commentFile => {
        const { comment, commentedAt, children } = commentFile;

        Blog.findOneAndUpdate(
            { _id },
            {
                $push: { "comments": commentFile._id },
                $inc: { "activity.total_comments": 1, "activity.total_parent_comments": replying_to ? 0 : 1 }
            },
            { timestamps: false }
        ).then((blog) => {
            console.log("Comment added to blog");
        });

        // Initialize notification object
        const notificationObj = {
            type: replying_to ? "reply" : "comment",
            blog: _id,
            notification_for: blog_author,
            user: user_id,
            comment: commentFile._id
        };

        // Save notification to database
        new Notification(notificationObj).save().then((notification) => {
            return res.status(200).json({ comment, commentedAt, user_id, children, _id: commentFile._id });
        }).catch(err => {
            return res.status(500).json({ error: err.message });
        });
    }).catch(err => {
        return res.status(500).json({ error: err.message });
    });
};

export const getBlogComments = async (req, res) => {
    const { blog_id, skip } = req.body;
    const maxLimit = 5;
    
    Comment.find({ blog_id, isReply: false })
        .populate("commented_by", "personal_info.username personal_info.profile_img personal_info.fullname")
        .skip(skip)
        .limit(maxLimit)
        .sort({ "commentedAt": -1 })
        .then(comment => {
            return res.status(200).json(comment);
        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        });
};

export const deleteComment = async (req, res) => {
    const user_id = req.user;
    const { _id } = req.body;

    Comment.findOne({ _id })
        .then(comment => {
            if (user_id == comment.commented_by || user_id == comment.blog_author) {
                Comment.deleteOne({ _id })
                    .then(() => {
                        return res.status(200).json({ status: "deleted" });
                    })
                    .catch(err => {
                        return res.status(500).json({ error: err.message });
                    });

                Notification.findOneAndDelete({ comment: _id })
                    .then(() => {
                        console.log("Notification deleted");
                    })
                    .catch(err => {
                        return res.status(500).json({ error: err.message });
                    });
                
                Notification.findOneAndDelete({ reply: _id })
                    .then(() => {
                        console.log("Reply deleted");
                    })
                    .catch(err => {
                        return res.status(500).json({ error: err.message });
                    });

                Blog.findOneAndUpdate(
                    { _id: comment.blog_id },
                    { 
                        $pull: { comments: _id }, 
                        $inc: { 
                            "activity.total_comments": -1,
                            "activity.total_parent_comments": comment.parent ? 0 : -1 
                        }
                    },
                    { timestamps: false }
                )
                    .then(() => {
                        console.log("Comment removed from blog");
                    })
                    .catch(err => {
                        return res.status(500).json({ error: err.message });
                    });
            } else {
                return res.status(403).json({ error: "You are not allowed to delete this comment" });
            }
        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        });
};

