import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./components/AdminLayout";
import "./index.css";

function AppContent() {
  const { currentUser, userRole } = useAuth();
  if (!currentUser || userRole !== "admin") return <LoginPage />;
  return <AdminLayout />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
