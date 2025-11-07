import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CandidateFormPage from "./pages/CandidateFormPage";
import DeleteAccountPage from "./pages/DeleteAccountPage";
import StatsPage from "./pages/StatsPage";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<CandidateFormPage />} />
          <Route path="/delete" element={<DeleteAccountPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </div>
    </Router>
  );
}