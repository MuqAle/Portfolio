import { ReactNode } from "react"
import btnHighlight from "../images/buttons/button_highlight.svg"

const HomeBtn = ({type='',children}:{type?:string,children:ReactNode}) => {
    return (
        <button className={"home-btn " + type} >
            <img src={btnHighlight} className='btn-highlight' alt="Button Highlight"></img>
            {children}
        </button>
    )
}

export default HomeBtn