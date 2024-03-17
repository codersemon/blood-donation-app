// dependencies
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import rootRouter from "./route/rootRouter";

function App() {
  return (
    <>
      <RouterProvider router={rootRouter} />
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
