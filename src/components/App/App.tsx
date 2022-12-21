import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "../../language/LanguageContext";
import { ThemeProvider } from "../../theme/ThemeContext";
import HomePage from "../HomePage";
import Sidebar from "../Sidebar";
import SketchPage from "../SketchPage";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <>
          <Sidebar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:sketchId" element={<SketchPage />} />
          </Routes>
        </>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
