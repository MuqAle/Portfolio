import { Updater, useImmer } from 'use-immer'
import outline from '../images/home-menu/ecommerce-project-bg.svg'
import logo from '../images/home-menu/ecommerce-project-logo.svg'
import {AnimatePresence, motion, useAnimation} from "framer-motion"
import ChannelOverlay from '../project-carousel/overlay'
import { useContext, useEffect } from 'react'
import ZoomContext from '../zoom-context'

const EcommerceProjectWiiBox = ({onClick,setZoom}: {
  onClick:(event: any) => void,
  setZoom:Updater<boolean>,}) => {
    const [active, setActive] = useImmer(false)
    const controls = useAnimation()
    const zoom = useContext(ZoomContext)

    useEffect(() => {
      if(!zoom){
        controls.start({
          y: ['0%','-15%','0%,15%'],
          transition: {
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          },
        });
      }else{
        controls.stop()
      }
    },[zoom,controls])



    return(
        <li className='wii-box-list'>
          <AnimatePresence>
          {
            active && 
            (
              <ChannelOverlay setZoom={setZoom} onClick={() => setActive(false)}></ChannelOverlay>
            )
          }
          </AnimatePresence>
            <div className="wii-box" onClick={(event) => {
              onClick(event)
              setActive(true)
              }}>
         
            <img className='wii-outline' src={outline} alt="grey outline" />
            <motion.img className="project-logo" src={logo} alt="gem heart with muqqy qritten underneath" 
            animate = {controls}/>
        </div>
        </li>
      
    )
}

export default EcommerceProjectWiiBox