function Payment({ cartItems, setPage }) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.priceNumber * item.quantity,
    0
  );

  return (
    <>
      <section className="shop-banner">
        <h1>Payment</h1>
      </section>

      <section className="payment-page">
        <div className="payment-card">
          <h2>Secure Payment</h2>

          <label>Cardholder Name</label>
          <input placeholder="Enter name on card" />

          <label>Card Number</label>
          <input placeholder="1234 5678 9012 3456" />

          <div className="form-row">
            <div>
              <label>Expiry Date</label>
              <input placeholder="MM/YY" />
            </div>

            <div>
              <label>CVV</label>
              <input placeholder="123" />
            </div>
          </div>

          <div className="payment-total">
            <b>Total to Pay</b>
            <span>${total.toFixed(2)}</span>
          </div>

          <button onClick={() => setPage("home")}>
            PAY NOW
          </button>
        </div>
      </section>
    </>
  );
}

export default Payment;