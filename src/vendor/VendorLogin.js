import React, { useState } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./VendorLogin.css";

function VendorLogin() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("seller");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-email":
        return "Please enter a valid email address.";

      case "auth/invalid-credential":
        return "Incorrect email or password.";

      case "auth/user-not-found":
        return "Account not found.";

      case "auth/wrong-password":
        return "Incorrect password.";

      case "auth/missing-password":
        return "Please enter your password.";

      default:
        return "Login failed. Please try again.";
    }
  };

  const handleBuyerSelect = () => {
    setSelectedRole("buyer");
    setMessage("");
  };

  const handleSellerSelect = () => {
    setSelectedRole("seller");
    setMessage("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      setMessage("Login successful!");
      setMessageType("success");

      setTimeout(() => {
        if (selectedRole === "seller") {
          navigate("/vendor-dashboard");
        } else {
          navigate("/customer-dashboard");
        }
      }, 1000);

    } catch (error) {
      setMessage(getErrorMessage(error.code));
      setMessageType("error");
    }
  };

  return (
    <div className="login-page">

      <div className="login-wrapper">

        <header className="top-header">
          <h1>RentNest</h1>
        </header>

        <main className="login-body">

          <div className="role-buttons">

            <button
              type="button"
              className={
                selectedRole === "buyer"
                  ? "buyer-btn active-role"
                  : "buyer-btn"
              }
              onClick={handleBuyerSelect}
            >
              I’m a Buyer
            </button>

            <button
              type="button"
              className={
                selectedRole === "seller"
                  ? "seller-btn active-role"
                  : "seller-btn"
              }
              onClick={handleSellerSelect}
            >
              I’m a Seller
            </button>

          </div>

          <form
            className="login-form"
            onSubmit={handleLogin}
          >

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

            {message && (
              <p
                className={`form-message ${messageType}`}
              >
                {message}
              </p>
            )}

            <div className="action-buttons">

              <button
                type="submit"
                className="login-btn"
              >
                Login
              </button>

              <button
                type="button"
                className="register-btn"
                onClick={() =>
                  navigate("/vendor-registration")
                }
              >
                Register
              </button>

            </div>

          </form>

        </main>

      </div>

    </div>
  );
}

export default VendorLogin;