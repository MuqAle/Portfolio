import btnHighlight from '../images/buttons/menu_btn_highlight.svg'


interface MenuBtnType {
   btnName:string,
   type:string,
   onClick?:() => void,
   link?:string
}

const MenuBtn = ({btnName,type,onClick,link}:MenuBtnType) => (

      link ?
     <a href={link} className={"menu-btn " + type} target="_blank" rel="noopener noreferrer">
        <button >
           <img src={btnHighlight} alt="" />
           <p>
            {btnName}
           </p>
        </button>
     </a>
     :
     <button className={"menu-btn " + type} onClick={onClick}>
     <img src={btnHighlight} alt="" />
      <p>
         {btnName}
      </p>  
      </button>
)

export default MenuBtn