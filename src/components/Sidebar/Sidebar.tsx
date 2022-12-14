import { useLocalStorage } from "../../hooks";
import FileStorage from "../FileStorage";
import SidebarHeader from "./Header";
import s from "./Sidebar.module.scss";

const Sidebar = () => {
  const [expanded, setExpanded] = useLocalStorage("sidebar-expanded", true);
  return (
    <div className={`${s.sidebar} ${expanded ? s.expanded : s.collapsed}`}>
      <SidebarHeader />

      <FileStorage />

      <div className={s.sidebarToggle} onClick={() => setExpanded(!expanded)}>
        <span>{expanded ? "HIDE" : "SKETCHES"}</span>
      </div>
    </div>
  );
};

export default Sidebar;
