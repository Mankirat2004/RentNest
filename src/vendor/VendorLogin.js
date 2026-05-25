import React, { useState } from "react";
import "./VendorLogin.css";

function VendorLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    console.log(username, password);
  }

  return (
    <div className="login-page">
      <header className="top-header">
        <div className="logo-placeholder"></div>
        <h1>RentNest</h1>
      </header>

      <main className="login-body">
        <div className="role-buttons">
          <button className="buyer-btn">I’m a Buyer</button>
          <button className="seller-btn">I’m a Seller</button>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username:"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password:"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="action-buttons">
            <button type="submit" className="login-btn">
              Login
            </button>

            <button type="button" className="register-btn">
              Register
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default VendorLogin;