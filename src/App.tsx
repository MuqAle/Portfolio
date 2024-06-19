import MainHomePage from "./home_menu_page/main-page"
import Navigation from "./navigation/navigation"
import "./stylessheet/css/reusuable-components.css"
import "./stylessheet/css/home-menu.css"
import "./stylessheet/css/navigation.css"
import "./stylessheet/css/channel-overlay.css"
import "./stylessheet/css/small-wii-box.css"
import { useImmer } from "use-immer"
import { animate, delay, motion } from "framer-motion"
import ZoomContext from "./zoom-context"





function App() {
 
  const [zoom, setZoom] = useImmer(false)
  const [transformOrigin, setTransformOrigin] = useImmer({ x: 0, y: 0 })
  // const [selectedId, setSelectedId] = useImmer<number | null>(null);

  const variants = {
    animate:{
      scale: zoom ? 3 : 1,
      x: zoom ? `calc(150% - ${transformOrigin.x}px)` : 0,
      y: zoom ? `calc(150% - ${transformOrigin.y}px)` : 0,
      transition:{ 
        duration:.5
      }
    },
  }

  return(
    <ZoomContext.Provider value = {zoom}>
    <motion.main
    className="main-container"
    animate='animate'
    variants={variants}
>
      <MainHomePage transformOrigin={transformOrigin} setTransformOrigin={setTransformOrigin} setZoom={setZoom}></MainHomePage>
      <Navigation></Navigation>
    </motion.main>
    </ZoomContext.Provider>

  )
}

export default App
