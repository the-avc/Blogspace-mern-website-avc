import { useContext } from "react";
import { EditorContext } from "../pages/editor.pages";

const Tag = ({ tag }) => {
    let { blog, blog: { tags }, setBlog } = useContext(EditorContext);
    const handleTagDeletion = () => {
        tags = tags.filter(t => t != tag);
        setBlog({ ...blog, tags });

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