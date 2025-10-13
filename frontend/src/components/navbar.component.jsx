import { useContext, useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import darkLogo from "../imgs/logo-dark.png";
import lightLogo from "../imgs/logo-light.png";
import { ThemeContext, UserContext } from "../App";
import UserNavigationPanel from "./user-navigation.component";
import { storeInSession } from "../common/session";
const Navbar = () => {
    const [searchBoxVisibility, setSearchBoxVisibility] = useState(false)

    let { theme, setTheme } = useContext(ThemeContext);

    let navigate = useNavigate();
    const { userAuth, userAuth: { access_token, profile_img } } = useContext(UserContext);

    const [userNavPanel, setUserNavPanel] = useState(false);
    const userNavPanelRef = useRef(null);
    const userButtonRef = useRef(null);

    const handleUserNavPanel = () => {
        setUserNavPanel(currentVal => !currentVal);
    }
    const handleSearch = (e) => {
        let query = e.target.value.trim();
        if (e.key === 'Enter') {
            if (query.length) {
                navigate(`/search/${query}`);
            } else {
                // Navigate to home when search is empty
                navigate('/');
            }
        }
    }

    const handleOutsideClick = (e) => {
        if (userNavPanelRef.current && !userNavPanelRef.current.contains(e.target) &&
            !userButtonRef.current.contains(e.target)) {
            setUserNavPanel(false);
        }
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);


    const changeTheme = () => {
        let newTheme = theme == "light" ? "dark" : "light";
        setTheme(newTheme);
        document.body.setAttribute("data-theme", newTheme);
        storeInSession("theme", newTheme);
    }
    return (
        <>
            <nav className="navbar">
                <Link to="/" className="flex-none w-10"><img src={theme == "dark" ? lightLogo : darkLogo} className="w-full" />
                </Link>

                <div className={`absolute bg-white w-full left-0 top-full 
                    mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block 
                    md:relative md:inset-0 md:p-0 md:w-auto md:show ${searchBoxVisibility ? 'show' : 'hide'}`}>
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%]
                        md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
                        onKeyDown={handleSearch} />
                    <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl
                     text-dark-grey"></i>
                </div>

                <div className="flex items-center gap-3 md:gap-6 ml-auto">
                    <button className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
                        onClick={() => setSearchBoxVisibility(currentVal => !currentVal)}
                    >
                        <i className="fi fi-rr-search text-xl pr-1"></i>
                    </button>

                    <button className="bg-grey w-12 h-12 rounded-full flex items-center justify-center"
                        onClick={changeTheme}
                    >
                        <i className={"fi fi-" + (theme == "light" ? "br-moon" : "sr-brightness") + " text-2xl block mt-1"}></i>
                    </button>

                    <Link to="/editor" className="hidden md:flex gap-2 link btn-light hover:bg-grey/50">
                        <i className="fi fi-rr-file-edit"></i><p className="text-xl">Write</p>
                    </Link>

                    {access_token ? (
                        <div className="relative" ref={userButtonRef}>
                            <button
                                onClick={handleUserNavPanel}
                                className="w-12 h-12 mt-1"
                            >
                                <img src={profile_img} alt="" className="w-full h-full object-cover rounded-full" />
                            </button>

                            {userNavPanel && (
                                <div
                                    className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-4"
                                    ref={userNavPanelRef}
                                >
                                    <UserNavigationPanel />
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link className="btn-dark py-2" to="/signin">Sign In</Link>
                            <Link className="btn-light py-2 hidden md:block" to="/signup">Sign Up</Link>
                        </>
                    )}
                </div>
            </nav>
            <Outlet />
        </>
    );
};

export default Navbar;