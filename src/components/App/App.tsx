import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "../../theme/ThemeContext";
import HomePage from "../HomePage";
import Sidebar from "../Sidebar";
import SketchPage from "../SketchPage";

function App() {
  return (
    <ThemeProvider>
      <>
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:sketchId" element={<SketchPage />} />
        </Routes>
      </>
    </ThemeProvider>
  );
}

export default App;
