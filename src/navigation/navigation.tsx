import { useImmer } from "use-immer"
import BtnContainer from "./btn-container"
import HomeBtn from "../reusable_components/home_btns";
import envelope from '../images/buttons/envelope.svg'
import calender from "../images/buttons/calender.svg"
import contact from "../images/buttons/contact-me.svg"
import home from "../images/buttons/home.svg"


const Navigation = () => {

    const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        month: "numeric",
        day: "numeric"
      };
    const [date, setDate] = useImmer(new Date().toLocaleDateString('en-US', options).split(', '))

    
    return(
        <nav id="navigation">
            <BtnContainer side={"left"}>
                <div className="navigation-small-btn-container">
                    <HomeBtn type="small">
                        <img src={calender} alt="Calender" />
                    </HomeBtn>
                    <HomeBtn type="small">
                        <img src={contact} alt="Page with a pen on top" />
                    </HomeBtn>
                </div>
                <HomeBtn type="medium">
                    <p>Muq</p>
                </HomeBtn>
                
            </BtnContainer>
            <p id="navigation-date">{date[0]} {date[1]}</p>
            <BtnContainer side={"right"}>
                <HomeBtn type="medium">
                    <img src={envelope} alt="envelope" />
                </HomeBtn>
                <HomeBtn type="large">
                    <img src={home} alt="Box with muq written on it" />
                </HomeBtn>
            </BtnContainer>
        </nav>
    )
    
}

export default Navigation



