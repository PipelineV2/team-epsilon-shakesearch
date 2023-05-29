import { createBrowserRouter } from "react-router-dom";
import SearchPage from "./pages/search";
import PlaysPage from "./pages/plays";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchPage />,
  },
  {
    path: "/plays",
    element: <PlaysPage />,
  },
]);

export default router;
