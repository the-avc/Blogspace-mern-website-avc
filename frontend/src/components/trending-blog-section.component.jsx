import { Link } from "react-router-dom";
import { getDay } from "../common/date.jsx";
const TrendingBlogSec = ({ blog, index }) => {

    let { title, blog_id: id, author: { personal_info: { fullname, username, profile_img } }, publishedAt } = blog;
    return (
        <Link to={`/blogs/${id}`} className="flex gap-5 mb-8">
            <h1 className="text-4xl sm:text-3xl lg:text-5xl font-bold leading-none text-dark-grey/40">{index + 1}</h1>
            <div>
                <div className="flex gap-2 items-center mt-2 mb-5">
                    <img src={profile_img} alt={username}
                        className="w-6 h-6 rounded-full"
                    />
                    <p className="line-clamp-1">{fullname} @ {username}</p>
                    <p className="min-w-fit">
                        {getDay(publishedAt)}
                    </p>
                </div>
                <h1 className="blog-title">{title}</h1>
            </div>
        </Link>
    )
}
export default TrendingBlogSec;