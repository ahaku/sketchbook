import ExportDB from "../../ExportDB";
import ImportDB from "../../ImportDB";
import LanguagePicker from "../../LanguagePicker";
import ThemeToggler from "../../ThemeToggler";
import s from "./SidebarHeader.module.scss";
import HomeButton from "../../common/HomeButton/HomeButton";

const SidebarHeader = () => {
  return (
    <div className={s.sidebarHeader}>
      <HomeButton />
      <LanguagePicker />
      <ImportDB />
      <ExportDB />
      <ThemeToggler />
    </div>
  );
};

export default SidebarHeader;
