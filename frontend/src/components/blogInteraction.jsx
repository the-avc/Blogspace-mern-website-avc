import React, { useContext, useState, useEffect } from 'react'
import { BlogContext } from '../pages/blog.page.jsx'
import { Link } from 'react-router-dom'
import BlogContent from './blog-content.component.jsx'
import { UserContext } from '../App.jsx'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const BlogInteraction = () => {
  let { blog, blog: { title,
    _id, activity: { total_likes, total_comments }, activity, author: { personal_info: { username: author_username } } }, setBlog, liked, setLiked, commentWrapper, setCommentWrapper } = useContext(BlogContext);
  let { userAuth: { username, access_token } } = useContext(UserContext);

  useEffect(() => {
    // console.log(_id);
    if (access_token) {
      axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/is-liked", { _id }, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
        .then(({ data: { result } }) => {
          setLiked(Boolean(result));
          // console.log(result);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [_id]);

  const handleLike = () => {
    if (access_token) {
      setLiked(prevVal => !prevVal);
      !liked ? total_likes++ : total_likes--;
      setBlog({ ...blog, activity: { ...activity, total_likes } });

      // Ensure that blog_id is correctly passed
      axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/like-blog", {
        _id,  // Make sure blog_id is correctly assigned
        liked
      }, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
        .then(({ data }) => {
          // console.log(data);
          console.log("liked", liked);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      toast.error("Login to like this blog");
    }
  };
  return (
    <>
      <div className="mx-4">
        <hr className="border-grey my-2" />
        <div className="flex justify-between">
          <div className="flex flex-row gap-6">
            <div className="flex gap-3 items-center">
              <button className={"w-10 h-10 rounded-full flex items-center justify-center " + (liked ? "bg-red/20 text-red" : "bg-grey/80")}
                onClick={handleLike}>
                <i className={"fi fi-" + (liked ? "sr" : "rr") + "-heart"}></i>
              </button><p className="text-xl text-dark-grey">{total_likes}</p>
            </div>
            <div className="flex gap-3 items-center">
              <button 
              onClick={() => setCommentWrapper(preVal => !preVal)}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80">
                <i className="fi fi-rr-comment-alt-dots"></i>
              </button><p className="text-xl text-dark-grey">{total_comments}</p>
            </div>
          </div>
          <div className="flex gap-6 items-center">
            {
              (username == author_username && username != undefined) ?
                <Link to={`/editor/${_id}`} className="text-white text-xl underline btn-dark">Edit</Link>
                : ""

            }

          </div>

        </div>
        <hr className="border-grey my-2" />
      </div>

    </>
  )
}
export default BlogInteraction