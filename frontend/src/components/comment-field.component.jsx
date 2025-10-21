import React from 'react'
import { useState, useContext } from 'react'
import { UserContext } from '../App';
import toast from 'react-hot-toast';
import axios from 'axios';
import { BlogContext } from '../pages/blog.page';

const CommentField = ({ action, index = undefined, replyingTo = undefined, setReply }) => {
    let ctx = useContext(BlogContext);
    let blog = ctx?.blog || {};
    let _id = blog?._id;
    let blog_author = blog?.author?._id;
    let comments = blog?.comments;
    let activity = blog?.activity || {};
    let { total_likes = 0, total_parent_comments = 0, total_comments = 0 } = activity;
    let { setBlog, totalParentCommentsLoaded, setTotalParentCommentsLoaded } = ctx || {};
    
    let { userAuth: { access_token, username, fullname, profile_img } } = useContext(UserContext);
    const [comment, setComment] = useState("");

    const commentsArr = comments ? comments.results : [];
    // console.log(commentsArr);
    const handleComment = () => {
        if (!_id || !blog_author) {
            return toast.error("Blog not ready yet");
        }
        if (!access_token) {
            return toast.error("Login to comment");
        }
        if (!comment.length) {
            // console.log("comment");
            return toast.error("Comment cannot be empty");
        }
        // console.log("jdhdijhahdiu", replyingTo);
        axios.post(import.meta.env.VITE_BACKEND_URL + "/add-comment", {
            comment,
            _id,
            blog_author,
            replying_to: replyingTo
        }, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
            .then(({ data }) => {
                // console.log(data);
                setComment("");
                data.commented_by = { personal_info: { username, profile_img, fullname } };

                let newCommentArr;

                if (replyingTo && commentsArr[index].childrenLevel) {
                    commentsArr[index].childrenLevel.push(data._id);

                    data.childrenLevel = commentsArr[index].childrenLevel + 1;

                    data.parentIndex = index;

                    commentsArr[index].isReplyLoaded = true

                    commentsArr.splice(index + 1, 0, data);
                    newCommentArr = commentsArr;
                }
                else {
                    data.childrenLevel = 0;
                    newCommentArr = [data, ...commentsArr];
                }


                let parentCommentIncVal = replyingTo ? 0 : 1;

                setBlog({ ...blog, comments: { ...comments, results: newCommentArr }, activity: { ...activity, total_comments: total_comments + 1, total_parent_comments: total_parent_comments + parentCommentIncVal } });

                setTotalParentCommentsLoaded(preVal => preVal + parentCommentIncVal);

                toast.success("Commented successfully");
            })
            .catch(err => {
                console.log(err);
                toast.error("Failed to comment");
            }
            )
    }


    return (
        <>
            <textarea value={comment} placeholder='leave a comment...'
                onChange={(e) => setComment(e.target.value)}
                className='input-box pl-5 placeholder.text-dark-grey resize-none h-[150px] overflow-auto'></textarea>
            <button
                onClick={handleComment}
                className='btn-dark mt-5 px-10'>{action}</button>
        </>
    )
}

export default CommentField