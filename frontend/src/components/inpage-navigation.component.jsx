import { useEffect, useRef, useState } from "react";

const  InPageNavigation = ({ routes, defaultHide = [], defaultActiveIdx = 0, children }) => {
    let activeTablineRef = useRef();
    let activeTabRef = useRef();
    let [inPageNavIdx, setInPageNavIdx] = useState(defaultActiveIdx);

    const changePageState = (btn, i) => {
        let { offsetWidth, offsetLeft } = btn;

        activeTablineRef.current.style.width = offsetWidth + "px";
        activeTablineRef.current.style.left = offsetLeft + "px";

        setInPageNavIdx(i);
    }
    useEffect(() => {
        changePageState(activeTabRef.current, defaultActiveIdx);
    }, [])

    return (
        <>
            <div className="relative mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto">
                {routes.map((route, i) => {
                    return (
                        <button
                            ref={i == defaultActiveIdx ? activeTabRef : null}
                            key={i}
                            className={"p-4 px-5 font-semibold capitalize " + (inPageNavIdx == i ? "text-black" : "text-dark-grey ") + (defaultHide.includes(route) ? "md:hidden" : "")}
                            onClick={(e) => {
                                changePageState(e.target, i)
                            }}>
                            {route}
                        </button>
                    );
                })}

                <hr ref={activeTablineRef} className="absolute bottom-0 duration-250" />
            </div>
            {Array.isArray(children)? children[inPageNavIdx]:children}

        </>
    )
}
export default InPageNavigation;