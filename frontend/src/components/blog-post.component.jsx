import { Link } from "react-router-dom";
import { getDay } from "../common/date.jsx";
const BlogPost = ({ content, author }) => {

    let { publishedAt, tags, title, des, banner, activity: { total_likes }, blog_id: id } = content;
    let { fullname, profile_img, username } = author;
    return (
        <Link to={`/blogs/${id}`} className="flex gap-8 items-center border-b border-grey pb-5 mb-4">
            <div className="w-full">
                <div className="flex gap-2 items-center mt-2 mb-5">
                    <img src={profile_img} alt={username}
                        className="w-6 h-6 rounded-full"
                    />
                    <p className="line-clamp-1">{fullname} @ {username}</p>
                    <p className="min-w-fit">
                        {getDay(publishedAt)}
                    </p>
                </div>

                <h1 className="blog-title mb-1">{title}</h1>

                <p className="my-3 text-xl font-gelasio leading-7 max-sm:hidden md:max-[1100px]:hidden line-clamp-2">{des}</p>
                <div className="flex gap-4 mt-4">
                    <span className="btn-light my-2 py-1 px-4">
                        {tags[0]}
                    </span>
                    {/* <span className="ml-3 flex items-center gap-2 text-dark-grey mt-2">
                        <i className="fi fi-rr-social-network text-xl"></i>{total_likes}
                    </span> */}
                </div>
            </div>

            <div className="h-28 aspect-square bg-grey">
                <img src={banner} className="w-full h-full aspect-square object-cover" />
            </div>
        </Link>
    )
}
export default BlogPost;