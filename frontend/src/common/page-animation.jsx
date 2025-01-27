import { AnimatePresence, motion, transform } from "framer-motion";
const AnimationWrapper = ({ children, keyvalue, initial = { opacity: 0 }, animate = {
    opacity: 1
}, transition = { duration: 1 }, className
}) => {
    return (
        <AnimatePresence>
            <motion.div
                key={keyvalue}
                initial={initial} //initial state of the component
                animate={animate} //state of the component after the animation
                transition={transition}
                className={className} //class name of the component
            >
                {children}
            </motion.div>
        </AnimatePresence>

    )
}
export default AnimationWrapper;