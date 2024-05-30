
import outline from '../images/home-menu/wii-box-border.svg'
import background from '../images/home-menu/wii-box-bg.svg'

const EmptyWiiBox = () => {
    return(
        <li className="wii-box">
            <img className='wii-outline' src={outline} alt="" />
            <img className="wii-background" src={background} alt="" />
            <div className="wii-tv-animation"></div>
        </li>
    )
}

export default EmptyWiiBox