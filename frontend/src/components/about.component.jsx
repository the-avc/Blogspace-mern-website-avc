import { Link } from "react-router-dom";
import { getDay } from "../common/date.jsx"
const AboutUser = ({ bio, social_links, joinedAt }) => {
    return (
        <div className="md:w-[90%] md:mt-7">
            <p className="text-xl leading-7">Bio: {bio == undefined ? "Nothing to read here" : bio}</p>
            <div className="flex gap-x-7 gap-y-2 flex-wrap my-7 items-center
            text-dark-grey">
                {
                    Object.keys(social_links).map((key) => {
                        const link = social_links[key];
                        return link ? (
                            <Link key={key}
                                  to={link}
                                  target="_blank"
                                  rel="noopener noreferrer">
                                <i className={"fi fi-brands-" + key + " text-2xl hover:text-black"}></i>
                            </Link>
                        ) : null;
                    })
                }
            </div>

            <p className="text-xl text-dark-grey">Joined On: {getDay(joinedAt)}</p>
        </div>
    )
}
export default AboutUser;