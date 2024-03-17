// dependencies
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import donorImg from "../../assets/frontend-assets/img/donor-register.png";
import { RegisterUser } from "../../features/auth/authApiSlice";
import { authSelect, setErrorMsgEmpty } from "../../features/auth/authSlice";
import useForm from "../../hooks/useForm";
import { CreateToast } from "../../utils/Toaster";
import Loader from "../../components/Loader";

const DonorRegister = () => {
  // redux dispatch
  const dispatch = useDispatch();

  // auth redux state
  const { isLoading, message, error } = useSelector(authSelect);

  // donor registration form state
  const { input, handleInputChange, resetForm } = useForm({
    name: "",
    auth: "",
    password: "",
    role: "donor",
  });

  // handle donor registration form submission
  const handleDonorRegisterSubmit = (e) => {
    e.preventDefault();
    dispatch(RegisterUser(input));
  };

  // show toast message & error message on form submit
  useEffect(() => {
    if (message) {
      CreateToast(message, "success");
      // set error & msg redux state null for showing same error or message on API response
      dispatch(setErrorMsgEmpty());

      // reset form if registration become successful
      resetForm();
    }

    if (error) {
      CreateToast(error);
      // set error & msg redux state null for showing same error or message on API response
      dispatch(setErrorMsgEmpty());

      console.log("from donor registration error");
    }
  }, [message, error, dispatch, resetForm]);

  return (
    <div className="content top-space">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            {/* Register Content */}
            <div className="account-content">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-7 col-lg-6 login-left">
                  <img
                    src={donorImg}
                    className="img-fluid"
                    alt="Doccure Register"
                  />
                </div>
                <div className="col-md-12 col-lg-6 login-right">
                  <div className="login-header">
                    <h3>
                      Donor Registration
                      <Link to="/register">Are you a Blood Finder?</Link>
                    </h3>
                  </div>
                  {/* Register Form */}
                  <form onSubmit={handleDonorRegisterSubmit}>
                    <div className="mb-3 form-focus">
                      <input
                        type="text"
                        className="form-control floating"
                        name="name"
                        onChange={handleInputChange}
                        value={input.name}
                      />
                      <label className="focus-label">Name</label>
                    </div>
                    <div className="mb-3 form-focus">
                      <input
                        type="text"
                        className="form-control floating"
                        name="auth"
                        onChange={handleInputChange}
                        value={input.auth}
                      />
                      <label className="focus-label">
                        Mobile or Email Address
                      </label>
                    </div>
                    <div className="mb-3 form-focus">
                      <input
                        type="password"
                        className="form-control floating"
                        name="password"
                        onChange={handleInputChange}
                        value={input.password}
                      />
                      <label className="focus-label">Create Password</label>
                    </div>
                    <div className="text-end">
                      <Link className="forgot-link" to="/login">
                        Already have an account?
                      </Link>
                    </div>
                    <button
                      className="btn btn-primary w-100 btn-lg login-btn"
                      type="submit" disabled={isLoading? true: false}
                    >
                      Signup
                    </button>
                    {/* Show loader animation if loader is true */}
                    {isLoading? <Loader /> : ''}
                    <div className="login-or">
                      <span className="or-line" />
                      <span className="span-or">or</span>
                    </div>
                    <div className="row social-login">
                      <div className="col-6">
                        <a href="#" className="btn btn-facebook w-100">
                          <i className="fab fa-facebook-f me-1" /> Login
                        </a>
                      </div>
                      <div className="col-6">
                        <a href="#" className="btn btn-google w-100">
                          <i className="fab fa-google me-1" /> Login
                        </a>
                      </div>
                    </div>
                  </form>
                  {/* /Register Form */}
                </div>
              </div>
            </div>
            {/* /Register Content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorRegister;
