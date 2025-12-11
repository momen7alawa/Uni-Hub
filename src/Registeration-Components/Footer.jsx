const Footer = () => {
  return (
    <footer className="unihub-footer mt-5">
      <div className="container py-5">
        <div className="row text-center text-md-start text-white g-4">
          <div className="col-12 col-md-4">
            <img className="footer-logo mb-3" src="/assets/logo.svg" alt="UNIHub logo" />
            <h5 className="text-white mb-2">“Tools in, Stress out”</h5>
            <p className="text-light mb-0">
              UNIHub helps university students swap study tools easily and safely on campus.
            </p>
          </div>

          <div className="col-12 col-md-4">
            <h5 className="mb-3">Services</h5>
            <ul className="list-unstyled footer-list">
              <li>University Account Login</li>
              <li>List Your Tools</li>
              <li>Exchange Tools</li>
              <li>Student &amp; Tool Ratings</li>
              <li>Notifications for Offers</li>
            </ul>
          </div>

          <div className="col-12 col-md-4">
            <h5 className="mb-3">Contact</h5>
            <p className="mb-1">
              Email:{' '}
              <a href="mailto:support@unihub.com" className="text-white text-decoration-none">
                support@unihub.com
              </a>
            </p>
            <p className="mb-3">Phone: +201124280818</p>
          </div>
        </div>

        <hr className="footer-separator my-4" />

        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          <p className="mb-0 small text-light">
            © 2025 UNIHub. All rights reserved.
          </p>

          <div className="d-flex align-items-center gap-3 fs-5">
            <a className="text-light" href="https://facebook.com" aria-label="Facebook">
              <i className="bi bi-facebook"></i>
            </a>
            <a className="text-light" href="https://x.com" aria-label="X">
              <i className="bi bi-twitter-x"></i>
            </a>
            <a className="text-light" href="https://instagram.com" aria-label="Instagram">
              <i className="bi bi-instagram"></i>
            </a>
            <a className="text-light" href="https://linkedin.com" aria-label="LinkedIn">
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
