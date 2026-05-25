import React, { useState } from "react";
import "./VendorLogin.css";

function VendorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    alert("Vendor login submitted");
  }

  return (
    <div className="vendor-login-page">
      <div className="vendor-login-card">
        <h1 className="vendor-logo">RentNest</h1>
        <h2>Vendor Login</h2>
        <p className="login-subtitle">
          Login to manage your rental products and bookings
        </p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter vendor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="register-text">
          New vendor? <span>Create an account</span>
        </p>
      </div>
    </div>
  );
}

export default VendorLogin;