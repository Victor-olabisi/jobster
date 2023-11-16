import { FaTimes } from "react-icons/fa"
import Wrapper from "../assets/wrappers/SmallSidebar"
import Logo from "./Logo"
import { useDispatch, useSelector } from "react-redux"
import { toggleSidebar } from "../features/user/userSlice"
// import NavLink from '../component/NavLink.jsx'
import NavLinks from "./NavLinks"


const SmallSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user)
  const dispatch = useDispatch()

  const toggle = () => {
    dispatch(toggleSidebar())
  }
  return (
    <Wrapper>
      <div className={isSidebarOpen? 'sidebar-container show-sidebar': 'sidebar-container'}>
        <div className="content">
          <button className="close-btn" onClick={toggle}>
            <FaTimes/>
          </button>
          <header>
            <Logo/>
          </header>
          <div className="nav-links">
            <NavLinks toggleSidebar={()=>dispatch(toggleSidebar())} />
          </div>
        </div>
</div>
    </Wrapper>
  )
}
export default SmallSidebar