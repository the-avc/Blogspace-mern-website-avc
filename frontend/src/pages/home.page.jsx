import axios from "axios";
import AnimationWrapper from "../common/page-animation.jsx"
import InPageNavigation from "../components/inpage-navigation.component.jsx";
import { useEffect, useState } from "react";
import Loader from "../components/loader.component.jsx";
import BlogPost from "../components/blog-post.component.jsx";
import TrendingBlogSec from "../components/trending-blog-section.component.jsx";
import { filterpaginationData } from "../common/filter-pagination-data.jsx";
import NoDataMessage from "../components/nodata.component.jsx";
import Footer from "../components/footer.component.jsx";
const HomePage = () => {
    let [blogs, setBlog] = useState(null);
    let [trendingBlogs, setTrendingBlog] = useState(null);
    let [currentPg, setCurrentPg] = useState(1);
    const maxlimit = 5;

    const fetchLatestBlogs = (page = 1) => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs", { page })
            .then(({ data }) => {
                setBlog(data.blogs);
                // console.log(data);
            })
            .catch(err => {
                console.log(err);
            })
    }
    const fetchTrendingBlogs = () => {
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs")
            .then(({ data }) => {
                setTrendingBlog(data.blogs)
            })
            .catch(err => {
                console.log(err);
            })
    }
    useEffect(() => {
        fetchLatestBlogs(currentPg);
        fetchTrendingBlogs();
    }, [currentPg]);

    let endingIdx = currentPg * maxlimit;
    let startingIdx = endingIdx - maxlimit;
    let currentBlogs = blogs?.slice(startingIdx, endingIdx) || [];
    let totalPgs = Math.ceil(blogs?.length / maxlimit) || 1;
    const handlePagination = async (page) => {
        setCurrentPg(page);
    }


    return (
        <AnimationWrapper>
            <section className="h-cover flex justify-center gap-10">
                <div className="w-full">

                    <InPageNavigation routes={["home", "trendings"]} defaultHide={["trendings"]}>
                        <>
                            {blogs && blogs.length > 0 && (
                                <div className="flex justify-center items-center gap-4 mt-4 mb-5 bg-white max-sm:gap-2">
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

                            )}
                            {
                                blogs == null ? (
                                    <Loader />
                                ) :
                                    blogs.length ?
                                        currentBlogs.map((blog, i) => {
                                            return <AnimationWrapper key={i}><BlogPost content={blog} author={blog.author.personal_info} />
                                            </AnimationWrapper>
                                        }) :
                                        <NoDataMessage />
                            }

                        </>

                        {
                            trendingBlogs == null ? <Loader /> :
                                trendingBlogs.map((blog, i) => {
                                    return <AnimationWrapper key={i}>
                                        <TrendingBlogSec blog={blog} index={i} />
                                    </AnimationWrapper>
                                })
                        }
                    </InPageNavigation>
                    {/* pagination UI */}


                </div>

                <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
                    <div>
                        <h1 className="font-semibold text-xl mb-8">Trending <i className="fi fi-br-arrow-trend-up"></i></h1>
                        {
                            trendingBlogs == null ? <Loader /> :
                                trendingBlogs.map((blog, i) => {
                                    return <AnimationWrapper key={i}>
                                        <TrendingBlogSec blog={blog} index={i} />
                                    </AnimationWrapper>
                                })
                        }
                    </div>
                </div>

            </section>
            <Footer />
        </AnimationWrapper>
    )

}
export default HomePage;