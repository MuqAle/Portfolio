import { ReactNode } from "react"
import btnHighlight from "../images/buttons/button_highlight.svg"
import {motion} from "framer-motion"

const HomeBtn = ({type='',children}:{type?:string,children:ReactNode}) => {
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