// dependencies
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/frontend-assets/img/login.png";
import { LoginUser } from "../../features/auth/authApiSlice";
import { authSelect, setErrorMsgEmpty } from "../../features/auth/authSlice";
import useForm from "../../hooks/useForm";
import { CreateToast } from "../../utils/Toaster";
import { toast } from "react-toastify";


const Login = () => {
  // redux dispatch
  const dispatch = useDispatch();
  // redux auth state
  const { message, error } = useSelector(authSelect);

  // navigate
  const navigate = useNavigate();

  // login input state
  const { input, handleInputChange } = useForm({
    auth: "",
    password: "",
  });

  // handle login form submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    dispatch(LoginUser(input));
  };

  // show success or error message from API request
  useEffect(() => {
    // show success message
    if (message) {
      CreateToast(message, "success");
      // set error & msg redux state null for showing same error or message on API response
      dispatch(setErrorMsgEmpty());

      // redirect to "/my-account" page after successful login
      navigate("/my-account");
    }
    
    console.log("from login error");

    // show error message
    if (error) {
      // CreateToast(error);
      toast.error(error);
      

      // set error & msg redux state null for showing same error or message on API response
      dispatch(setErrorMsgEmpty());

    }
  }, [dispatch, error, message, navigate]);

  return (
    <div className="content top-space">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            {/* Login Tab Content */}
            <div className="account-content">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-7 col-lg-6 login-left">
                  <img
                    src={loginImg}
                    className="img-fluid"
                    alt="Doccure Login"
                  />
                </div>
                <div className="col-md-12 col-lg-6 login-right">
                  <div className="login-header">
                    <h3>Login</h3>
                  </div>
                  <form onSubmit={handleLoginSubmit}>
                    <div className="mb-3 form-focus">
                      <input
                        type="text"
                        className="form-control floating"
                        name="auth"
                        onChange={handleInputChange}
                        value={input.auth}
                      />
                      <label className="focus-label">Mobile or Email</label>
                    </div>
                    <div className="mb-3 form-focus">
                      <input
                        type="password"
                        className="form-control floating"
                        name="password"
                        onChange={handleInputChange}
                        value={input.password}
                      />
                      <label className="focus-label">Password</label>
                    </div>
                    <div className="text-end">
                      <Link className="forgot-link" to="/forgot-password">
                        Forgot Password ?
                      </Link>
                    </div>
                    <button
                      className="btn btn-primary w-100 btn-lg login-btn"
                      type="submit"
                    >
                      Login
                    </button>
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
                    <div className="text-center dont-have">
                      Don’t have an account?{" "}
                      <Link to="/register">Register</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* /Login Tab Content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
