import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
// import { action as userAction } from "./components/Header";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        children: [
          {
            path: "/dota",
          },
        ],
      },
      {
        path: "/profile",
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
