import { useImmer } from "use-immer"
import outline from '../images/home-menu/wii-box-border.svg'
import discReflection from '../images/home-menu/disc-reflection.svg'
import disc from '../images/home-menu/disc.svg'
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

const PortfolioWiiBox = ({zoom}:{zoom:boolean}) => {
      const [active, setActive] = useImmer(false)
      const [discIn, setdiscIn] = useImmer(false)
      const [top,setTop] = useImmer(0)
      const ref:React.LegacyRef<HTMLDivElement> = useRef(null) 
      const imageRef:React.LegacyRef<HTMLImageElement> = useRef(null) 

      const updatePosition = () =>{
        if(ref.current && imageRef.current){
            const height =  ref.current.getBoundingClientRect().height
            const imageHeight = imageRef.current.getBoundingClientRect().height
            const position = (height - imageHeight) * .5
            setTop(position)
        }
      }

      useEffect(() => {
        
        const handleResize = () => {
            updatePosition()
          }
          updatePosition()
      
          window.addEventListener('resize', handleResize)
      
          return () => {
            window.removeEventListener('resize', handleResize)
          }
          
      },[ref, imageRef])




      return(
          <li className='wii-box-list portfolio'>
            <img ref={imageRef} className='disc' src={disc} alt='grey disc'  style={{position:'absolute', top:`${top}px`}}/>
              <div ref={ref} className="wii-box" >
              <img className='wii-outline empty' src={outline} alt="grey outline" />
              <div className="grey-disc">
                <motion.img 
                animate={{
                    rotateY:'180deg',
                    
                }}
                transition={zoom ? {}:{
                    delay:5,
                    duration:3,
                    repeat:Infinity,
                    repeatDelay:5,
                    ease: "linear",
                    
                }}
                src={discReflection}  alt="grey disc with reflection" />
              </div>
              
              <div className="wii-tv-overlay"></div>
              <div className="background"> </div>
          </div>
          </li>
        
      )
  }

export default PortfolioWiiBox