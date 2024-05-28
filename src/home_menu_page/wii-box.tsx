import { ReactNode } from "react"
import outline from '../images/home-menu/wii-box-border.svg'

const WiiBox = ({img}:{img?:ReactNode}) => {
    return(
        <li className="wii-box">
            {img}
        </li>
    )
}

export default WiiBox