import { Link } from "react-router-dom";
import HomeIcon from "../../common/HomeIcon";
import LanguagePicker from "../../LanguagePicker";
import ThemeToggler from "../../ThemeToggler";
import s from "./SidebarHeader.module.scss";

const SidebarHeader = () => {
  return (
    <div className={s.sidebarHeader}>
      <div>
        <Link to="/">
          <HomeIcon title="Home" />
        </Link>
      </div>
      <LanguagePicker />
      <ThemeToggler />
    </div>
  );
};

export default SidebarHeader;
