import React, { useState } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./CustomerLogin.css";

function CustomerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setMessage("");

    try {
      await signInWithEmailAndPassword(auth, email, password);

      setMessage("Login successful. Redirecting...");
      setMessageType("success");

      setTimeout(() => {
        navigate("/customer-dashboard");
      }, 700);
    } catch (error) {
      setMessage("Invalid email or password.");
      setMessageType("error");
    }
  }

  return (
    <div className="customer-login-page">
      <header className="customer-login-header">
        <h1>RentNest</h1>
      </header>

      <main className="customer-login-body">
        <form className="customer-login-form" onSubmit={handleLogin}>
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

          {message && <p className={`form-message ${messageType}`}>{message}</p>}

          <div className="customer-action-buttons">
            <button type="submit">Login</button>

            <button type="button" onClick={() => navigate("/customer-registration")}>
              Register
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default CustomerLogin;