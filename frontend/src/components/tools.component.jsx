import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Marker from "@editorjs/marker";
import Header from "@editorjs/header";
import InlineCode from "@editorjs/inline-code";

const uploadImgByURL = (e) => {
    // console.log('uploadByUrl called with:', e); // Log to see if the function is triggered
    return new Promise((resolve, reject) => {
        const url = e; // Assuming `e` is the URL of the image
        if (url.match(/\.(jpeg|jpg|gif|png)$/)) {
            resolve({
                success: 1,
                file: { url }
            });
        } else {
            reject('Invalid image URL');
        }
    });
}



export const tools = {
    embed: Embed,
    list: {
        class: List,
        inlineToolbar: true
    },
    header: {
        class: Header,
        config: {
            placeholder: "Enter a header",
            levels: [2, 3],
            defaultLevel: 2
        }
    },
    image: {
        class: Image,
        config: {
            uploader: {
                uploadByUrl: uploadImgByURL,
                // uploadByFile: uploadImgByFile AWS USE
            }
        }
    },
    marker: Marker,
    inlinecode: InlineCode
}
