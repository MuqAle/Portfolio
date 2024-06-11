import btnHighlight from '../images/buttons/menu_btn_highlight.svg'

const MenuBtn = ({btnName,type}:{btnName:string,type:string}) => (
     <button className={"menu-btn " + type}>
        <img src={btnHighlight} alt="" />
        <p>
         {btnName}
        </p>
        
     </button>
)

export default MenuBtn