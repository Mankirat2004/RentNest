import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import VendorLogin from "./vendor/VendorLogin";
import VendorRegistration from "./vendor/VendorRegistration";
import VendorDashboard from "./vendor/VendorDashboard";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <nav className="main-navbar">
        <Link to="/">Login</Link>

        <Link to="/register">
          Registration
        </Link>

        <Link to="/dashboard">
          Dashboard
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<VendorLogin />} />

        <Route
          path="/register"
          element={<VendorRegistration />}
        />

        <Route
          path="/dashboard"
          element={<VendorDashboard />}
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;