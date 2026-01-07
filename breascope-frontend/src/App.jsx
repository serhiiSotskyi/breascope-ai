import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Predict from "./pages/Predict";
import Report from "./pages/Report";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">BreaScope AI</Link>

          <div className="navbar-nav">
            <Link className="nav-link" to="/">Predictor</Link>
            <Link className="nav-link" to="/report">Technical Report</Link>
          </div>
        </div>
      </nav>

      <div className="container mt-4 mb-5">
        <Routes>
          <Route path="/" element={<Predict />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}