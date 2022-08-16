import FileStorage from "../FileStorage";
import s from "./Sidebar.module.scss";
const Sidebar = () => {
  return (
    <div className={s.sidebar}>
      <FileStorage />
    </div>
  );
};

export default Sidebar;
