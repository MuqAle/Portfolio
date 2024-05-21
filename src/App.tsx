import MainHomePage from "./home_menu_page/main-page"
import Navigation from "./navigation/navigation"
import "./stylessheet/css/reusuable-components.css"
import "./stylessheet/css/home-menu.css"
import "./stylessheet/css/navigation.css"



function App() {

  return(
    <main className="main-container">
      <MainHomePage></MainHomePage>
      <Navigation></Navigation>
    </main>
  )
}

export default App
