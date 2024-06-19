import { ReactNode } from "react"
import btnHighlight from "../images/buttons/button_highlight.svg"
import {MotionProps, motion} from "framer-motion"



interface HomeBtn {
    type?:string,
    children:ReactNode,
}

const HomeBtn = ({type='',children}:HomeBtn) => {
    return (
        <motion.button
        className={"home-btn " + type} 
        whileHover={{scale:1.1}}>
            <img src={btnHighlight} className='btn-highlight' alt="Button Highlight"></img>
            {children}
        </motion.button>
    )
}

export default HomeBtn