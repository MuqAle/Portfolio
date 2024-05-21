import { useImmer } from "use-immer"
import BtnContainer from "./btn-container"

const Navigation = () => {
    const [date, setDate] = useImmer(new Date().toDateString().split(' '))
    
    return(
        <nav id="navigation">
            <BtnContainer side={"left"}></BtnContainer>
            <p id="navigation-date">{date[0]} {date[1]}/{date[2]}</p>
            <BtnContainer side={"right"}></BtnContainer>
        </nav>
    )
    
}

export default Navigation