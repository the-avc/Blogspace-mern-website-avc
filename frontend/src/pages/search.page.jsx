import { Navigate, useNavigate, useParams } from "react-router-dom"
import InPageNavigation from "../components/inpage-navigation.component";
import PageNotFound from "./404.page";
import { useEffect, useState } from "react";
import NoDataMessage from "../components/nodata.component";
import axios from "axios";
import Loader from "../components/loader.component";
import UserCard from "../components/usercard.component";
import AnimationWrapper from "../common/page-animation";
import BlogPost from "../components/blog-post.component";

const SearchPage = () => {

    let { query } = useParams();
    let [blogs, setBlogs] = useState(null);
    let [users, setUsers] = useState(null);
    const navigate = useNavigate();

    const searchBlogs = ({ page = 1, create_new_arr = false }) => {
        if (!query || !query.trim()) {
            setBlogs([]);
            return;
        }
        console.log("Searching for blogs with query:", query)
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", { query, page })
            .then(({ data: { blogs } }) => {
                setBlogs((prev) => {
                    if (create_new_arr) {
                        return blogs;
                    }
                    return [...prev, ...blogs];
                });
            })
            .catch(err => {
                console.error("Blog search error:", err);
                setBlogs([]);
            });
    }

    const searchUsers = () => {
        if (!query || !query.trim()) {
            setUsers([]);
            return;
        }
        console.log("Searching for users with query:", query);
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-users", { query })
            .then(({ data: { users } }) => {
                setUsers(users);
            })
            .catch(err => {
                console.error("User search error:", err);
                setUsers([]);
            });
    }

    const resetState = () => {
        setUsers(null);
        setBlogs(null);
    }

    useEffect(() => {
        if (!query || !query.trim()) {
            navigate('/', { replace: true });
            return;
        }
        resetState();
        searchBlogs({ page: 1, create_new_arr: true });
        searchUsers();
    }, [query, navigate])

    const UserCardWrapper = () => {
        return (
            <>
                {
                    users == null ? <Loader /> :
                        users.length ?
                            users.map((user, i) => {
                                return <UserCard key={i} user={user} />
                            })
                            : <NoDataMessage message="No User Found" />
                }
            </>
        )
    }

    return (
        <section className="h-cover flex justify-center gap-10">
            <div className="w-full">
                <InPageNavigation routes={[`Search Results for "${query}"`, "Accounts Matched"]} defaultHide={["Accounts Matched"]}>
                    <>
                        {
                            blogs == null ? (
                                <Loader />
                            ) :
                                blogs.length ?
                                    blogs
                                        .filter(blog => blog.author && blog.author.personal_info)
                                        .map((blog, i) => {
                                            return <AnimationWrapper key={i}><BlogPost content={blog} author={blog.author.personal_info} /></AnimationWrapper>
                                        }) :
                                    <NoDataMessage message={"No Blogs Found"} />
                        }
                    </>
                    <UserCardWrapper />
                </InPageNavigation>
            </div>

            <div className="min-w-[40%] lg:min-w-[350px] max-w-min border-grey pl-8 pt-3 max-md:hidden">
                <h1 className="font-medium text-xl mb-9">
                    Users related to search
                </h1>
                <UserCardWrapper />
            </div>
        </section>
    )
}

export default SearchPage