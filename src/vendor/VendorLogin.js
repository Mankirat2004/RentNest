import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./VendorLogin.css";

function VendorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    setMessage("");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Logged in:", userCredential.user.uid);
        setMessage("Login successful");
      })
      .catch((error) => {
        setMessage(error.message);
      });
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
            type="email"
            placeholder="Email:"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password:"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {message && <p className="form-message">{message}</p>}

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