// src/Main-Page-Components/Contact.jsx
import '../css/Contact.css'

const Contact = () => {
  return (
    <main className="contact-page">
       
      <section className="contact-header container">
        <p className="contact-breadcrumb">Home / Contact Us</p>
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">
          Have a question about tool exchanges, your account, or partnerships?
          Reach out and we’ll be happy to help.
        </p>
      </section>

       
      <section className="contact-info container">
        <div className="contact-info-strip">
      
          <div className="contact-info-item">
            <div className="contact-icon contact-icon-location">
              <i className="fa-solid fa-location-dot" />
            </div>
            <div>
              <h4 className="contact-info-title">Physical Address</h4>
              <p className="contact-info-text">
                Faculty of Computer and Information Sciences, Menoufia University,
                <br />
                Shebin El-Kom, Menoufia, Egypt
              </p>
            </div>
          </div>

           
          <div className="contact-info-item">
            <div className="contact-icon contact-icon-phone">
              <i className="fa-solid fa-phone" />
            </div>
            <div>
              <h4 className="contact-info-title">Phone Numbers</h4>
              <p className="contact-info-text mb-1">+20 112 428 0818</p>
              <p className="contact-info-text">+20 100 000 0000</p>
            </div>
          </div>

       
          <div className="contact-info-item">
            <div className="contact-icon contact-icon-mail">
              <i className="fa-solid fa-envelope" />
            </div>
            <div>
              <h4 className="contact-info-title">Email Address</h4>
              <p className="contact-info-text mb-1">
                <a href="mailto:support@unihub.com">support@unihub.com</a>
              </p>
              <p className="contact-info-text">
                <a href="mailto:contact@unihub.com">contact@unihub.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>

       
      <section className="contact-main container">
        <div className="contact-main-inner">
           
          <div className="contact-map-wrapper">
            <iframe
              title="UniHub location"
              className="contact-map"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.402676307465!2d30.556682475548756!3d30.051996818829233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458891e7dd20abb%3A0x4ef01430ac5d6f0d!2sFaculty%20of%20Home%20Economics%2C%20Menoufia%20University!5e0!3m2!1sen!2seg!4v1700850000000"
            ></iframe>
          </div>

           
          <div className="contact-form-wrapper">
            <h2 className="contact-form-title">Send us a message</h2>
            <p className="contact-form-text">
              Feel free to reach out with any questions about exchanges, safety,
              or your UniHub account. We usually respond within 24 hours.
            </p>

            <form className="contact-form">
              <div className="contact-form-row">
                <div className="contact-form-field">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="contact-form-field">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>

              <div className="contact-form-row">
                <div className="contact-form-field">
                  <label htmlFor="email">Your Email *</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="name@university.edu"
                    required
                  />
                </div>
                <div className="contact-form-field">
                  <label htmlFor="phone">Your Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+20 1X XXX XXXX"
                  />
                </div>
              </div>

              <div className="contact-form-field">
                <label htmlFor="subject">Subject *</label>
                <input
                  id="subject"
                  type="text"
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div className="contact-form-field">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="contact-submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contact
