// dependencies
import { Link } from "react-router-dom";
import logo from "../assets/frontend-assets/img/logo.png";

const Footer = () => {
  return (
    <footer className="footer footer-one">
  <div className="footer-top">
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-4">
          <div className="footer-widget footer-about">
            <div className="footer-logo">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="footer-about-content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore.
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-3 col-md-4">
              <div className="footer-widget footer-menu">
                <h2 className="footer-title">For Patients</h2>
                <ul>
                  <li>
                    <Link to="search.html">Search Doctors</Link>
                  </li>
                  <li>
                    <Link to="login.html">Login</Link>
                  </li>
                  <li>
                    <Link to="register.html">Register</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="footer-widget footer-menu">
                <h2 className="footer-title">For Doctors</h2>
                <ul>
                  <li>
                    <Link to="appointments.html">Appointments</Link>
                  </li>
                  <li>
                    <Link to="chat.html">Chat</Link>
                  </li>
                  <li>
                    <Link to="login.html">Login</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-4">
              <div className="footer-widget footer-contact">
                <h2 className="footer-title">Contact Us</h2>
                <div className="footer-contact-info">
                  <div className="footer-address">
                    <p>
                      <i className="feather-map-pin" /> 3556 Beech Street, USA
                    </p>
                  </div>
                  <div className="footer-address">
                    <p>
                      <i className="feather-phone-call" /> +1 315 369 5943
                    </p>
                  </div>
                  <div className="footer-address mb-0">
                    <p>
                      <i className="feather-mail" /> doccure@example.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-7">
          <div className="footer-widget">
            <h2 className="footer-title">Join Our Newsletter</h2>
            <div className="subscribe-form">
              <form action="#">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                />
                <button type="submit" className="btn">
                  Submit
                </button>
              </form>
            </div>
            <div className="social-icon">
              <ul>
                <li>
                  <Link to="#(0);">
                    <i className="fab fa-facebook" />
                  </Link>
                </li>
                <li>
                  <Link to="#(0);">
                    <i className="fab fa-instagram" />
                  </Link>
                </li>
                <li>
                  <Link to="#(0);">
                    <i className="fab fa-twitter" />
                  </Link>
                </li>
                <li>
                  <Link to="#(0);">
                    <i className="fab fa-linkedin-in" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="footer-bottom">
    <div className="container">
      {/* Copyright */}
      <div className="copyright">
        <div className="row">
          <div className="col-md-6 col-lg-6">
            <div className="copyright-text">
              <p className="mb-0">
                {" "}
                Copyright © 2024{" "}
                <Link
                  to="https://themeforest.net/user/dreamstechnologies/portfolio"
                  target="_blank"
                >
                  Dreamstechnologies.
                </Link>{" "}
                All Rights Reserved
              </p>
            </div>
          </div>
          <div className="col-md-6 col-lg-6">
            {/* Copyright Menu */}
            <div className="copyright-menu">
              <ul className="policy-menu">
                <li>
                  <Link to="privacy-policy.html">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="terms-condition.html">Terms and Conditions</Link>
                </li>
              </ul>
            </div>
            {/* /Copyright Menu */}
          </div>
        </div>
      </div>
      {/* /Copyright */}
    </div>
  </div>
</footer>

  )
};

export default Footer;
