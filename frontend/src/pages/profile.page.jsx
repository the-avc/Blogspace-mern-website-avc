import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../App";
import AboutUser from "../components/about.component";
import InPageNavigation from "../components/inpage-navigation.component";
import BlogPost from "../components/blog-post.component";
import PageNotFound from "./404.page";
import ManageBlogs from "./Manage-blogs.page";
import Footer from "../components/footer.component";
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
  let { userAuth: { username } } = useContext(UserContext);
  const fetchUserProfile = () => {
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-profile", {
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

  // const getBlogs = ({user_id})=>{
  //   user_id = user_id==undefined? BlogEditor.user_id : user_id;

  //   axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", {
  //author:user_id,})
  // }
  useEffect(() => {
    resetStates();
    fetchUserProfile();
  }, [profileId])

  const resetStates = () => {
    setProfile(profileDataStruct);
    // setBlogs(null)

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

            </InPageNavigation>
            <ManageBlogs />

          </div>
        </section>
        : <PageNotFound />
    }
    </>
  )
}
export default ProfilePage;