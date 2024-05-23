import { ReactNode } from "react"



const BtnContainer = ({side,children}:{side:string,children: ReactNode}) => {
    return(
        <div className={"navigation-btn-container " + side}>
            {children}
        </div>
    )
    
}

export default BtnContainer

