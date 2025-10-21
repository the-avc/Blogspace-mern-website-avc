import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../App";
import AboutUser from "../components/about.component";
import InPageNavigation from "../components/inpage-navigation.component";
import BlogPost from "../components/blog-post.component";
import PageNotFound from "./404.page";
import ManageBlogs from "./Manage-blogs.page";
import Loader from "../components/loader.component";
import NoDataMessage from "../components/nodata.component";
import AnimationWrapper from "../common/page-animation";

const profileDataStruct = {
  personal_info: {
    fullname: "",
    username: "",
    profile_img: "",
    bio: ""
  },
  account_info: {
    total_posts: 0,
    total_reads: 0
  },
  social_links: {},
  joinedAt: ""
}
const ProfilePage = () => {
  let { id: profileId } = useParams();

  let [profile, setProfile] = useState(profileDataStruct);
  let {
    personal_info: { fullname, username: profile_username, profile_img, bio },
    account_info: { total_posts, total_reads },
    social_links,
    joinedAt } = profile;

  let [blogs, setBlogs] = useState(null);
  let { userAuth: { username, access_token } } = useContext(UserContext);
  const fetchUserProfile = () => {
    axios.post(import.meta.env.VITE_BACKEND_URL + "/get-profile", {
      username: profileId,
    })
      .then(({ data: user }) => {
        // console.log(user);
        setProfile(user);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const fetchUserBlogsPublic = () => {
    axios.post(import.meta.env.VITE_BACKEND_URL + "/user-blogs", {
      username: profileId
    })
      .then(({ data }) => {
        setBlogs(data.blogs || []);
      })
      .catch(err => {
        console.log("Error fetching user's blogs:", err);
        setBlogs([]);
      });
  };
  useEffect(() => {
    resetStates();
    fetchUserProfile();
    if (profileId !== username) {
      fetchUserBlogsPublic();
    }
  }, [profileId])

  const resetStates = () => {
    setProfile(profileDataStruct);
    setBlogs(null)

  }

  return (
    <>{
      profile_username != null ?
        <section className="h-cover md:flex flex-row-reverse
      items-start gap-5 min-[1100px]:gap-12">
          <div className="flex flex-col max-md:items-center gap-5 min-w-[250px]">
            <img src={profile_img}
              className="w-48 h-48 bg-grey rounded-full md:w-32 md:h-32" />
            <h1 className="text-2xl font-medium">@ {profile_username}</h1>
            <p className="text-xl capitalize h-6">{fullname}</p>
            <p>{total_posts.toLocaleString()} Blogs -
              {total_reads.toLocaleString()} Reads</p>

            <div className="flex gap-4 mt-2">
              {
                profileId == username ? // if the profile is of the logged in user
                  <Link to={"/settings/edit-profile"} className="btn-light rounded-md">
                    Edit Profile
                  </Link>
                  : " "
              }
            </div>
            <AboutUser className="max-md:hidden" social_links={social_links} joinedAt={joinedAt} />
          </div>

          <div className="max-md:mt-12 w-full">
            <InPageNavigation
              routes={["Blogs Published", "About User"]}
              defaultHide={["About User"]}>

              {
                profileId === username ? (
                  <ManageBlogs />
                ) : (
                  <>
                    {blogs === null ? (
                      <Loader />
                    ) : blogs.length ? (
                      blogs.map((blog, i) => (
                        <AnimationWrapper key={i}>
                          <BlogPost content={blog} author={blog.author.personal_info} />
                        </AnimationWrapper>
                      ))
                    ) : (
                      <NoDataMessage message={"No Blogs Published"} />
                    )}
                  </>
                )
              }

            </InPageNavigation>

          </div>
        </section>
        : <PageNotFound />
    }
    </>
  )
}
export default ProfilePage;