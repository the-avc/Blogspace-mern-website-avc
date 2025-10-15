import { useContext } from "react";
import AnimationWrapper from "../common/page-animation.jsx";
import { Toaster, toast } from "react-hot-toast";
import { EditorContext } from "../pages/editor.pages.jsx";
import defaultBanner from "../assets/blog banner.png";
import Tag from "./tags.component.jsx";
import axios from "axios";
import { UserContext } from "../App.jsx";
import { useNavigate } from "react-router-dom";

const PublishForm = () => {
    const charLimit = 200;
    const tagLimit = 5;

    const navigate = useNavigate();
    let { blog, setEditorState, blog: { title, banner, des, tags, content }, setBlog } = useContext(EditorContext);

    let { userAuth: { access_token } } = useContext(UserContext);

    const handleCloseEvent = () => {
        setEditorState("editor");
    }
    const handleTitleChange = (e) => {
        let input = e.target;
        setBlog({ ...blog, title: input.value })
    }

    const handleDesChange = (e) => {
        let input = e.target;
        setBlog({ ...blog, des: input.value });
    }

    const handleTitleKeyDown = (e) => {
        if (e.keyCode == 13) e.preventDefault();
    }

    const handleTagKeyDown = (e) => {
        if (e.keyCode == 13) {
            e.preventDefault();

            let tag = e.target.value;

            if (tags.length < tagLimit) {
                if (!tags.includes(tag) && tag.length) {
                    setBlog({ ...blog, tags: [...tags, tag] })
                }
            }
            else {
                toast.error(`maximum tags can be ${tagLimit}`)
            }

            e.target.value = "";
        }
    }

    const publishBlog = (e) => {

        if (e.target.className.includes("disable")) {
            return;
        }
        if (!title.length) {
            return toast.error("Title is required");
        }
        if (!des.length || des.length > charLimit) {
            return toast.error(`write a description within ${charLimit} characters`);
        }
        if (!tags.length) {
            return toast.error("enter at least one tag");
        }

        let loadingToast = toast.loading("Publishing.....");

        e.target.classList.add('disable');

        let blogObj = {
            title, banner, des, content, tags
        }
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/create-blog",
            blogObj, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
            .then(() => {
                e.target.classList.remove("disable");
                toast.dismiss(loadingToast);
                toast.success("Published Successfully");

                setTimeout(() => {
                    navigate("/");
                }, 500);

            })
            .catch(({ res }) => {
                e.target.classList.remove("disable");
                toast.dismiss(loadingToast);
                return toast.error(res.data.error);

            })

    }
    return (
        <AnimationWrapper>
            <section className="w-screen min-h-screen grid items-center
            lg:grid-cols-2 py-16 lg:gap-4">
                <Toaster />
                <button className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%]"
                    onClick={handleCloseEvent}>
                    <i className="fi fi-br-cross"></i>
                </button>

                <div className="max-w-[550px] block mx-auto">
                    <p className="text-dark-grey mb-1">PREVIEW</p>

                    <div className="w-full aspect-video rounded-lg
            overflow-hidden bg-grey mt-4">
                        <img src={defaultBanner} alt="" />
                    </div>

                    <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">
                        {title}
                    </h1>
                    <p className="font-gelasio line-clamp-2 text-xl leading-7 mt-4">{des}</p>
                </div>

                <div className="border-grey lg:border-1 lg:pl-8">
                    <p className="text-dark-grey mb-2 mt-9">
                        Blog Title
                    </p>
                    <input type="text" placeholder="Blog Title"
                        defaultValue={title} className="input-box pl-4"
                        onChange={handleTitleChange} />
                    <p className="text-dark-grey mb-2 mt-9">
                        Short Description
                    </p>
                    <textarea name="" id=""
                        maxLength={charLimit}
                        defaultValue={des}
                        className="h-40 resize-none leading-7 input-box pl-4"
                        onChange={handleDesChange}
                        onKeyDown={handleTitleKeyDown}>
                    </textarea>

                    <p className="mt-1 text-dark-grey text-sm right">
                        {charLimit - des.length} characters left
                    </p>

                    <p className="text-dark-grey mb-2 mt-9">Tags: <span className="text-sm text-grey-500">{tagLimit - tags.length} tags left
                    </span>
                    </p>
                    <div className="relative input-box pl-2 py-2 pb-4">
                        <input type="text"
                            placeholder="enter tags"
                            className="sticky input-box bg-white top-0 left-0 pl-4 mb-3
                        focus:bg-white"
                            onKeyDown={handleTagKeyDown} />
                        {tags.map((tag, i) => {
                            return <Tag tag={tag} key={i} />
                        })}
                    </div>
                    <button className="btn-dark px-8 mt-3"
                        onClick={publishBlog}>Publish</button>
                </div>
            </section>
        </AnimationWrapper>
    )
    {/* <h1>ewgygfygergfherjvhdghhjgh</h1> */ }
}
export default PublishForm;