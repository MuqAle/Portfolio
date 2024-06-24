import { useImmer } from "use-immer"
import outline from '../images/home-menu/wii-box-border.svg'
import discReflection from '../images/channel-overlay/wii-box-disc-reflection.svg'
import discInBox from '../images/channel-overlay/wii-box-disc.svg'
import disc from '../images/channel-overlay/disc.svg'
import { animate, motion } from "framer-motion"
import { useEffect, useRef } from "react"
import ZoomContext from "../context/zoom-context"
import { useContext } from "react"
import ViewPortContext from "../context/viewport-dimensions"

const PortfolioWiiBox = () => {
      const [active, setActive] = useImmer(false)
      const [discIn, setdiscIn] = useImmer(false)
      const [top,setTop] = useImmer(0)
      const ref:React.LegacyRef<HTMLDivElement> = useRef(null) 
      const imageRef:React.LegacyRef<HTMLImageElement> = useRef(null) 
      const zoom = useContext(ZoomContext)
      const viewPostDimension = useContext(ViewPortContext)

      const updatePosition = () =>{
        if(ref.current && imageRef.current){
            const height = ref.current.getBoundingClientRect().height  
            const imageHeight = imageRef.current.getBoundingClientRect().height 
            const position = (height - imageHeight) * .5
            setTop(position)
        }
      }

      useEffect(() => {
        
        const handleResize = () => {
          requestAnimationFrame(updatePosition);
          }
          requestAnimationFrame(updatePosition);


          window.addEventListener('resize', handleResize)
          
      
          return () => {
            window.removeEventListener('resize', handleResize)
          }
          
      },[ref, imageRef])

      const discVariant = {
        animate:{
          rotateY:'180deg',
          transition:{
            delay:5,
            duration:3,
            repeat:Infinity,
            repeatDelay:5,
            ease: "linear",
          }
        }
      }




      return(
          <li className='wii-box-list portfolio'>
            <img ref={imageRef} className='disc' src={disc} alt='grey disc'  style={{position:'absolute', top:`${top}px`}}/>
              <div ref={ref} className="wii-box" >
              <img className='wii-outline empty' src={outline} alt="grey outline" />
              <motion.img className="grey-disc"
              variants={discVariant}
              animate='animate'
              src={discInBox}  alt="grey disc" />
              <motion.img
              src={discReflection} className="disc-reflection"
              variants={discVariant}
              animate='animate'/>
              <div className="wii-tv-overlay"></div>
              <div className="background"> </div>
          </div>
          </li>
        
      )
  }

export default PortfolioWiiBox