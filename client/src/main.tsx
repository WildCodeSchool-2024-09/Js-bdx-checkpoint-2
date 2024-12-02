// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  type LoaderFunction,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

/* ************************************************************************* */

import App from "./App";

import CupcakeDetails from "./pages/CupcakeDetails";
import CupcakeList from "./pages/CupcakeList";
import Home from "./pages/Home";
import Instructions from "./pages/Instructions";

function cupcakesLoader() {
  return fetch("http://localhost:3310/api/cupcakes")
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.error(err));
}

const cupcakeLoader: LoaderFunction = ({ params }) => {
  const { id } = params;

  return fetch(`http://localhost:3310/api/cupcakes/${id}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.error(err));
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/instructions",
        element: <Instructions />,
      },
      {
        path: "/cupcakes",
        element: <CupcakeList />,
        loader: cupcakesLoader,
        // Step 1: load data here
      },
      {
        path: "/cupcakes/:id",
        element: <CupcakeDetails />,
        loader: cupcakeLoader,
      },
    ],
  },
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
