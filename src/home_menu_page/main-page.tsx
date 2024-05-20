import { useEffect } from "react"
import { useImmer } from "use-immer"


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
        <section id="main-home-container">
            <div className="top-part">
                <div></div>
            </div>
            <div className='bottom-part'>
                <div className="time-container">
                    <p className="time">{formatTime[0]}</p>
                    <p className="time-period">{formatTime[1]}</p>
                </div>
            </div>
        </section>
    )

}

export default MainHomePage