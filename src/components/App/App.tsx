import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocalStorage } from "../../hooks";
import { Theme } from "../../types";
import HomePage from "../HomePage";
import Sidebar from "../Sidebar";

function App() {
  const [theme] = useLocalStorage<Theme>("theme", "light");
  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
