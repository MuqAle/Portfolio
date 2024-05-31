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
            <div className="navigation-big-container left-side">
                <BtnContainer side={"left-side left"}>
                <div className="navigation-small-btn-container">
                    <div className="small-upside-down-home-btn-containers">
                        <HomeBtn type="small">
                            <img src={contact} alt="Page with a pen on top" />
                        </HomeBtn>
                    </div>
                    <div className="small-upside-down-home-btn-containers">
                        <HomeBtn type="small">
                            <img src={calender} alt="Calender" />
                        </HomeBtn>
                    </div>
                </div>
            </BtnContainer>
            <BtnContainer side="left-side right">
                <HomeBtn type="medium">
                    <p>Muq</p>
                </HomeBtn>
            </BtnContainer>
            </div>
            <p id="navigation-date">{date[0]} {date[1]}</p>
            <div className="navigation-big-container right-side">
                <BtnContainer side={"right-side left"}>
                    <HomeBtn type="medium">
                        <img src={envelope} alt="envelope" />
                    </HomeBtn>
                </BtnContainer>
                <BtnContainer side="right-side right">
                    <div className="large-upside-down-home-btn-containers">
                        <HomeBtn type="large">
                            <img src={home} alt="Box with muq written on it" />
                        </HomeBtn>
                    </div>
                </BtnContainer>
            </div>
                
            
        </nav>
    )
    
}

export default Navigation



