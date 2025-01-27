import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.component.jsx";
import UserAuthForm from "./pages/userAuthForm.page.jsx";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session.jsx";
import Editor from "./pages/editor.pages.jsx";
import HomePage from "./pages/home.page.jsx";
import PageNotFound from "./pages/404.page.jsx";
import ProfilePage from "./pages/profile.page.jsx";
import SearchPage from "./pages/search.page.jsx";
import BlogPage from "./pages/blog.page.jsx";
import Footer from "./components/footer.component.jsx";
import TermsAndConditions from "./pages/termsAndCondn.jsx";
import PrivacyPolicy from "./pages/privacy.jsx";

export const ThemeContext = createContext({});
export const UserContext = createContext({});
const App = () => {

    const [userAuth, setUserAuth] = useState({ access_token: null });
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        let userInSession = lookInSession("user");
        let themeInSession = lookInSession("theme");
        userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null })


        if(themeInSession){
            setTheme(()=>{
                document.body.setAttribute('data-theme', themeInSession);
                return themeInSession;
            })  
        }
        else{
             document.body.setAttribute('data-theme',theme)
        }
       
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <UserContext.Provider value={{ userAuth, setUserAuth }}>
                <Routes>
                    <Route path="/editor" element={<Editor />} />
                    <Route path="/editor/:blog_id" element={<Editor />} />
                    <Route path="/" element={<Navbar />}>
                        <Route index="/" element={<HomePage />} />
                        <Route path="/signin" element={<UserAuthForm type="sign-in" />} />
                        <Route path="/signup" element={<UserAuthForm type="sign-up" />} />
                        <Route path="search/:query" element={<SearchPage />} />
                        <Route path="user/:id" element={<ProfilePage />} />
                        <Route path="blogs/:blog_id" element={<BlogPage />} />
                        <Route path="terms" element={<TermsAndConditions />} />
                        <Route path="privacy" element={<PrivacyPolicy />} />

                        <Route path="*" element={<PageNotFound />} />
                    </Route>
                </Routes>
            </UserContext.Provider>
        </ThemeContext.Provider>
    )
}

export default App;

