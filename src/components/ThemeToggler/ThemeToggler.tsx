import { useThemeContext } from "../../theme/ThemeContext";

const ThemeToggler = () => {
  const { theme, setTheme } = useThemeContext();
  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <div>
      {/* todo: theme toggler */}
      <button onClick={() => setTheme(nextTheme)}>Toggle theme</button>
    </div>
  );
};

export default ThemeToggler;
