
import outline from '../images/home-menu/wii-box-border.svg'
import background from '../images/home-menu/wii-box-bg.svg'

const EmptyWiiBox = () => {
    return(
        <li className="empty wii-box">
            <img className='wii-outline empty' src={outline} alt="grey outline of a tv screen" />
            <img className="wii-background" src={background} alt="tv static" />
            <div className='wii-box-text'>Muq</div>
            <div className="wii-tv-animation"></div>
        </li>
    )
}

export default EmptyWiiBox



