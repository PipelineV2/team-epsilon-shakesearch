import { createBrowserRouter } from "react-router-dom";
import SearchPage from "./pages/search";
import PlaysPage from "./pages/plays";
import Favorites from "./pages/favorite";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchPage />,
  },
  {
    path: "/plays",
    element: <PlaysPage />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
]);

export default router;
