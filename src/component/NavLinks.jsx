import { keyframes } from "styled-components";
import links from "../utils/Links";
import { NavLink } from "react-router-dom";
// import { Dispatch } from "react";
import { useDispatch } from "react-redux";
// import { toggleSidebar } from "../features/user/userSlice";
const NavLinks = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { id, text, icon, path } = link;
        return (
          <NavLink
            onClick={toggleSidebar}
            to={path}
            className={({ isActive }) => {
              return isActive ? "nav-link active" : "nav-link";
            }}
            key={id}
          >
            <span>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
