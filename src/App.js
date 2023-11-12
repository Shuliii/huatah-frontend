import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import NavigationPage from "./pages/NavigationPage";
import BetListPage, { loader as betLoader } from "./pages/BetlistPage";
// import { action as userAction } from "./components/Header";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <NavigationPage />,
        children: [
          {
            path: "/:name",
            element: <BetListPage />,
            loader: betLoader,
          },
        ],
      },
      {
        path: "/profile/:name",
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
