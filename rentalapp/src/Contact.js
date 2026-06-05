function Contact({ setPage }) {
  return (
    <>
      <section className="contact-hero">
        <h1>About Us</h1>
      </section>

      <section className="modern-contact">
        <div className="contact-left">
          <h1>About RentNest</h1>

          <p>
            RentNest is a rental service created to make everyday living easier.
            We provide affordable rental products such as appliances, furniture,
            fitness equipment and electronics for homes, students and families.
          </p>

          <p>
            Our goal is to give customers flexible rental options without the
            pressure of buying expensive products upfront.
          </p>

          <div className="contact-info-grid">
            <div>
              <h3>Our Mission</h3>
              <p>To provide simple, affordable and reliable rental solutions.</p>
            </div>

            <div>
              <h3>Our Vision</h3>
              <p>To become New Zealand’s trusted rental platform.</p>
            </div>

            <div>
              <h3>Why Choose Us?</h3>
              <p>Flexible plans, fast approval and helpful customer support.</p>
            </div>

            <div>
              <h3>Explore Products</h3>
              <button onClick={() => setPage("products")}>
                VIEW PRODUCTS
              </button>
            </div>
          </div>
        </div>

        <div className="contact-right">
          <h2>What We Offer</h2>

          <p>✅ Appliance rentals</p>
          <p>✅ Furniture rentals</p>
          <p>✅ Fitness equipment rentals</p>
          <p>✅ Electronics rentals</p>
          <p>✅ Flexible weekly pricing</p>
          <p>✅ Delivery support</p>

          <button
            className="submit-contact-btn"
            onClick={() => setPage("delivery")}
          >
            CHECK DELIVERY AREAS
          </button>
        </div>
      </section>

      <section className="contact-bottom-banner">
        <div>
          <h1>Rent what you need, when you need it</h1>

          <p>
            RentNest helps you create a comfortable lifestyle with flexible and
            affordable rental options.
          </p>

          <button onClick={() => setPage("products")}>START RENTING</button>
        </div>
      </section>
    </>
  );
}

export default Contact;