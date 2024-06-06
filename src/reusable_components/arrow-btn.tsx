import { AnimatePresence, AnimationProps, animate, delay, motion, useAnimation } from "framer-motion"
import rightScrollBtn from '../images/buttons/right-scroll-btn.svg'
import { ScrollButton } from "../types"
import plus from '../images/buttons/plus-sign.svg'
import { useImmer } from "use-immer"
import ScrollHomeBtn from "./scroll-home-btn"
import { useEffect, useRef } from "react"




const ArrowButton = ({    
    arrowImg,
    hoverBtnImg,
    scrollFunction,
    showBtn,
    rightParentVisible,
    hoverBtnTiming, 
    bounceAnimationX,
    hoverLeaveStartScaleX,
    exitScaleX,
    squishScaleX,
    hoverLeaveStartX,
    exitInitialX,
    arrowDirection,
    originX} : ScrollButton) => {

    const [isHovered, setIsHovered] = useImmer(false)
    const controls = useAnimation();
    const parentScrollDivRef:React.LegacyRef<HTMLDivElement> = useRef(null)

    const bounceAnimation:AnimationProps["variants"] = {
        animate : {
            // x:['0%','-5%','0%','5%'],
            x:bounceAnimationX,
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
            originX:originX ? .5 : 0,
            // scaleX:0.5,
            scaleX:hoverLeaveStartScaleX,
            // x:10,
            x:hoverLeaveStartX,
            transition:{
                type: "spring",  
                duration:.15,
                delay:.05,
                bounce:0
            }
        },
        hoverLeaveEnd:{
            originX:originX ? .5 : 0,
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
                duration:.15,
            }
        },
        initial:{
            opacity:1,
            x:exitInitialX
            // x:"50%"
        },
        animate:{
            x:0,
            transition:{
                duration:.15
            }
        }
    }


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
        
        scrollFunction()
        setIsHovered(false)
    }

    const handleMouseEnter = async () => {
        setIsHovered(true)
        if(isHovered === false){
            await controls.start(hoverVariants.hoverEnterStart)
            await controls.start(hoverVariants.hoverEnterEnd)
        }
    }

    return(
    <AnimatePresence>
       {showBtn && (<motion.div className={"scroll-main-btn-container " + arrowDirection}
        variants={exitContainerVariants}
        exit="exit"
        initial="initial"
        animate='animate'
        >
            <motion.div className="scroll-btn-container" 
            ref={parentScrollDivRef}
            onHoverEnd={() => setIsHovered(false)}
            variants={bounceAnimation}
            animate="animate">
                <AnimatePresence>
                {
                    ((hoverBtnTiming && (!rightParentVisible || isHovered))) && (
                            <ScrollHomeBtn
                            originX={originX}
                            key={'scroll-home-btn'}
                            onHoverStart={() => setIsHovered(true)}
                            onClick={onScroll} 
                            // exitScaleX={.8}
                            exitScaleX={exitScaleX}
                            // squishScaleX={[1,0.87,1,.95,1]}
                            squishScaleX={squishScaleX}
                            >
                                <img src={hoverBtnImg} alt="sign" />
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
                    <img src={arrowImg} alt="blue arrow "/>
                </motion.button>
                
            </motion.div>
        </motion.div>)}
    </AnimatePresence>
 
    )
}

export default ArrowButton