import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks";
import FileStorage from "../FileStorage";
import SidebarHeader from "./Header";
import s from "./Sidebar.module.scss";
import HomeButton from "../common/HomeButton";
import { stopPropagation } from "../../helpers/utils";
import { useLocation } from "react-router-dom";
import { Paths as P } from "../../paths";

const Sidebar = () => {
  const ref = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const showHomeButton = location.pathname !== P.home && !expanded;

  const onOutsideClick = () => {
    setExpanded(false);
  };

  useClickOutside(ref, onOutsideClick);

  return (
    <div
      ref={ref}
      className={`${s.sidebar} ${expanded ? s.expanded : s.collapsed}`}
    >
      <SidebarHeader />

      <FileStorage />

      <div
        className={s.sidebarToggle}
        onClick={() => setExpanded((prev) => !prev)}
      >
        {showHomeButton && (
          <HomeButton className={s.homeButton} onClick={stopPropagation} />
        )}
        <span>{expanded ? "HIDE" : "SKETCHES"}</span>
      </div>
    </div>
  );
};

export default Sidebar;
