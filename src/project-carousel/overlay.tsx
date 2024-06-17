import { animate, delay, motion } from "framer-motion"
import MenuBtn from "../reusable_components/menu_btns"

const ChannelOverlay = ({onClick,zoom}:{
    onClick:() => void,
    zoom:boolean}) => {

    const parentVariants = {
        initial:{
            opacity:0
        },
        animate:{
            opacity:1,
            scale:1.57,
   
            transition:{
                duration:.5
            },

        },
        exit:{
            opacity:0,
            transition:{
                duration:.5
            },

        }
    }

    const childVariants = {
        animate:{
            
            transform: 'translate(0, .1%)',
            transition:{
                duration:.5
            },

        },
    }
    
    return(
    <motion.div  className="channel-parent-div"
    initial='initial'
    exit='exit'
    variants={parentVariants}
    animate='animate'>
        <motion.div className="black-overlay"></motion.div>
        <svg>
            <defs>
                <clipPath id="custom-shape" clipPathUnits="objectBoundingBox">
                    <path d="M627.226 35.3678C626.28 27.0796 622.449 19.388 616.404 13.6391C610.359 7.89013 602.484 4.44993 594.158 3.92049C528.889 0 433.589 0 317 0C200.411 0 105.111 0 39.8419 3.92049C31.516 4.44993 23.6415 7.89013 17.5962 13.6391C11.551 19.388 7.72004 27.0796 6.77379 35.3678C2.45258 70.2852 0 127.057 0 171C0 214.943 2.45258 271.715 6.77379 306.632C7.72004 314.92 11.551 322.612 17.5962 328.361C23.6415 334.11 31.516 337.55 39.8419 338.079C105.111 342 200.411 342 317 342C433.589 342 528.889 342 594.158 338.079C602.484 337.55 610.359 334.11 616.404 328.361C622.449 322.612 626.28 314.92 627.226 306.632C631.547 271.715 634 214.876 634 171C634 127.124 631.547 70.2852 627.226 35.3678Z" transform="scale(0.001577, 0.002923)"></path>
                </clipPath>
            </defs>
        </svg>
        <motion.div className="shape-container clip-path"
            variants={childVariants}
            animate='animate'
            >
            <div>

            </div>
            <div className="channel-footer">
                <div className="top-border"></div>
                <MenuBtn btnName={"Muq Menu"} type={"channel"} onClick={onClick}></MenuBtn>
                <MenuBtn btnName={"Start"} type={"channel"} ></MenuBtn>
            </div>
        </motion.div>
    </motion.div>
    )

}

export default ChannelOverlay