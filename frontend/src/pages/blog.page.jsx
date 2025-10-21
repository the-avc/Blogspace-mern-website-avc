import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AnimationWrapper from "../common/page-animation.jsx";
import { getDay } from "../common/date.jsx";
import { UserContext } from "../App.jsx";
import BlogContent from "../components/blog-content.component.jsx";
import toast from "react-hot-toast";
import { createContext } from "react";
import BlogInteraction from "../components/blogInteraction.jsx";
import CommentsContainer from "../components/comments.component.jsx";
import { fetchComments } from "../components/comments.component.jsx";

const blogStruct = {
    title: "",
    des: "",
    content: [],
    tags: [],
    author: { personal_info: {} },
    activity: {
        total_likes: 0,
        total_comments: 0
    },
    banner: "",
    publishedAt: ""
}
export const BlogContext = createContext({});
const BlogPage = () => {
    let { blog_id } = useParams()
    let { userAuth: { username, access_token } } = useContext(UserContext);

    // console.log(blog_id);
    const [blog, setBlog] = useState(blogStruct);
    const [liked, setLiked] = useState(false);
    const [commentWrapper, setCommentWrapper] = useState(false);
    const [totalParentCommentsLoaded, setTotalParentCommentsLoaded] = useState(0);

    let { title, content, banner,
        author: { personal_info: { username: author_username, fullname, profile_img } },
        activity: { total_likes, total_comments },
        publishedAt } = blog;


    const fetchBlog = () => {
        axios.post(import.meta.env.VITE_BACKEND_URL + "/get-blog", { blog_id })
            .then(async ({ data: { blog } }) => {
                blog.comments = await fetchComments({ blog_id: blog._id, setParentCommentCountFun: setTotalParentCommentsLoaded });
                setBlog(blog);
                // console.log(blog);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        resetStates();
        fetchBlog();
    }, [blog_id])

    const resetStates = () => {
        setBlog(blogStruct);
        setLiked(false);
        setCommentWrapper(false);
        setTotalParentCommentsLoaded(0);
    }

    return (
        <AnimationWrapper>
            {
                <BlogContext.Provider value={{ blog, setBlog, liked, setLiked, commentWrapper, setCommentWrapper, totalParentCommentsLoaded, setTotalParentCommentsLoaded }}>

                    <CommentsContainer />
                    <div className="max-w-[900px] block mx-auto py-10 max-lg:px-5[vw]">
                        <img src={banner} alt={title}
                            className="aspect-video" />
                        <div className="mt-12 mx-3">
                            <h2>{title}</h2>
                            <div className="flex max-sm:flex-col justify-between my-8">

                                <div className="flex gap-5 items-start">
                                    <img src={profile_img} alt={author_username}
                                        className="w-12 h-12 rounded-full" />
                                    <p> <Link to={`/user/${author_username}`}
                                    >{fullname} <br />@
                                        {author_username}</Link>
                                    </p>
                                </div>

                                <p className="text-dark-grey opacity-75 max-sm:mt-6 
                        max-sm:ml-12 max-sm:pl-5">{
                                        blog.updatedAt && blog.updatedAt != blog.publishedAt ?
                                            `Updated on: ${getDay(blog.updatedAt)}`
                                            :
                                            ""
                                    } <br/>
                                    Published on: {getDay(publishedAt)}</p>
                            </div>
                        </div>

                        <BlogInteraction />

                        <div className="my-12 font-gelasio blog-page-content">

                            {/* {
                        console.log(content[0])
                    } */}
                            {
                                content[0] && content[0].blocks ? (
                                    content[0].blocks.map((block, i) => (

                                        <div key={i} className="my-4 md:my-8 mx-3">
                                            <BlogContent block={block} />
                                        </div>

                                    ))
                                ) : ""
                            }
                        </div>
                        {/* <BlogInteraction /> */}

                    </div>
                </BlogContext.Provider>
            }

        </AnimationWrapper>
        // <h1>f {blog.title} wguerwutyewurytiuwyeiutyewoius</h1>
    )
}
export default BlogPage;