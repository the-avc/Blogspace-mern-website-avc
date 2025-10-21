import Blog from '../models/Blog.js';
import Notification from '../models/Notification.js';

export const likeBlog = async (req, res) => {
    const user_id = req.user;
    const { _id, liked } = req.body;
    const incrementVal = liked ? -1 : 1;
    
    Blog.findOneAndUpdate(
        { _id },
        { $inc: { "activity.total_likes": incrementVal } },
        { timestamps: false }
    )
        .then(blog => {
            if (!liked) {
                const like = new Notification({
                    type: "like",
                    blog: _id,
                    notification_for: blog.author,
                    user: user_id
                });
                
                like.save().then((notification) => {
                    return res.status(200).json({ liked: true });
                });
            } else {
                Notification.findOneAndDelete({ type: "like", blog: _id, user: user_id })
                    .then(() => {
                        return res.status(200).json({ liked: false });
                    })
                    .catch(err => {
                        return res.status(500).json({ error: err.message });
                    });
            }
        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        });
};

export const isLiked = async (req, res) => {
    const user_id = req.user;
    const { _id } = req.body;
    
    Notification.findOne({ type: "like", blog: _id, user: user_id })
        .then(result => {
            return res.status(200).json({ result });
        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        });
};

