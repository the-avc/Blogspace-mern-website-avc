const List = ({ style, items }) => {
    return (
        <ol className={`pl-5 mx-3 ${style == "ordered" ? " list-decimal" : " list-disc"}`}>
            {
                items.map((listitem, i) => {
                    return <li key={i} className="my-4"
                        dangerouslySetInnerHTML={{ __html: listitem }}></li>
                })
            }
        </ol>
    )
}
const Img = ({ url, caption }) => {
    return (
        <img src={url} alt={caption} className="w-full h-auto text-center" />
    )
}
const BlogContent = ({ block }) => {
    let { type, data } = block;

    if (type == "paragraph") {
        return <p dangerouslySetInnerHTML={{ __html: data.text }}></p>
    }
    if (type == "list") {
        return <List style={data.style} items={data.items} />
    }
    if (type == "image") {
        return <Img url={data.url} caption={data.caption} />
    }

    return (
        <h1>dshchgsdhggvf</h1>
    )
}
export default BlogContent;

