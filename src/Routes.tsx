import AllTimersPage from "pages/AllTimersPage";
import ItemListPage from "pages/ItemListPage";
import ItemTimerPage from "pages/ItemTimerPage";
import MainCategoryPage from "pages/MainCategoryPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <MainCategoryPage /> },
  { path: "/category/:categoryId", element: <ItemListPage /> },
  { path: "/item/:itemId", element: <ItemTimerPage /> },
  { path: "/all-timers", element: <AllTimersPage /> },
]);

export default router;
