import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks";
import FileStorage from "../FileStorage";
import SidebarHeader from "./Header";
import s from "./Sidebar.module.scss";

const Sidebar = () => {
  const ref = useRef(null);
  const [expanded, setExpanded] = useState(false);

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

      <div className={s.sidebarToggle} onClick={() => setExpanded(!expanded)}>
        <span>{expanded ? "HIDE" : "SKETCHES"}</span>
      </div>
    </div>
  );
};

export default Sidebar;
