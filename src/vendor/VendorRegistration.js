import React, { useState } from "react";
import "./VendorRegistration.css";

function VendorRegistration() {
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleRegister(e) {
    e.preventDefault();
    console.log(formData);
  }

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
            name="businessName"
            placeholder="Business Name:"
            value={formData.businessName}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email:"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number:"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password:"
            value={formData.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password:"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

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