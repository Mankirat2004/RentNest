function Checkout({ cartItems, setPage }) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.priceNumber * item.quantity,
    0
  );

  return (
    <>
      <section className="shop-banner">
        <h1>Checkout</h1>
      </section>

      <section className="checkout-page">
        <div className="billing-details">
          <h2>Billing details</h2>

          <div className="form-row">
            <div>
              <label>First name *</label>
              <input />
            </div>

            <div>
              <label>Last name *</label>
              <input />
            </div>
          </div>

          <label>Street address *</label>
          <input placeholder="House number and street name" />

          <label>Suburb *</label>
          <input />

          <label>Postcode *</label>
          <input />

          <label>Phone *</label>
          <input />

          <label>Email address *</label>
          <input />
        </div>

        <div className="additional-info">
          <h2>Additional information</h2>

          <label>Order notes optional</label>
          <textarea placeholder="Notes about your order, e.g. special notes for delivery." />

          <label>Expected Rental Period *</label>
          <select>
            <option>Select your expected rental period</option>
            <option>1 week</option>
            <option>2 weeks</option>
            <option>1 month</option>
            <option>3 months</option>
            <option>6 months</option>
          </select>
        </div>

        <div className="order-box">
          <h2>Your order</h2>

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

            <div className="order-row">
              <b>Total</b>
              <strong>${total.toFixed(2)}</strong>
            </div>
          </div>

          <div className="place-order-box">
            <p>
              Your personal data will be used to process your order and support
              your experience throughout this website.
            </p>

            <label>
              <input type="checkbox" /> I have read and agree to the website
              terms and conditions *
            </label>

            <button onClick={() => setPage("payment")}>PLACE ORDER</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Checkout;