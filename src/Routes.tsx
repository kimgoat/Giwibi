import App from "App";
import Root from "Root";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [{ path: "", element: <App /> }],
  },
]);

export default router;
