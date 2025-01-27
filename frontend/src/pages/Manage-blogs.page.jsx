import axios from 'axios';
import React, { useState, useContext, useEffect, useRef } from 'react';
import { UserContext } from '../App';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../components/loader.component';
import NoDataMessage from '../components/nodata.component';
import AnimationWrapper from '../common/page-animation';
import { Link } from 'react-router-dom';
import { getDay } from '../common/date';

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState(null);
    const [currentPg, setCurrentPg] = useState(1);
    const [deletingBlogId, setDeletingBlogId] = useState(null);
    const [deleteMessage, setDeleteMessage] = useState("");
    const maxLimit = 5;

    const { userAuth: { access_token } } = useContext(UserContext);

    // Fetch blogs from the server
    const getBlogs = () => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/user-written-blogs", {}, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
            .then(({ data }) => {
                // console.log(data);
                setBlogs(data.blogs);
            })
            .catch(err => {
                console.log("Error fetching blogs:", err);
            });
    };

    // Delete a blog
    const deleteBlog = (blog, access_token, target, index) => {
        const blog_id = blog.blog_id;
        target.setAttribute("disabled", true);
        // setDeletingBlogId(blog_id); // Set the blog as being deleted
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/delete-blog", { blog_id }, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
            .then(({ data }) => {
                target.removeAttribute("disabled");
                // Remove the blog from the list
                if (data.status === "deleted") {
                    // console.log("Blog deleted successfully", data.blogs);
                    toast.success("Blog deleted successfully");
                    setBlogs(data.blogs);
                }
                // console.log("Blog deleted successfully", blog_id);
                target.removeAttribute("disabled");

            })
            .catch(err => {
                console.log("Failed to delete blog:", err);
                target.removeAttribute("disabled");
            });
    };

    let endingIdx = currentPg * maxLimit;
    let startingIdx = endingIdx - maxLimit;
    let currentBlogs = blogs?.slice(startingIdx, endingIdx) || [];
    let totalPgs = Math.ceil(blogs?.length / maxLimit) || 1;
    // Handle pagination
    const handlePagination = (page) => {
        if (page > 0 && page !== currentPg) {
            setCurrentPg(page); // Update the page number
        }
    };

    // Fetch blogs whenever the page or token changes
    useEffect(() => {
        if (access_token) {
            getBlogs();
        }
    }, [access_token, currentPg]);

    return (
        <>
            <Toaster />
            {blogs === null ? (
                <>
                <Loader />
                {
                   !access_token?
                   <NoDataMessage message={"Login to view"} />:null
                }
                
                </>
            ) : blogs.length ? (
                currentBlogs.map((blog, i) => (
                    <AnimationWrapper key={i}>
                        <div className="flex gap-10 border-b mb-6 max-md:px-4 border-grey items-center pb-6">
                            <img src={blog.banner} alt="" className="xl:block w-28 h-28 flex-none object-cover bg-grey" />
                            <div>
                                <Link to={`/blogs/${blog.blog_id}`} className="blog-title mb-4 hover:underline">
                                    {blog.title}
                                </Link>
                                <p className="line-clamp-1">Published on: {getDay(blog.publishedAt)}</p>
                                
                                <div className="flex mt-3">
                                    <Link to={`/editor/${blog.blog_id}`} className="pr-4 py-2 underline">
                                        Edit
                                    </Link>
                                    <button
                                        onClick={(e) => deleteBlog(blog, access_token, e.target, i)}
                                        // disabled={deletingBlogId === blog.blog_id} // Disable button if this blog is being deleted
                                        className="p-2 px-3 rounded-md border border-grey hover:bg-red/30 items-center justify-center"
                                    >
                                        <i className="fi fi-br-trash text-rose-600">Delete</i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </AnimationWrapper>
                ))
            ) : (
                <NoDataMessage message={"No Blogs Published"} />
            )}

            {/* pagination UI */}
            <div className="flex justify-center items-center gap-4 mt-8 bg-white max-sm:gap-2">
                <button
                    onClick={() => handlePagination(currentPg - 1)}
                    disabled={currentPg == 1}
                    className="flex justify-center gap-1 items-center px-4 py-2 bg-grey-200 hover:bg-gray-300 hover:text-[#232526] rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed max-sm:px-2">
                    <i className="fi fi-sr-angle-left text-black"></i><span>Prev</span>
                </button>

                {[...Array(totalPgs)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => handlePagination(i + 1)}
                        className={`px-4 py-2 rounded-full shadow-md ${currentPg === i + 1
                            ? "bg-black text-white"
                            : "bg-grey-200 hover:bg-gray-300 hover:text-[#232526]"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={() => handlePagination(currentPg + 1)}
                    disabled={currentPg == totalPgs}
                    className="btn-light flex justify-center gap-1 items-center px-4 py-2 bg-grey-200 hover:bg-gray-300 hover:text-[#232526] rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed max-sm:px-2">
                    <span> Next</span>
                    <i className="fi fi-sr-angle-right"></i>
                </button>

            </div>

            {deleteMessage && <div className="text-red-600 mt-4">{deleteMessage}</div>}
        </>
    );
}

export default ManageBlogs;
