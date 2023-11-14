import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import NavigationPage from "./pages/NavigationPage";
import BetListPage, { loader as betLoader } from "./pages/BetlistPage";
import ProfilePage from "./pages/ProfilePage";
import ActivePage from "./pages/ActivePage";
import SummaryPage from "./pages/SummaryPage";

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
        element: <ProfilePage />,
        children: [
          { path: "summary", element: <SummaryPage /> },
          { path: "active-bets", element: <ActivePage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
