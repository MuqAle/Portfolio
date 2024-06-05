import { ReactNode } from "react"
import btnHighlight from "../images/buttons/button_highlight.svg"
import {delay, easeIn, motion} from "framer-motion"
import { useImmer } from "use-immer"




const ScrollHomeBtn = ({children,onClick,onHoverStart}:{children:ReactNode,onClick:() => void,onHoverStart:() => void}) => {

    const [isMouseDown, setIsMouseDown] = useImmer(false)

    const variants = {
        initial: { opacity: 0, scaleY: .87,scale:.8,originX:1},
        animate: { 
            opacity: 1, 
            scale:1.12, 
            scaleY:1,
            transition:{
                delay:.1,
                duration:.05,
                ease:"easeInOut"
            }},
        squish:{
            scaleX:[1,0.87,1,.95,1],
            transition:{
                delay:.05,
                duration:.2,
                ease:'easeInOut'
            }

        },
        exit: { 
            opacity: 0, scale:.8, scaleX:.8,
            transition:{
            duration:.09,
            // delay:.05
        }},
      }

    return (
        <motion.button
        whileTap={{backgroundColor:'#ffffff',boxShadow:'none'}}
        onHoverStart={onHoverStart}
        onTapStart={() => setIsMouseDown(true)}
        onTap={() => {
            setIsMouseDown(false)
            onClick()}}
        onTapCancel={() => setIsMouseDown(false)}
        className={"home-btn scroll"} 
        initial="initial"
        animate={["animate","squish"]}
        exit="exit"
        variants={variants}>
            {
                !isMouseDown && (
                    <div>
                    <img src={btnHighlight} className='btn-highlight' alt="Button Highlight"></img>
                    {children}
                    </div>
                )
            }
           
            
        </motion.button>
    )
}

export default ScrollHomeBtn