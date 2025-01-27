import pageNotFoundImg from "../imgs/404.png";
import pageNotFoundImgDark from "../imgs/404-dark.png";
import pageNotFoundImgLight from "../imgs/404-light.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../App";
const PageNotFound = () =>{

    let { theme} =useContext(ThemeContext);
    return(
        <section className="h-cover relative p-10 flex flex-col items-center gap-20 text-center">
            <img src={theme=="light"? pageNotFoundImgDark:pageNotFoundImgLight}
            className="select-none border-2 border-grey w-72 aspect-square object-cover rounded" />
            <h1 className="text-4xl font-gelasio leading-7">Page Not Found</h1>
            <p><Link to={"/"} className="text-dark-grey leading-7 text-xl underline">Go to Home</Link></p>
        </section>
    )
}
export default PageNotFound;