import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import "../src/assets/frontend-assets/css/bootstrap.min.css";                        // bootstrap import
import "../src/assets/frontend-assets/plugins/fontawesome/css/fontawesome.min.css"; // fontawesome import
import "../src/assets/frontend-assets/plugins/fontawesome/css/all.min.css";        // fontawesome import
import "../src/assets/frontend-assets/css/feather.css";                           // feathericon import
import "../src/assets/frontend-assets/css/bootstrap-datetimepicker.min.css";     // datepicker css import
import "../src/assets/frontend-assets/css/owl.carousel.min.css";               // owl carousel css import
import "../src/assets/frontend-assets/css/aos.css";                           // animation css import
import "../src/assets/frontend-assets/css/custom.css";                       // main css import

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);
