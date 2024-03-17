// dependencies
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/frontend-assets/img/logo.png";
import { LogoutUser } from "../features/auth/authApiSlice";
import { authSelect, setErrorMsgEmpty } from "../features/auth/authSlice";
import { CreateToast } from "../utils/Toaster";

const Header = () => {
  // redux dispatch
  const dispatch = useDispatch();
  // auth state
  const { user, message, error } = useSelector(authSelect);

  // handle logout
  const handleUserLogout = () => {
    const confirmation = confirm("Do you want to logout?");
    if (confirmation) {
      dispatch(LogoutUser());
    }
  };

  // show success or error message from API request
  useEffect(() => {
    // show success message
    if (message) {
      CreateToast(message, "success");
      // set error & msg redux state null for showing same error or message on API response
      dispatch(setErrorMsgEmpty());

      // redirect to "/my-account" page after successful login
      // navigate("/my-account");
    }

    // show error message
    if (error) {
      CreateToast(error);
      // set error & msg redux state null for showing same error or message on API response
      dispatch(setErrorMsgEmpty());
    }
  }, [message, error, dispatch]);

  return (
    <header className="header header-custom header-fixed header-one">
      <div className="container">
        <nav className="navbar navbar-expand-lg header-nav">
          <div className="navbar-header">
            <Link id="mobile_btn" to="#;">
              <span className="bar-icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </Link>
            <Link to="/" className="navbar-brand logo">
              <img src={logo} className="img-fluid" alt="Logo" />
            </Link>
          </div>
          <div className="main-menu-wrapper">
            <div className="menu-header">
              <Link to="/" className="menu-logo">
                <img src={logo} className="img-fluid" alt="Logo" />
              </Link>
              <Link id="menu_close" className="menu-close" to="#;">
                <i className="fas fa-times"></i>
              </Link>
            </div>
            <ul className="main-nav">
              <li className="has-submenu megamenu active">
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/donors">Donors</Link>
              </li>

              <li className="has-submenu">
                <Link to="#;">
                  Patients <i className="fas fa-chevron-down"></i>
                </Link>
                <ul className="submenu">
                  <li className="has-submenu">
                    <Link to="#;">Doctors</Link>
                    <ul className="submenu inner-submenu">
                      <li>
                        <Link to="map-grid.html">Map Grid</Link>
                      </li>
                      <li>
                        <Link to="map-list.html">Map List</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="has-submenu">
                    <Link to="#;">Search Doctor</Link>
                    <ul className="submenu inner-submenu">
                      <li>
                        <Link to="search.html">Search Doctor 1</Link>
                      </li>
                      <li>
                        <Link to="search-2.html">Search Doctor 2</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="doctor-profile.html">Doctor Profile</Link>
                  </li>
                  <li className="has-submenu">
                    <Link to="#;">Booking</Link>
                    <ul className="submenu inner-submenu">
                      <li>
                        <Link to="booking.html">Booking 1</Link>
                      </li>
                      <li>
                        <Link to="booking-2.html">Booking 2</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="checkout.html">Checkout</Link>
                  </li>
                  <li>
                    <Link to="booking-success.html">Booking Success</Link>
                  </li>
                  <li>
                    <Link to="patient-dashboard.html">Patient Dashboard</Link>
                  </li>
                  <li>
                    <Link to="favourites.html">Favourites</Link>
                  </li>
                  <li>
                    <Link to="chat.html">Chat</Link>
                  </li>
                  <li>
                    <Link to="profile-settings.html">Profile Settings</Link>
                  </li>
                  <li>
                    <Link to="change-password.html">Change Password</Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link to="about-us.html">About Us</Link>
              </li>
              <li>
                <Link to="contact-us.html">Contact Us</Link>
              </li>

              <li className="has-submenu">
                <Link to="#">Blog</Link>
              </li>

              <li>
                <Link to="/admin">Admin</Link>
              </li>

              <li className="searchbar">
                <Link to="#;">
                  <i className="feather-search"></i>
                </Link>
                <div className="togglesearch">
                  <form action="search.html">
                    <div className="input-group">
                      <input type="text" className="form-control" />
                      <button type="submit" className="btn">
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </li>
              {/* <li className="login-link">
                <Link to="/login">Login / Signup</Link>
              </li> */}
              {user ? (
                <>
                  <li className="register-btn">
                    <Link to="/my-account" className="btn btn-primary log-btn">
                      <i className="feather-user"></i>My Account
                    </Link>
                  </li>
                  <li className="register-btn">
                    <button onClick={handleUserLogout} className="btn reg-btn">
                      <i className="feather-lock"></i>Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="register-btn">
                    <Link to="/register" className="btn reg-btn">
                      <i className="feather-user"></i>Register
                    </Link>
                  </li>
                  <li className="register-btn">
                    <Link to="/login" className="btn btn-primary log-btn">
                      <i className="feather-lock"></i>Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
