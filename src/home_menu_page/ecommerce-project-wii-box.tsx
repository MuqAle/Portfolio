import outline from '../images/home-menu/ecommerce-project-bg.svg'
import logo from '../images/home-menu/ecommerce-project-logo.svg'
import {motion} from "framer-motion"

const EcommerceProjectWiiBox = () => {
    return(
        <li className="wii-box">
            <img className='wii-outline' src={outline} alt="grey outline" />
            <motion.img className="project-logo" src={logo} alt="gem heart with muqqy qritten underneath" 
            animate={{
                y:['0%','-15%','0%,15%']
            }}
            transition={{
                duration: 2,
                repeat: Infinity, 
                repeatType: 'loop', 
                ease: 'easeInOut', 
              }}
            />
        </li>
    )
}

export default EcommerceProjectWiiBox