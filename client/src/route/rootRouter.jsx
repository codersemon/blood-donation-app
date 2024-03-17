// dependencies
import { createBrowserRouter } from "react-router-dom";
import publicRouter from "./publicRouter";
import privateRouter from "./privateRouter";

// creating rootRout
const rootRouter = createBrowserRouter([...publicRouter, ...privateRouter]);

// export route 
export default rootRouter;