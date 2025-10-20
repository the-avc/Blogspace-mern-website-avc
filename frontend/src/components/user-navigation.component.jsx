import { useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import { Link } from 'react-router-dom';
import { UserContext } from "../App";
import { removeFromSession } from "../common/session";
const UserNavigationPanel = () => {
    const { userAuth: { username }, setUserAuth } = useContext(UserContext);

    const signOutUser = () => {
        removeFromSession("user");
        setUserAuth({ access_token: null })
    }

    return (
        <AnimationWrapper
            transition={{ duration: 0.2 }}
        >
            <div className="bg-white absolute right-0 border border-grey w-60 overflow-hidden">
                <Link to="/editor" className="flex gap-2 link md:hidden pl-8 py-4">
                    <i className="fi fi-rr-file-edit"></i><p>Write</p>
                </Link>

                <Link to={`/user/${username}`} className="flex gap-2 link pl-8 py-4">
                    Profile
                </Link>

                {/* <Link to={`/settings/${username}`} className="flex gap-2 link pl-8 py-4">
                    Settings
                </Link> */}
                <button className="text-left p-4 hover:bg-grey w-full pl-8 py-4"
                    onClick={signOutUser}
                >
                    <h1 className="font-bold text-xl mg-1">Sign Out</h1>
                    <p className="text-dark-grey">@{username}</p>
                </button>


            </div>
        </AnimationWrapper>
    )
}
export default UserNavigationPanel;