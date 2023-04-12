import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "../../language/LanguageContext";
import { ThemeProvider } from "../../theme/ThemeContext";
import HomePage from "../HomePage";
import Sidebar from "../Sidebar";
import SketchPage from "../SketchPage";
import { Paths as P } from "../../paths";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <>
          <Sidebar />
          <Routes>
            <Route path={P.home} element={<HomePage />} />
            <Route path={P.sketchId} element={<SketchPage />} />
          </Routes>
        </>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
