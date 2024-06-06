import { LegacyRef,useEffect,useRef } from "react"
import { useImmer } from "use-immer"
import EmptyWiiBox from "./empty-wii-box"
import EcommerceProjectWiiBox from "./ecommerce-project-wii-box"
import minus from '../images/buttons/minus-sign.svg'
import leftScrollBtn from '../images/buttons/left-scroll-btn.svg'
import ArrowButton from "../reusable_components/arrow-btn"
import rightScrollBtn from '../images/buttons/right-scroll-btn.svg'
import plus from '../images/buttons/plus-sign.svg'






const MainHomePage = () => {

    const [time, setTime] = useImmer(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }))
    const [showRightBtn, setShowRightBtn] = useImmer(true)
    const [rightParentVisible,setRightParentVisible] = useImmer(true)
    const [hoverBtnTiming, setHoverBtnTiming] = useImmer(true)
    const wiiContainerRef:LegacyRef<HTMLDivElement>  = useRef(null)
 
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }))
        },1000)  

        return () => {
            clearInterval(interval)
        }
    },[])

    useEffect(() => {
        return() => {
            wiiContainerRef.current?.removeEventListener('scroll',scrollToEnd)
        }
    },[])

    const scrollToEnd = () => {
        setRightParentVisible(!rightParentVisible)
        if(wiiContainerRef.current){
            const wiiScroll = wiiContainerRef.current
            const targetScrollPosition = showRightBtn ? wiiScroll.scrollWidth : 0;

            const onScroll = ()  => {
                if(wiiScroll.scrollLeft + wiiScroll.clientWidth >= wiiScroll.scrollWidth || !showRightBtn && wiiScroll.scrollLeft === 0){
                    setHoverBtnTiming(!hoverBtnTiming)
                    setTimeout(
                        ()=> {
                            setShowRightBtn(!showRightBtn)
                        },100)
                    
                    wiiScroll.removeEventListener('scroll', onScroll)
                }
            }

            wiiScroll.addEventListener('scroll', onScroll)
            
            wiiScroll.scrollTo({
                left:targetScrollPosition,
                behavior:'smooth'
            })


        } 
    }


    const formatTime = time.split(' ')

    const timeMarginLeft = formatTime[0].split(':')[0].length === 1 ? '7.5vw' : '5.5vw'

    
    return(
        <div id="main-home-container">
            <section className="top-part" ref={wiiContainerRef}>
                <div id="wii-box-main-container">
                    <div className="wii-box-container">
                    <EcommerceProjectWiiBox></EcommerceProjectWiiBox>
                    {[...Array(11)].map((_box,i) => (
                        <EmptyWiiBox key={i}></EmptyWiiBox>
                    ))}
                    </div>
                    <ArrowButton
                        scrollFunction={scrollToEnd}
                        showBtn={showRightBtn}
                        rightParentVisible={rightParentVisible}
                        hoverBtnTiming={hoverBtnTiming} 
                        arrowImg={rightScrollBtn}
                        hoverBtnImg={plus} 
                        bounceAnimationX={['0%','-5%','0%,5%']} 
                        exitScaleX={.8} 
                        squishScaleX={[1,0.87,1,.95,1]} 
                        hoverLeaveStartScaleX={0.5} 
                        hoverLeaveStartX={10} 
                        exitInitialX={"50%"} 
                        arrowDirection={"right-scroll"}
                        originX={1}>
                    </ArrowButton>

                    <ArrowButton
                        scrollFunction={scrollToEnd} 
                        showBtn={!showRightBtn}
                        rightParentVisible={!rightParentVisible}
                        hoverBtnTiming={!hoverBtnTiming} 
                        arrowImg={leftScrollBtn}
                        hoverBtnImg={minus} 
                        bounceAnimationX={['0%','5%','0%,-5%']} 
                        exitScaleX={.8} 
                        squishScaleX={[1,.87,1,.95,1]} 
                        hoverLeaveStartScaleX={0.5} 
                        hoverLeaveStartX={10} 
                        exitInitialX={"-50%"} 
                        arrowDirection={"left-scroll"}
                        originX={0}>
                        

                    </ArrowButton>
                    <div className="wii-box-container">
                    {[...Array(12)].map((_box,i) => (
                        <EmptyWiiBox key={i} ></EmptyWiiBox>
                    ))}
                    </div> 
                    
                </div>
            </section>
            <section className='bottom-part'>
                <div className="time-container"
                style={{marginLeft:timeMarginLeft}}>
                    <p className="time">{formatTime[0]}</p>
                    <p className="time-period">{formatTime[1]}</p>
                </div>
            </section>
        </div>
    )

}

export default MainHomePage