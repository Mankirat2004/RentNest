import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import VendorService from "../services/vendorService";
import "./VendorRegistration.css";

function VendorRegistration() {
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const vendorId = userCredential.user.uid;

      const vendorData = {
        vendorId: vendorId,
        businessName: businessName,
        ownerName: ownerName,
        email: email,
        phone: phone,
        role: "vendor",
        createdAt: new Date().toISOString(),
      };

      await VendorService.createVendor(vendorId, vendorData);

      setMessage("Vendor registered successfully");

      setBusinessName("");
      setOwnerName("");
      setEmail("");
      setPhone("");
      setPassword("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="registration-page">
      <header className="registration-header">
        <div className="registration-logo-placeholder"></div>
        <h1>RentNest</h1>
      </header>

      <main className="registration-body">
        <div className="registration-role-buttons">
          <button className="buyer-btn">I’m a Buyer</button>
          <button className="seller-btn active">I’m a Seller</button>
        </div>

        <form className="registration-form" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Business Name:"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Owner Name:"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email:"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Phone Number:"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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

          <div className="registration-action-buttons">
            <button type="button" className="login-btn">
              Login
            </button>

            <button type="submit" className="register-btn active">
              Register
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default VendorRegistration;