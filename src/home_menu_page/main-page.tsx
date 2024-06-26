import { LegacyRef,useContext,useEffect,useRef } from "react"
import { Updater, useImmer } from "use-immer"
import EmptyWiiBox from "./empty-wii-box"
import EcommerceProjectWiiBox from "./ecommerce-project-wii-box"
import minus from '../images/buttons/minus-sign.svg'
import leftScrollBtn from '../images/buttons/left-scroll-btn.svg'
import ArrowButton from "../reusable_components/home-arrow-btn"
import rightScrollBtn from '../images/buttons/right-scroll-btn.svg'
import plus from '../images/buttons/plus-sign.svg'
import PortfolioWiiBox from "./portfolio-wii-box"
import ZoomContext from "../context/zoom-context"
import ViewPortContext from "../context/viewport-dimensions"





const MainHomePage = ({setTransformOrigin,setZoom}:
    {setTransformOrigin: Updater<{ x: number; y: number; }>,
    transformOrigin:{x:number,y:number},
    setZoom:Updater<boolean>,}) => {
        
    const zoom = useContext(ZoomContext)
    const viewportDimensions = useContext(ViewPortContext)
    const [time, setTime] = useImmer(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }))
    const [showRightBtn, setShowRightBtn] = useImmer(true)
    const [rightParentVisible,setRightParentVisible] = useImmer(true)
    const [hoverBtnTiming, setHoverBtnTiming] = useImmer(true)
    const wiiContainerRef:React.RefObject<HTMLDivElement>  = useRef(null)


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

// Calculates the point  of transform origin in respective to viewport of the container
    const handleZoomIn = (event: React.FocusEvent<HTMLDivElement>) => {
        if(!zoom){
            const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
            const windowDimensions = {width:window.innerWidth, height:window.innerHeight}
            const viewportWidth = (windowDimensions.width - viewportDimensions.width)/2 //divide by 2, take the top area and bottom
            const viewportHeight = (windowDimensions.height - viewportDimensions.height)/2
            const xZoom = left + (width / 2) - viewportWidth
            const yZoom = top + (height / 2) - viewportHeight
            const x = xZoom * 3
            const y = yZoom * 3
            setTransformOrigin({ x, y })
            setZoom(true)
        }
    
    }

// Scrolls to the end of the div and sets timing of when the arrow button should dissapear for aniamtions
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
    const hour = formatTime[0].split(':')[0]
    const minutes = formatTime[0].split(':')[1]
    const timeMarginLeft = hour.length === 1 ? '4.5rem' : '1.1rem'

    
    return(
        <div id="main-home-container" >
            <section className={"top-part" + (zoom ? ' no-scroll':'')} >
                <div id="wii-box-main-container">
                    <div className="wii-box-container" ref={wiiContainerRef} style={{overflowX:zoom ? 'hidden':'scroll'}}>
                    <PortfolioWiiBox></PortfolioWiiBox>
                    <EcommerceProjectWiiBox
                    setZoom={setZoom}
                    onClick={(event) => {
                        event.stopPropagation()
                        handleZoomIn(event)
                      }}></EcommerceProjectWiiBox>
                    {[...Array(22)].map((_box,i) => (
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
                        bounceAnimationX={['0%', '-5%', '0%,5%']}
                        exitScaleX={.8}
                        squishScaleX={[1, 0.87, 1, .95, 1]}
                        hoverLeaveStartScaleX={0.5}
                        hoverLeaveStartX={10}
                        exitInitialX={"50%"}
                        arrowDirection={"right-scroll"}
                        originX={1} zoom={zoom}>
                    </ArrowButton>

                    <ArrowButton
                        scrollFunction={scrollToEnd}
                        showBtn={!showRightBtn}
                        rightParentVisible={!rightParentVisible}
                        hoverBtnTiming={!hoverBtnTiming}
                        arrowImg={leftScrollBtn}
                        hoverBtnImg={minus}
                        bounceAnimationX={['0%', '5%', '0%,-5%']}
                        exitScaleX={.8}
                        squishScaleX={[1, .87, 1, .95, 1]}
                        hoverLeaveStartScaleX={0.5}
                        hoverLeaveStartX={10}
                        exitInitialX={"-50%"}
                        arrowDirection={"left-scroll"}
                        originX={0} zoom={zoom}>
                        

                    </ArrowButton>
                    
                </div>
            </section>
            <section className='bottom-part'>
                <div className="time-container"
                style={{marginLeft:timeMarginLeft}}>
                    <p className="time">
                        {hour}
                        <span>:</span>
                        {minutes}
                    </p>
                    <p className="time-period">{formatTime[1]}</p>
                </div>
            </section>
        </div>
    )

}

export default MainHomePage