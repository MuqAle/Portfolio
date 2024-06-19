import { HoverScrollHomeBtn } from "../types"
import btnHighlight from "../images/buttons/button_highlight.svg"
import {AnimationProps, motion} from "framer-motion"
import { useImmer } from "use-immer"




const ScrollHomeBtn = ({
    children,
    onClick,
    onHoverStart,
    squishScaleX,
    exitScaleX,
    originX}:HoverScrollHomeBtn) => {

    const [isMouseDown, setIsMouseDown] = useImmer(false)

    const variants:AnimationProps['variants'] = {
        initial: { opacity: 0, scaleY: .87,scale:.8,originX:originX},
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
            scaleX:squishScaleX,
            transition:{
                delay:.05,
                duration:.2,
                ease:'easeInOut'
            }

        },
        exit: { 
            opacity: 0, 
            scale:.8, 
            scaleX:exitScaleX,
            x:originX ? '5%':'-5%',
            transition:{
            duration:.09,
            delay:.1,
            ease: "easeInOut"
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
                    <div className="image-container">
                    <img src={btnHighlight} className='btn-highlight' alt="Button Highlight"></img>
                    {children}
                    </div>
                )
            }
           
            
        </motion.button>
    )
}

export default ScrollHomeBtn