import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./components/AdminLayout";

import VendorLogin from "./vendor/VendorLogin";
import VendorRegistration from "./vendor/VendorRegistration";
import VendorDashboard from "./vendor/VendorDashboard";
import CustomerLogin from "./customer/CustomerLogin";
import CustomerRegistration from "./customer/CustomerRegistration";
import CustomerDashboard from "./customer/CustomerDashboard";
import "./index.css";

function CustomerDashboardDummy() {
  return (
    <div style={{ padding: "50px" }}>
      <h1>Customer Dashboard</h1>
      <p>This is a dummy customer dashboard for now.</p>
    </div>
  );
}

function AdminRoute() {
  const { currentUser, userRole } = useAuth();

  if (!currentUser || userRole !== "admin") {
    return <LoginPage />;
  }

  return <AdminLayout />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/vendor-login" element={<VendorLogin />} />
<Route path="/vendor-registration" element={<VendorRegistration />} />
<Route path="/vendor-dashboard" element={<VendorDashboard />} />

<Route path="/customer-login" element={<CustomerLogin />} />
<Route path="/customer-registration" element={<CustomerRegistration />} />
<Route path="/customer-dashboard" element={<CustomerDashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}