import { useEffect } from "react"
import { useImmer } from "use-immer"
import EmptyWiiBox from "./empty-wii-box"


const MainHomePage = () => {

    const [time, setTime] = useImmer(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }))
    
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }))
        },1000)  

        return () => {
            clearInterval(interval)
        }
    },[])

    const formatTime = time.split(' ')
    
    return(
        <div id="main-home-container">
            <section className="top-part">
                <div id="wii-box-main-container">
                    <div className="wii-box-container">
                        <div></div>
                    {[...Array(11)].map((_box,i) => (
                        <EmptyWiiBox key={i}></EmptyWiiBox>
                    ))}
                    </div>
                    <div className="wii-box-container">
                    {[...Array(12)].map((_box,i) => (
                        <EmptyWiiBox key={i} ></EmptyWiiBox>
                    ))}
                    </div>
                    
                </div>
            </section>
            <section className='bottom-part'>
                <div className="time-container">
                    <p className="time">{formatTime[0]}</p>
                    <p className="time-period">{formatTime[1]}</p>
                </div>
            </section>
        </div>
    )

}

export default MainHomePage