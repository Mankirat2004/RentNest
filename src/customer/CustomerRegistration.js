import React, { useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import CustomerService from "../services/customerServices";
import "./CustomerRegistration.css";

function CustomerRegistration() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  function getRegisterErrorMessage(errorCode) {
    if (errorCode === "auth/email-already-in-use") {
      return "This email is already registered. Please login instead.";
    }

    if (errorCode === "auth/invalid-email") {
      return "Please enter a valid email address.";
    }

    if (errorCode === "auth/weak-password") {
      return "Password should be at least 6 characters.";
    }

    return "Registration failed. Please try again.";
  }

  async function handleRegister(e) {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = userCredential.user.uid;

      const customerData = {
        uid,
        firstName,
        lastName,
        email,
        phone,
        role: "customer",
        createdAt: new Date().toISOString(),
      };

      await CustomerService.createCustomer(uid, customerData);

      setMessage("Customer registered successfully. You can now login.");
      setMessageType("success");

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setPassword("");

      setTimeout(() => {
        navigate("/customer-login");
      }, 1200);
    } catch (error) {
      setMessage(getRegisterErrorMessage(error.code));
      setMessageType("error");
    }
  }

  return (
    <div className="customer-registration-page">
      <div className="customer-registration-wrapper">
        <header className="customer-registration-header">
          <h1>RentNest</h1>
        </header>

        <main className="customer-registration-body">
          <form className="customer-registration-form" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {message && (
              <p className={`form-message ${messageType}`}>{message}</p>
            )}

            <div className="customer-registration-buttons">
              <button
                type="button"
                className="customer-login-btn"
                onClick={() => navigate("/customer-login")}
              >
                Login
              </button>

              <button type="submit" className="customer-register-btn">
                Register
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default CustomerRegistration;