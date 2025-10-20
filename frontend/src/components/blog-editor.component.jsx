import { Link } from 'react-router-dom';
import darkLogo from "../assets/logo-dark.png";
import lightLogo from "../assets/logo-light.png";
import defaultBannerDark from "../assets/blog banner dark.png";
import defaultBannerLight from "../assets/blog banner light.png";
import { useContext, useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import { tools } from './tools.component.jsx';
import { EditorContext } from '../pages/editor.pages.jsx';
import { Toaster, toast } from 'react-hot-toast';
import { ThemeContext } from '../App.jsx';
const BlogEditor = () => {
    let { theme } = useContext(ThemeContext);
    let { blog, blog: { title, banner, content, tags, des }, setBlog, textEditor, setTextEditor, setEditorState } = useContext(EditorContext);
    // const editorRef = useRef(null);
    console.log(blog);
    console.log(title);
    useEffect(() => {
        setTextEditor(new EditorJS({
            holder: "textEditor",
            placeholder: "write story",
            tools: tools,
            data: Array.isArray(content) ? content[0] : content
        }));
    }, []);
    // console.log(content[0]==undefined? "undefin hai":"chal toh rha hai");
    const handleTitleKeyDown = (e) => {
        if (e.keyCode == 13) e.preventDefault();
    }
    const handleBannerUpload = (e) => {
        let img = e.target.files[0];
        console.log(img);
    }
    const handleTitleChange = (e) => {
        let input = e.target;
        input.style.height = "auto";
        input.style.height = input.scrollHeight + "px";
        setBlog({ ...blog, title: input.value })
    }

    const handlePublishEvent = () => {
        // console.log("clicked");
        if (!title.length) {
            return toast.error("write blog title");
        }
        if (textEditor.isReady) {
            textEditor.save().then(data => {
                // console.log(data);
                if (data.blocks.length) {
                    setBlog({ ...blog, content: data });
                    setEditorState("publish")
                }
                else {
                    return toast.error("content can't be empty")
                }
            })
                .catch((err) => {
                    console.log(err);
                })
        }

    }
    return (
        <>
            <Toaster />
            <nav className="navbar">
                <Link to="/" className='flex-none w-10'>
                    <img src={theme == "light" ? darkLogo : lightLogo} alt="" />
                </Link>
                <p className="max-md:hidden text-black line-clamp-1 w-full">
                    {title.length ? title : "NewBlog"}
                </p>
                <div className="flex dap-4 ml-auto">
                    <button className="btn-dark py-2"
                        onClick={handlePublishEvent}>
                        Publish
                    </button>
                </div>
            </nav>
            <section>
                <div className='mx-auto max-w-[900px] w-full'>
                    <div className='relative aspect-video hover:opacity-80 bg-white border-4 border-grey'>
                        <label>
                            <img src={theme == "dark" ? defaultBannerDark : defaultBannerLight}
                                className='z-20'
                            />
                            <input
                                id="uploadBanner"
                                type='file'
                                accept=".png,.jpg,.jpeg"
                                hidden
                                onChange={handleBannerUpload}
                            />
                        </label>
                    </div>

                    <textarea
                        defaultValue={title}
                        placeholder='Blog title'
                        className='text-4xl font-medium w-full h-20 outline-none
                        resize-none mt-1 placeholder:opacity-40 leading-tight bg-white'
                        onKeyDown={handleTitleKeyDown}
                        onChange={handleTitleChange}
                    ></textarea>
                    <hr className='w-full opacity-10 my-5' />
                    <div id="textEditor" className='font-gelasio'>

                    </div>
                </div>
            </section>

        </>

    )
}
export default BlogEditor;