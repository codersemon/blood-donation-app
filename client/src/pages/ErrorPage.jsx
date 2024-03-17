// dependencies
import { Link } from "react-router-dom";
import errorImg from "../assets/frontend-assets/img/error-404.png";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";
import Header from "../components/Header";

const ErrorPage = () => {
  return (
    <>
      <Header />
      <Breadcrumb />

      <section className="error-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-12 text-center">
              <div className="error-info">
                <div className="error-404-img">
                  <img
                    src={errorImg}
                    className="img-fluid"
                    alt="error-404-image"
                  />
                  <div className="error-content error-404-content">
                    <h2>Oops! That Page Can’t Be Found.</h2>
                    <p>The page you are looking for was never existed.</p>
                    <Link to="/" className="btn btn-primary prime-btn">
                      Back to Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ErrorPage;
