import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeatherDashboard from "./pages/WeatherDashboard";
import WeatherDetailPage from "./pages/WeatherDetailPage";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman utama */}
        <Route path="/" element={<WeatherDashboard />} />

        {/* Halaman detail */}
        <Route path="/detail" element={<WeatherDetailPage />} />
      </Routes>
    </Router>
  );
}

