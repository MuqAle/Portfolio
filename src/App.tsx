import MainHomePage from "./home_menu_page/main-page"
import Navigation from "./navigation/navigation"
import "./stylessheet/css/reusuable-components.css"
import "./stylessheet/css/home-menu.css"
import "./stylessheet/css/navigation.css"
import "./stylessheet/css/channel-overlay.css"
import "./stylessheet/css/small-wii-box.css"
import { useImmer } from "use-immer"
import { AnimatePresence, animate, delay, motion, transform, useAnimation, useWillChange } from "framer-motion"
import ZoomContext from "./zoom-context"
import { useEffect, useMemo, useRef } from "react"





function App() {
 
  const [zoom, setZoom] = useImmer(false)
  const [transformOrigin, setTransformOrigin] = useImmer({ x: 0, y: 0 })
  const [styles, setStyles] = useImmer({})
  const viewportRef:React.RefObject<HTMLDivElement> = useRef(null)

  useEffect(() => {
    function resizeViewport() {
      // const viewport = document.querySelector('#viewport');
      const aspectRatio = 16 / 9;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      if(viewportRef.current){
        if (windowWidth / windowHeight > aspectRatio ) {
          viewportRef.current.style.width = `${windowHeight * aspectRatio}px`
          viewportRef.current.style.height = `${windowHeight}px`
          document.documentElement.style.fontSize = `${(windowHeight * aspectRatio)/100}px`
      } else {
        viewportRef.current.style.width = `${windowWidth}px`
        viewportRef.current.style.height = `${windowWidth / aspectRatio}px`
        document.documentElement.style.fontSize =  `${windowWidth/100}px`
      }
      }
     
  }

  window.addEventListener('resize', resizeViewport);
  window.addEventListener('load', resizeViewport);
  })

  useEffect(() => {
    const targetX = zoom ? `calc(150% - ${transformOrigin.x}px)` : '0px'
    const targetY = zoom ? `calc(150% - ${transformOrigin.y}px)` : '0px'
    setStyles({
      transform: `translate(${targetX}, ${targetY}) scale(${zoom ? 3 : 1})`,
      transition: 'transform 0.5s ease-in-out',
    })
  },[zoom, transformOrigin])



  return(
    <ZoomContext.Provider value = {zoom}>
    <div id="viewport" ref={viewportRef}>
    <motion.main
    className={"main-container"}
    style={styles}>
      <MainHomePage transformOrigin={transformOrigin} setTransformOrigin={setTransformOrigin} setZoom={setZoom}></MainHomePage>
      <Navigation></Navigation>
    </motion.main>
    </div>

    </ZoomContext.Provider>

  )
}

export default App
