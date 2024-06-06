import { ReactNode } from "react"

interface ScrollBtn{
    scrollFunction : () => void,
    showBtn: boolean,
    rightParentVisible:boolean,
    hoverBtnTiming:boolean,
   

}

interface ScrollButton{
    arrowImg:string,
    hoverBtnImg:string,
    scrollFunction : () => void,
    showBtn: boolean,
    rightParentVisible:boolean,
    hoverBtnTiming:boolean 
    bounceAnimationX:string[],
    exitScaleX: number,
    squishScaleX:number[],
    hoverLeaveStartScaleX:number,
    hoverLeaveStartX:number,
    exitInitialX:string,
    arrowDirection:string,
    originX:number
}

interface HoverScrollHomeBtn{
    children:ReactNode,
    onClick:() => void,
    onHoverStart:() => void,
    exitScaleX: number,
    squishScaleX:number[],
    originX:number
}

export type { 
    ScrollBtn,
    HoverScrollHomeBtn,
    ScrollButton
}