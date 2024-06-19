import { Updater, useImmer } from 'use-immer'
import outline from '../images/home-menu/ecommerce-project-bg.svg'
import logo from '../images/home-menu/ecommerce-project-logo.svg'
import {AnimatePresence, motion} from "framer-motion"
import ChannelOverlay from '../project-carousel/overlay'

const EcommerceProjectWiiBox = ({onClick,zoom,setZoom}: {
  onClick:(event: any) => void,
  setZoom:Updater<boolean>,
  zoom:boolean}) => {
    const [active, setActive] = useImmer(false)
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
            animate={{
                y:zoom ? '0':['0%','-15%','0%,15%'] 
            }}
            transition={
              zoom ? {}:{
                duration: 2,
                repeat: Infinity, 
                repeatType: 'loop', 
                ease: 'easeInOut', 
              }}
            />
        </div>
        </li>
      
    )
}

export default EcommerceProjectWiiBox