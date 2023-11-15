import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar,logoutUser } from "../features/user/userSlice";
import { useState } from "react";


const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false)
  const { user } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  // console.log(user.name);

  const toggle = () => {
    dispatch(toggleSidebar())
  }
  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={toggle}>
<FaAlignLeft/>
        </button>
        <div>
          <Logo />
          <h2>dashboard</h2>
        </div>
        <div className="btn-container">
          <button className="btn" onClick={()=>setShowLogout(!showLogout)}>
            <FaUserCircle />
            {user?.name}
            <FaCaretDown/>
          </button>
          <div className={showLogout?'dropdown show-dropdown' : 'dropdown'}>
            <button className="dropdown-btn" onClick={()=> dispatch(logoutUser())} >logout</button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
