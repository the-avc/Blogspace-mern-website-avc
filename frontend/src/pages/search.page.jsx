import { useParams } from "react-router-dom"
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

    const searchBlogs = ({ page = 1, create_new_arr = false }) => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", { query, page })
            .then(({ data: { blogs } }) => {
                setBlogs((prev) => {
                    if (create_new_arr) {
                        return blogs;
                    }
                    return [...prev, ...blogs];
                });
            })
    }
    const fetchUsers = () => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-users", { query })
            .then(({ data: { users } }) => {
                setUsers(users);
            })
    }
    useEffect(() => {
        searchBlogs({page:1});
        resetState();
        fetchUsers();
    }, [query])
    const resetState = () => {
        setUsers(null);
        setBlogs(null);
    }


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
                <InPageNavigation routes={[`Search Results for ${query}`, "Accounts Matched"]} defaultHide={["Accounts Matched"]}>
                    <>
                        {
                            blogs == null ? (
                                // <Loader />
                                <NoDataMessage message={"No Blogs Published"}/>
                            ) :
                                blogs.length ?
                                    blogs.map((blog, i) => {
                                        return <AnimationWrapper key={i}><BlogPost content={blog} author={blog.author.personal_info} /></AnimationWrapper>
                                    }) :
                                    <NoDataMessage message={"No Blogs Published"}/>
                        }
                    </>
                    <UserCardWrapper />
                </InPageNavigation> </div>
            <div className="min-w-[40%] lg:min-w-[350px] max-w-min border-grey pl-8 pt-3 max-md:hidden">
                <h1 className="font-medium text-xl mb-9">
                    users related to search
                    <UserCardWrapper />
                </h1>


            </div>
        </section>
    )
}
export default SearchPage