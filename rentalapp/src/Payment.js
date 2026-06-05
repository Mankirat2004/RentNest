import { useState } from "react";

function Payment({ cartItems, setPage }) {
  const [paymentData, setPaymentData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + item.priceNumber * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardName") {
      const onlyLetters = value.replace(/[^A-Za-z\s]/g, "");
      setPaymentData({ ...paymentData, cardName: onlyLetters });
    }

    if (name === "cardNumber") {
      const onlyNumbers = value.replace(/\D/g, "").slice(0, 16);
      const formattedNumber = onlyNumbers.replace(/(.{4})/g, "$1 ").trim();
      setPaymentData({ ...paymentData, cardNumber: formattedNumber });
    }

    if (name === "expiry") {
      const onlyNumbers = value.replace(/\D/g, "").slice(0, 4);
      const formattedExpiry =
        onlyNumbers.length > 2
          ? onlyNumbers.slice(0, 2) + "/" + onlyNumbers.slice(2)
          : onlyNumbers;

      setPaymentData({ ...paymentData, expiry: formattedExpiry });
    }

    if (name === "cvv") {
      const onlyNumbers = value.replace(/\D/g, "").slice(0, 3);
      setPaymentData({ ...paymentData, cvv: onlyNumbers });
    }
  };

  const validatePayment = () => {
    const newErrors = {};

    if (!paymentData.cardName.trim()) {
      newErrors.cardName = "Cardholder name is required";
    } else if (!/^[A-Za-z\s]+$/.test(paymentData.cardName)) {
      newErrors.cardName = "Cardholder name cannot contain numbers";
    }

    if (!/^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/.test(paymentData.cardNumber)) {
      newErrors.cardNumber = "Enter a valid 16 digit card number";
    }

    if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(paymentData.expiry)) {
      newErrors.expiry = "Use valid MM/YY format";
    }

    if (!/^[0-9]{3}$/.test(paymentData.cvv)) {
      newErrors.cvv = "CVV must be exactly 3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const payNow = () => {
    if (validatePayment()) {
      setPaymentSuccess(true);
    }
  };

  if (paymentSuccess) {
    return (
      <>
        <section className="shop-banner">
          <h1>Payment Confirmed</h1>
        </section>

        <section className="payment-page">
          <div className="payment-card success-card">
            <div className="success-icon">✅</div>

            <h2>Payment Successful!</h2>

            <p>
              Thank you for choosing RentNest. Your rental order has been
              confirmed successfully.
            </p>

            <div className="payment-total">
              <b>Amount Paid</b>
              <span>${total.toFixed(2)}</span>
            </div>

            <p className="success-note">
              Our team will contact you shortly with delivery details and order
              updates.
            </p>

            <button className="pay-now-btn" onClick={() => setPage("home")}>
              BACK TO HOME
            </button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="shop-banner">
        <h1>Payment</h1>
      </section>

      <section className="payment-page">
        <div className="payment-card">
          <div className="payment-header">
            <h2>🔒 Secure Payment</h2>
            <p>Enter your card details to complete your rental order.</p>
          </div>

          <label>Cardholder Name *</label>
          <input
            name="cardName"
            value={paymentData.cardName}
            onChange={handleChange}
            placeholder="Enter name on card"
          />
          {errors.cardName && <p className="error">{errors.cardName}</p>}

          <label>Card Number *</label>
          <input
            name="cardNumber"
            value={paymentData.cardNumber}
            onChange={handleChange}
            placeholder="0000 0000 0000 0000"
            maxLength="19"
          />
          {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}

          <div className="payment-row">
            <div>
              <label>Expiry Date *</label>
              <input
                name="expiry"
                value={paymentData.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                maxLength="5"
              />
              {errors.expiry && <p className="error">{errors.expiry}</p>}
            </div>

            <div>
              <label>CVV *</label>
              <input
                name="cvv"
                value={paymentData.cvv}
                onChange={handleChange}
                placeholder="123"
                maxLength="3"
              />
              {errors.cvv && <p className="error">{errors.cvv}</p>}
            </div>
          </div>

          <div className="payment-total">
            <b>Total to Pay</b>
            <span>${total.toFixed(2)}</span>
          </div>

          <button className="pay-now-btn" onClick={payNow}>
            PAY NOW
          </button>
        </div>
      </section>
    </>
  );
}

export default Payment;