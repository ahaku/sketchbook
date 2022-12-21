import { Link } from "react-router-dom";
import HomeIcon from "../../common/HomeIcon";
import ExportDB from "../../ExportDB";
import ImportDB from "../../ImportDB";
import LanguagePicker from "../../LanguagePicker";
import ThemeToggler from "../../ThemeToggler";
import s from "./SidebarHeader.module.scss";

const SidebarHeader = () => {
  return (
    <div className={s.sidebarHeader}>
      <div className={s.homeBtn}>
        <Link to="/">
          <HomeIcon title="Home" />
        </Link>
      </div>
      <LanguagePicker />
      <ImportDB />
      <ExportDB />
      <ThemeToggler />
    </div>
  );
};

export default SidebarHeader;
