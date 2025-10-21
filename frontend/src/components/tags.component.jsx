import { useContext } from "react";
import { EditorContext } from "../pages/editor.pages.jsx";

const Tag = ({ tag }) => {
    const ctx = useContext(EditorContext) || {};
    const blog = ctx.blog || {};
    const tags = Array.isArray(blog.tags) ? blog.tags : [];
    const setBlog = ctx.setBlog;
    const handleTagDeletion = () => {
        if (!setBlog) return;
        setBlog(prev => {
            const currentTags = Array.isArray(prev?.tags) ? prev.tags : [];
            return { ...prev, tags: currentTags.filter(t => t !== tag) };
        });
    }

    return (
        <div className="relative p-2 mt-2 px-5 bg-white rounded-full
            inline-block hover:bg-opacity-50 pr-8">
            <p className="outline-none">{tag}</p>
            <button className="mt-[2px] rounded-full absolute right-3 top-1/2
            -translate-y-1/2"
                onClick={handleTagDeletion}
            >
                <i className="fi fi-br-cross-small pointer-events-none"></i>
            </button>
        </div>
    )
}
export default Tag;