import { BsFillSunFill } from "react-icons/bs";
import { RiMoonClearFill } from "react-icons/ri";
import { useThemeContext } from "../../theme/ThemeContext";
import s from "./ThemeToggler.module.scss";

const ThemeToggler = () => {
  const { theme, setTheme } = useThemeContext();
  const nextTheme = theme === "light" ? "dark" : "light";
  const icon =
    theme === "light" ? (
      <RiMoonClearFill size={18} title="Dark mode" />
    ) : (
      <BsFillSunFill size={18} title="Light mode" />
    );

  return (
    <button className={s.themeToggler} onClick={() => setTheme(nextTheme)}>
      {icon}
    </button>
  );
};

export default ThemeToggler;
