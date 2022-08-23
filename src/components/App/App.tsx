import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocalStorage } from "../../hooks";
import { Theme } from "../../types";
import HomePage from "../HomePage";
import Sidebar from "../Sidebar";
import SketchPage from "../SketchPage";

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
        <Route path="/:sketchId" element={<SketchPage />} />
      </Routes>
    </>
  );
}

export default App;
