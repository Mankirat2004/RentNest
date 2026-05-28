import { useState } from "react";
import "./App.css";

import Cart from "./Cart";
import Products from "./Products";
import Checkout from "./Checkout";
import Payment from "./Payment";
import Contact from "./Contact";

function App() {
  const [page, setPage] = useState("home");
  const [cartItems, setCartItems] = useState([]);

  return (
    <div>
      <Header setPage={setPage} cartItems={cartItems} />

      {page === "home" && <Home setPage={setPage} />}

      {page === "products" && (
        <Products
          cartItems={cartItems}
          setCartItems={setCartItems}
          setPage={setPage}
        />
      )}

      {page === "delivery" && <DeliveryAreas />}

      {page === "contact" && <Contact setPage={setPage} />}

      {page === "cart" && (
        <Cart
          cartItems={cartItems}
          setCartItems={setCartItems}
          setPage={setPage}
        />
      )}

      {page === "checkout" && (
        <Checkout cartItems={cartItems} setPage={setPage} />
      )}

      {page === "payment" && (
        <Payment cartItems={cartItems} setPage={setPage} />
      )}

      <Footer />
    </div>
  );
}

function Header({ setPage, cartItems }) {
  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <header className="header">
      <div className="logo" onClick={() => setPage("home")}>
        RentNest
      </div>

      <nav>
        <a onClick={() => setPage("home")}>HOME</a>
        <a onClick={() => setPage("products")}>OUR PRODUCTS</a>
        <a onClick={() => setPage("delivery")}>DELIVERY AREAS</a>
        <a onClick={() => setPage("contact")}>CONTACT US</a>
        <a onClick={() => setPage("cart")}>CART ({cartCount})</a>
      </nav>

      <div className="phone">📞 0800 111 313</div>
    </header>
  );
}

function Home({ setPage }) {
  return (
    <>
      <section className="features">
        <div>↩️ Flexible Rental</div>
        <div>💲 Affordable Solutions</div>
        <div>✅ Fast Approval</div>
        <div>🔧 Replace or Repair</div>
      </section>

      <section className="hero">
        <div>
          <h1>New Zealand's Trusted Rental Solution</h1>

          <button onClick={() => setPage("products")}>OUR PRODUCTS</button>

          <button
            onClick={() => setPage("cart")}
            style={{
              marginLeft: "15px",
              background: "#52796f",
            }}
          >
            VIEW CART
          </button>
        </div>

        <div className="hero-text">
          <p>
            Whether it's appliance rentals, furniture rentals, or any product
            you are wanting to rent — RentNest has you covered. With same day
            approval on most applications, and next day delivery to most
            locations, we make it super quick and easy.
          </p>

          <p>
            The RentNest range of products has the solution to suit your budget
            and lifestyle, from large families to one person households and
            everything in between!!
          </p>
        </div>
      </section>

      <section className="home-categories">
        <h1>Find the right products for your needs</h1>

        <p>
          We offer you a full service of rental packages to ensure you have
          everything you need
        </p>

        <div className="home-category-grid">
          <div className="home-category-card" onClick={() => setPage("products")}>
            <img
              src="https://images.unsplash.com/photo-1586208958839-06c17cacdf08?auto=format&fit=crop&w=500&q=80"
              alt="Kitchen"
            />
            <h2>Kitchen</h2>
          </div>

          <div className="home-category-card" onClick={() => setPage("products")}>
            <img
              src="https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=500&q=80"
              alt="Laundry"
            />
            <h2>Laundry</h2>
          </div>

          <div className="home-category-card" onClick={() => setPage("products")}>
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&q=80"
              alt="Furniture"
            />
            <h2>Furniture</h2>
          </div>

          <div className="home-category-card" onClick={() => setPage("products")}>
            <img
              src="https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=500&q=80"
              alt="Entertainment"
            />
            <h2>Entertainment</h2>
          </div>

          <div className="home-category-card" onClick={() => setPage("products")}>
            <img
              src="https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=500&q=80"
              alt="Fitness"
            />
            <h2>Fitness</h2>
          </div>
        </div>
      </section>

      <section className="rental-solutions">
        <h1>Explore our simple rental solutions</h1>

        <p>
          Discover how our rental solutions can meet your short and long term
          needs
        </p>

        <div className="solution-grid">
          <div className="solution-card">
            <img
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80"
              alt="Relocation"
            />

            <div className="solution-overlay">
              <h2>Relocation</h2>
              <p>Solve all your relocation needs in one place</p>
            </div>
          </div>

          <div className="solution-card">
            <img
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
              alt="Home Staging"
            />

            <div className="solution-overlay">
              <h2>Home Staging</h2>
              <p>Transform your property with RentNest</p>
            </div>
          </div>

          <div className="solution-card">
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80"
              alt="Business Solutions"
            />

            <div className="solution-overlay">
              <h2>Business Solutions</h2>
              <p>Furniture and office rental solutions</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function DeliveryAreas() {
  return (
    <>
      <section className="delivery-hero">
        <h1>Delivery Areas</h1>
      </section>

      <section className="delivery-page">
        <div className="callback-form">
          <h2>Request a callback</h2>

          <div className="form-row">
            <input placeholder="First Name" />
            <input placeholder="Last Name" />
          </div>

          <div className="form-row">
            <input placeholder="Email" />
            <input placeholder="Phone" />
          </div>

          <input placeholder="Post Code or Suburb" />

          <textarea placeholder="Message"></textarea>

          <button>SUBMIT NOW</button>
        </div>

        <div className="map-section">
          <div className="map-title-row">
            <h2>📍 Find Your Delivery Region</h2>

            <input placeholder="Post Code or Suburb" />
          </div>

          <iframe
            title="map"
            src="https://www.google.com/maps?q=New%20Zealand&output=embed"
            width="100%"
            height="560"
            style={{ border: 0 }}
          ></iframe>
        </div>
      </section>
    </>
  );
}

function Footer() {
  return (
    <footer>
      <div>
        <h2>Want to know more about our rentals?</h2>

        <h2>Join our mailing list!</h2>

        <input placeholder="First Name" />

        <input placeholder="Email Address" />

        <button>SUBSCRIBE</button>
      </div>

      <div>
        <h3>Pages</h3>

        <p>Home</p>

        <p>Our Products</p>

        <p>Delivery Areas</p>

        <p>Contact Us</p>
      </div>

      <div>
        <h3>Get In Touch</h3>

        <p>📞 0800 111 313</p>
      </div>
    </footer>
  );
}

export default App;