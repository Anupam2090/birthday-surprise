import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UnlockPage from "./pages/UnlockPage.js";  // ✅ Don't forget this import!
import MemoriesPage from "./pages/MemoriesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/unlock" element={<UnlockPage />} />
        <Route path="/memories" element={<MemoriesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
