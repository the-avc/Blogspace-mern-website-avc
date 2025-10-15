import React from 'react'
import { useState, useContext } from 'react'
import { UserContext } from '../App';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { BlogContext } from '../pages/blog.page';

const CommentField = ({ action, index = undefined, replyingTo = undefined, setReply }) => {
    let { blog, blog: { _id, author: { _id: blog_author }, comments, activity, activity: { total_likes, total_parent_comments, total_comments } }, setBlog, totalParentCommentsLoaded, setTotalParentCommentsLoaded } = useContext(BlogContext);
    
    let { userAuth: { access_token, username, fullname, profile_img } } = useContext(UserContext);
    const [comment, setComment] = useState("");

    const commentsArr = comments ? comments.results : [];
    // console.log(commentsArr);
    const handleComment = () => {
        if (!access_token) {
            return toast.error("Login to comment");
        }
        if (!comment.length) {
            // console.log("comment");
            return toast.error("Comment cannot be empty");
        }
        // console.log("jdhdijhahdiu", replyingTo);
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/add-comment", {
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
            <Toaster />
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