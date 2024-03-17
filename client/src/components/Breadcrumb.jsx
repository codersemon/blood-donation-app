// dependencies
import { Link, useLocation } from "react-router-dom";
import { pathToBreadcrumbURL } from "../helpers/helpers";

const Breadcrumb = ({ title }) => {
  const { pathname } = useLocation();
  const pathArray = pathToBreadcrumbURL(pathname);

  // block breadcrumb loading on the following paths
  const breadcrumbBlockingPathArray = ["register", "login", "forgot-password", "donor-register"];
  // Check if any value from breadcrumbBlockingPathArray exists in pathArray
  const shouldBlockBreadcrumb = breadcrumbBlockingPathArray.some((path) =>
    pathArray.includes(path)
  );

  console.log();

  if (!shouldBlockBreadcrumb && pathname !== "/") {
    return (
      <div className="breadcrumb-bar-two">
        <div className="container">
          <div className="row align-items-center inner-banner">
            <div className="col-md-12 col-12 text-center">
              <h2
                className="breadcrumb-title"
                style={{ textTransform: "capitalize" }}
              >
                {title ? title : pathArray[pathArray.length - 1]}
              </h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  {pathArray?.length > 0
                    ? pathArray.map((path, index) => {
                        if (0 == index) {
                          return (
                            <li key={index} className="breadcrumb-item">
                              <Link to="/">Home</Link>
                            </li>
                          );
                        } else if (pathArray.length - 1 == index) {
                          return (
                            <li
                              key={index}
                              className="breadcrumb-item"
                              aria-current="page"
                            >
                              {title ? title : path}
                            </li>
                          );
                        } else {
                          return (
                            <li key={index} className="breadcrumb-item">
                              <Link to={`/${path}`}>{path}</Link>
                            </li>
                          );
                        }
                      })
                    : ""}
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }

  
};

export default Breadcrumb;
