import { useState } from "react";

function Checkout({ cartItems, setPage }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    suburb: "",
    postcode: "",
    phone: "",
    email: "",
    notes: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const total = cartItems.reduce(
    (sum, item) => sum + item.priceNumber * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.address.trim()) newErrors.address = "Street address is required";
    if (!formData.suburb.trim()) newErrors.suburb = "Suburb is required";
    if (!formData.postcode.trim()) newErrors.postcode = "Postcode is required";

    if (!/^[0-9]{8,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.terms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const placeOrder = () => {
    if (validateForm()) {
      setPage("payment");
    }
  };

  return (
    <>
      <section className="shop-banner">
        <h1>Checkout</h1>
      </section>

      <section className="checkout-page">
        <div className="checkout-left">
          <div className="checkout-card">
            <h2>👤 Billing Details</h2>

            <div className="checkout-form-grid">
              <div>
                <label>First name *</label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <p className="error">{errors.firstName}</p>}
              </div>

              <div>
                <label>Last name *</label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                />
                {errors.lastName && <p className="error">{errors.lastName}</p>}
              </div>

              <div className="full-width">
                <label>Street address *</label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House number and street name"
                />
                {errors.address && <p className="error">{errors.address}</p>}
              </div>

              <div>
                <label>Suburb *</label>
                <input
                  name="suburb"
                  value={formData.suburb}
                  onChange={handleChange}
                  placeholder="Enter your suburb"
                />
                {errors.suburb && <p className="error">{errors.suburb}</p>}
              </div>

              <div>
                <label>Postcode *</label>
                <input
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleChange}
                  placeholder="Enter postcode"
                />
                {errors.postcode && <p className="error">{errors.postcode}</p>}
              </div>

              <div>
                <label>Phone *</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
                {errors.phone && <p className="error">{errors.phone}</p>}
              </div>

              <div>
                <label>Email address *</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
            </div>
          </div>

          <div className="checkout-card">
            <h2>📝 Additional Information</h2>

            <div className="checkout-form-grid">
              <div className="full-width">
                <label>Order Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Notes about your order, delivery instructions or any special requests."
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="order-box">
          <h2>🛒 Your Order</h2>

          <div className="order-table">
            <div className="order-row order-head">
              <b>Product</b>
              <b>Subtotal</b>
            </div>

            {cartItems.map((item) => (
              <div className="order-row" key={item.id}>
                <span>
                  {item.name} × {item.quantity}
                </span>
                <strong>${(item.priceNumber * item.quantity).toFixed(2)}</strong>
              </div>
            ))}

            <div className="order-row">
              <b>Subtotal</b>
              <strong>${total.toFixed(2)}</strong>
            </div>

            <div className="order-row total-row">
              <b>Total</b>
              <strong>${total.toFixed(2)}</strong>
            </div>
          </div>

          <div className="privacy-box">
            🔒 Your personal data will be used to process your order and support
            your experience throughout this website.
          </div>

          <label className="terms-row">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
            />
            I have read and agree to the website terms and conditions *
          </label>

          {errors.terms && <p className="error">{errors.terms}</p>}

          <button className="place-order-btn" onClick={placeOrder}>
            🔒 PLACE ORDER
          </button>
        </div>
      </section>
    </>
  );
}

export default Checkout;