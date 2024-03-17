import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Breadcrumb from "../components/Breadcrumb";

// create layout
const Layout = () => {
  return (
    <div className="main-wrapper">
      <Header />
      <Breadcrumb />
      <Outlet />
      <Footer />
    </div>
  );
};

// export layout
export default Layout;
