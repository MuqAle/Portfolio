import btnHighlight from '../images/buttons/menu_btn_highlight.svg'

const MenuBtn = ({btnName}:{btnName:string}) => (
     <button className="menu-btn">
        <img src={btnHighlight} alt="" />
        {btnName}
     </button>
)

export default MenuBtn