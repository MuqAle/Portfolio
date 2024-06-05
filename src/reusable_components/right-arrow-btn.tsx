import { AnimatePresence, AnimationProps, animate, delay, motion, useAnimation } from "framer-motion"
import rightScrollBtn from '../images/buttons/right-scroll-btn.svg'
import { ScrollBtn } from "../types"
import plus from '../images/buttons/plus-sign.svg'
import { useImmer } from "use-immer"
import ScrollHomeBtn from "./scroll-home-btn"
import { useEffect, useRef } from "react"


const bounceAnimation:AnimationProps["variants"] = {
    animate : {
        x:['0%','-5%','0%,5%'],
        transition:{
            duration: 1,
        repeat: Infinity, 
        repeatType: 'loop', 
        ease: 'easeInOut', 
        stiffness: 50
        }
    }
}

const hoverVariants = {
    hoverEnterStart:{
        scaleY: 0.5,  
        y: 10,
        transition: {
            type: "spring",  
            duration:.1,
            bounce:0
            },
    },
    hoverEnterEnd:{
        scaleY: 1,
          y:0,
          transition: {
            type: "spring",  
            duration:.1,
            bounce:0
            },
    },
    hoverLeaveStart:{
        scaleX:0.5,
        x:10,
        transition:{
            type: "spring",  
            duration:.15,
            bounce:0
        }
    },
    hoverLeaveEnd:{
        scaleX: 1,
          x:0,
          transition: {
            type: "spring",  
            duration:.1,
            bounce:0
            },
    },      
}


const exitContainerVariants = {
    exit:{
        opacity:0,
        transition:{
            duration:.1,
        }
    },
    initial:{
        opacity:1,
        x:"50%"
    },
    animate:{
        x:0,
        transition:{
            duration:.15
        }
    }
}



const RightArrow = ({scrollFunction, showBtn,rightParentVisible} : ScrollBtn) => {

    const [isHovered, setIsHovered] = useImmer(false)
    const controls = useAnimation();
    const parentScrollDivRef:React.LegacyRef<HTMLDivElement> = useRef(null)
    const isListenerAttachedRef = useRef(false)


    useEffect(() => {

        const parentScrollDiv = parentScrollDivRef.current
        const handleMouseLeave = async () => {

            if(isHovered && rightParentVisible){
                await controls.start(hoverVariants.hoverLeaveStart)
                await controls.start(hoverVariants.hoverLeaveEnd)
            }
        }
       
        if (parentScrollDiv) {
            parentScrollDiv.addEventListener("mouseleave", handleMouseLeave)
        }

        return () => {
            if(parentScrollDiv ) {
                parentScrollDiv.removeEventListener("mouseleave", handleMouseLeave)
            }
        }
    
      }, [controls, isHovered, rightParentVisible])

      
    const onScroll = () => {
        if(isHovered && showBtn){
            setTimeout(() => {
                setIsHovered(false) 
            },1000)
        }
        scrollFunction()
    }

    const handleMouseEnter = async () => {
        setIsHovered(true)
        if(isHovered === false){
            await controls.start(hoverVariants.hoverEnterStart)
            await controls.start(hoverVariants.hoverEnterEnd)
        }
    }
    console.log(isListenerAttachedRef)
    // console.log(isHovered)

    return(
    <AnimatePresence>
       {showBtn && (<motion.div className="scroll-main-btn-container right-scroll"
        variants={exitContainerVariants}
        exit="exit"
        initial="initial"
        animate='animate'
        >
            <motion.div className="scroll-btn-container" 
            ref={parentScrollDivRef}
            onHoverEnd={() => setIsHovered(false)}
            variants={bounceAnimation}
            animate="animate"
            >
                {/* {
                     (!rightParentVisible || isHovered) && (
                        <ScrollHomeBtn
                        key={'scroll-home-btn'}
                        onHoverStart={() => setIsHovered(true)}
                        onClick={onScroll}>
                            <img src={plus} alt="plus sign" />
                        </ScrollHomeBtn>
                )
                } */}
                <AnimatePresence>
                {
                    (!rightParentVisible || isHovered) && (
                            <ScrollHomeBtn
                            key={'scroll-home-btn'}
                            onHoverStart={() => setIsHovered(true)}
                            onClick={onScroll}>
                                <img src={plus} alt="plus sign" />
                            </ScrollHomeBtn>
                    )
                }
                </AnimatePresence>
                
                <motion.button className="scroll-btn"
                onClick={onScroll}
                onHoverStart={handleMouseEnter}
                animate={controls}
                variants={hoverVariants}
                exit={"hoverLeaveStart"}
                initial='initial'
                >
                    <img src={rightScrollBtn} alt="blue arrow pointing right"/>
                </motion.button>
                
            </motion.div>
        </motion.div>)}
    </AnimatePresence>
 
    )
}

export default RightArrow