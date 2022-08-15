import { useLocalStorage } from "../../hooks";
import { Theme } from "../../types";

const ThemeToggler = () => {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "light");
  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <div>
      {/* todo: theme toggler */}
      <button onClick={() => setTheme(nextTheme)}>Toggle theme</button>
    </div>
  );
};

export default ThemeToggler;
