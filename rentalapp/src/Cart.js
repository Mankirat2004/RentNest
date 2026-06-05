function Cart({ cartItems, setCartItems, setPage }) {
  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.priceNumber * item.quantity,
    0
  );

  return (
    <>
      <section className="shop-banner">
        <h1>Your Cart</h1>
      </section>

      <section className="cart-page">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>

            <p>Add products to continue shopping.</p>

            <button onClick={() => setPage("products")}>
              SHOP NOW
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-card" key={item.id}>
                  <img src={item.img} alt={item.name} />

                  <div className="cart-info">
                    <h2>{item.name}</h2>

                    <p>{item.info}</p>

                    <h3>${item.priceNumber.toFixed(2)} per week</h3>

                    <div className="qty-box">
                      <button onClick={() => decreaseQty(item.id)}>
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button onClick={() => increaseQty(item.id)}>
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-right">
                    <h2>
                      $
                      {(
                        item.priceNumber * item.quantity
                      ).toFixed(2)}
                    </h2>

                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h1>Order Summary</h1>

              <div className="summary-row">
                <span>Products</span>
                <span>{cartItems.length}</span>
              </div>

              <div className="summary-row">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                className="checkout-btn"
                onClick={() => setPage("checkout")}
              >
                PROCEED TO CHECKOUT
              </button>

              <button
                className="continue-btn"
                onClick={() => setPage("products")}
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Cart;