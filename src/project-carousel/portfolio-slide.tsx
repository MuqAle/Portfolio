import discHeader from '../images/channel-overlay/portfolio-channel/disc-header.svg'
import disc from '../images/channel-overlay/portfolio-channel/insert-disc.svg'

const PortfolioSlide = () => {
    return(
        <div className="overlay-slide disc-overlay">
            
            <div className='disc-channel-header'>
                <img src={discHeader} alt="" />
                <p>Disc Channel</p>
            </div>
            <div className='disc-channel-body'>
                <div className='disc-bg'></div>
                <img className='insert-disc' src={disc} alt="" />
                <img className='insert-disc-reflection' src={disc} alt="" />
            </div>
            
        </div>
    )
}

export default PortfolioSlide 