import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import CandideLink from "./pages/LinkPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Home />} />
        <Route path="/interview/:uuid" element={<CandideLink />} />
        <Route path="*" element={<NotFound />} /> {/* 404 sayfası */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;