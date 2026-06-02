import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  function fillDemo() {
    setEmail("admin@rentnest.com");
    setPassword("admin123");
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          {/* RentNest logo SVG inline — matches the uploaded handshake logo */}
          <svg width="70" height="70" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" rx="24" fill="#4a9ebe"/>
            <circle cx="100" cy="90" r="68" fill="#2f7aa8"/>
            {/* Handshake simplified */}
            <path d="M55 100 Q65 85 80 88 L100 82 L120 88 Q135 85 145 100 Q135 115 120 112 L100 118 L80 112 Q65 115 55 100Z" fill="#7dc0e0" stroke="#2a6a98" strokeWidth="3"/>
            <path d="M70 95 Q80 80 95 85 L100 82 L105 85 Q120 80 130 95" fill="none" stroke="#2a6a98" strokeWidth="4" strokeLinecap="round"/>
          </svg>
          <h1>RentNest</h1>
          <p>Admin Panel</p>
        </div>

        {error && <div className="login-error">⚠️ {error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              className="form-input"
              type="email"
              placeholder="admin@rentnest.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In to Admin Panel"}
          </button>
        </form>

        <div className="demo-credentials" onClick={fillDemo} style={{ cursor: "pointer" }}>
          <strong>🔑 Demo Credentials (click to fill)</strong>
          Email: admin@rentnest.com<br />
          Password: admin123
        </div>
      </div>
    </div>
  );
}
