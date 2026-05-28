function Contact({ setPage }) {
  return (
    <>
      <section className="contact-hero">
        <h1>Contact Us</h1>
      </section>

      <section className="modern-contact">
        <div className="contact-left">
          <h1>We're here to help</h1>

          <p>
            Contact us today to get a competitive quote.
            Simply fill in the enquiry form.
          </p>

          <p>
            Forms aren’t your thing? That’s okay,
            just call us with your questions and one of our
            team will be happy to help you out.
          </p>

          <div className="contact-info-grid">
            <div>
              <h3>Get In Touch</h3>
              <h2>0800 111 313</h2>
            </div>

            <div>
              <h3>Find Us</h3>
              <p>
                RentNest, 2/11-17 Church Street
                <br />
                Queenstown, 9300
              </p>
            </div>

            <div>
              <h3>Opening Hours</h3>
              <p>
                Monday - Friday 8:00am-5:00pm
                <br />
                Closed Public Holidays
              </p>
            </div>

            <div>
              <h3>Looking for your closest store?</h3>

              <button onClick={() => setPage("delivery")}>
                SEE DELIVERY AREAS
              </button>
            </div>
          </div>
        </div>

        <div className="contact-right">
          <div className="form-row">
            <input placeholder="First Name" />
            <input placeholder="Last Name" />
          </div>

          <div className="form-row">
            <input placeholder="Email" />
            <input placeholder="Phone" />
          </div>

          <p className="small-title">
            When would you like us to call?
          </p>

          <div className="checkbox-row">
            <label><input type="checkbox" /> Morning</label>
            <label><input type="checkbox" /> Afternoon</label>
            <label><input type="checkbox" /> Night</label>
          </div>

          <input placeholder="Post Code or Suburb" />

          <p className="small-title">
            What is the nature of your enquiry today?
          </p>

          <input placeholder="Please select most relevant topic for your enquiry" />

          <p className="small-title">
            How did you hear about us?
          </p>

          <input placeholder="Please select one" />

          <textarea placeholder="Message"></textarea>

          <div className="checkbox-column">
            <label>
              <input type="checkbox" />
              Yes, please send me special offers about new products and services.
            </label>

            <label>
              <input type="checkbox" />
              Have you read our privacy statement?
            </label>
          </div>

          <button className="submit-contact-btn">
            SUBMIT NOW
          </button>
        </div>
      </section>

      <section className="contact-bottom-banner">
        <div>
          <h1>Rent the products you'd love to have</h1>

          <p>
            It's never been easier to create your space
            with flexible payment and term options
          </p>

          <button>CONTACT US</button>
        </div>
      </section>
    </>
  );
}

export default Contact;