import React, { useContext } from 'react'
import { BlogContext } from '../pages/blog.page.jsx'
import CommentField from './comment-field.component.jsx';
import axios from 'axios';
import NoDataMessage from './nodata.component.jsx';
import AnimationWrapper from '../common/page-animation.jsx';
import CommentCard from './comment-card.component.jsx';

export const fetchComments = async ({ skip = 0, blog_id, setParentCommentCountFun, comment_array = null }) => {
    let res;

    await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-blog-comments", { blog_id, skip })
        .then(({ data }) => {
            // console.log(data)
            data.map(comment => {
                comment.childrenLevel = 0;
            })

            setParentCommentCountFun(preVal => preVal + data.length);
            if (comment_array == null) {
                res = { results: data }
            }
            else {
                res = { results: [...comment_array, ...data] }
            }
        }
        )
        .catch(err => {
            console.log(err);
        })
    return res;
}
const CommentsContainer = () => {
    let { blog, blog: { _id, title, comments, activity: { total_parent_comments } }, commentWrapper, setCommentWrapper, totalParentCommentsLoaded, setTotalParentCommentsLoaded, setBlog } = useContext(BlogContext);

    const commentsArr = comments ? comments.results : [];
    // console.log(commentsArr);

    const loadMoreComments = async () => {
        let newCommentsArr = await fetchComments({ skip: totalParentCommentsLoaded, blog_id: _id, setParentCommentCountFun: setTotalParentCommentsLoaded, comment_array: commentsArr });
        setBlog({ ...blog, comments: newCommentsArr });
    }
    return (
        // <div>CommentsContainer</div>
        <div className={"max-sm:w-full fixed " + (commentWrapper ? "top-0 sm:right-0" : "top-[100%] sm:right-[-100%]") + " duration-700 max-sm:right-0 sm:top-0 w-[30 %] min-w-[300px] max-w-[400px] h-full z-50 bg-white shadow-2xl p-8 px-16 overflow-y-auto overflow-x-hidden"}>

            <div className="relative">
                <h1 className="text-xl font-semibold">Comments</h1>
                <p className="text-lg mt-2 w-[70%]">{title}</p>
                <button
                    onClick={() => setCommentWrapper(preVal => !preVal)}
                    className='absolute top-0 right-0 flex justify-center items-center rounded-full w-12 h-12 bg-grey'>
                    <i className="fi fi-br-cross text-xl mt-1"></i>
                </button>

            </div>
            <hr className="border-grey my-8 w-[120%] -ml-10" />
            <CommentField action={"Comment"} />

            {
                commentsArr && commentsArr.length ?
                    commentsArr.map((comment, i) => {
                        return <AnimationWrapper key={i}>
                            <CommentCard index={i} leftVal={comment.childrenLevel * 4} commentData={comment} />
                            {/* {console.log(comment)} */}
                        </AnimationWrapper>
                    })
                    : <div className='mt-3'>
                        <NoDataMessage message="No comments yet" />
                    </div>
            }

            {
                total_parent_comments > totalParentCommentsLoaded ?
                    <button
                        onClick={loadMoreComments}
                        className="text-dark-grey p-2 px-3 hover:bg-grey/50 rounded-md flex items-center gap-2">Load more</button>
                    : ""
            }
        </div>

    )
}

export default CommentsContainer