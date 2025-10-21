import React from 'react'
import { useContext, useState } from 'react'
import { getDay } from '../common/date';
import { UserContext } from '../App';
import { toast, Toaster } from 'react-hot-toast';
import CommentField from './comment-field.component';
import { BlogContext } from '../pages/blog.page';
import axios from 'axios';

const CommentCard = ({ index, leftVal, commentData }) => {
    // console.log("leftval",leftVal);
    let { commented_by: { personal_info: { username: commented_by_username, fullname, profile_img } }, commentedAt, comment, _id } = commentData;

    let { userAuth: { access_token, username } } = useContext(UserContext);
    let{blog, blog:{comments,comments:{results:commentsArr}, author:{personal_info:{username:blog_author}}}, setBlog} = useContext(BlogContext);

    const [isReply, setReply] = useState(false);
    const handleReplyClick = () => {
        if (!access_token) {
            return toast.error("Login to reply");
        }
        setReply(preVal => !preVal);
    }

    const handleDeleteClick = (e) => {
        e.target.setAttribute("disabled", "true");
        // console.log("delete");
        axios.post(import.meta.env.VITE_BACKEND_URL + "/delete-comment", { _id }, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
            .then(({ data }) => {
                e.target.removeAttribute("disabled");  
                console.log(data);
                let newCommentsArr = commentsArr.filter(comment => comment._id != _id);
                setBlog({ ...blog, comments: { ...comments, results: newCommentsArr }, activity: { ...blog.activity, total_comments: blog.activity.total_comments - 1 } });
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            <Toaster />
            <div className="w-full" style={{ paddingLeft: `${leftVal * 10}px` }}>
                <div className="my-5 py-6 rounded-lg border border-grey">
                    <div className="flex gap-3 items-center mb-8">
                        <img src={profile_img} alt={commented_by_username}
                            className='w-8 h-8 rounded-full' />
                        <p className="line-clamp-1">@{commented_by_username}</p>
                        <p className='min-w-fit text-sm'>{getDay(commentedAt)}</p>
                    </div>
                    <p className='font-gelasio text-xl ml-3'>{comment}</p>

                    <div className="flex gap-5 items-center mt-5 px-2">
                        <button
                            onClick={handleReplyClick}
                            className='underline p-1 hover:bg-grey/50 text-base'>
                            Reply
                        </button>

                        {
                            username==commented_by_username || username ==
                            blog_author?
                            <button
                                onClick={handleDeleteClick}
                                className='p-2 px-3 rounded-md border border-grey ml-auto hover:bg-red/30 flex items-center'>
                                <i className="fi fi-br-trash"></i>
                            </button> : ""
                        }
                    </div>

                    {
                        isReply ?
                            <div className='mt-8'>
                                <CommentField action={"Reply"} index={index} replyingTo={_id} setReply={setReply} />
                            </div>
                            : ""
                    }

                </div>
            </div>
        </>
    )
}

export default CommentCard