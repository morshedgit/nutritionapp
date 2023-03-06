import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IngredientProvider from "./components/IngredientProvider";
import Meal from "./pages/Meal";
import Layout from "./layout";
import MyMeals from "./pages/MyMeals";

const router = createBrowserRouter([
  {
    path: "/nutritionapp/",
    element: (
      <IngredientProvider>
        <Layout />
      </IngredientProvider>
    ),
    children: [
      {
        index: true,
        element: <Meal />,
      },
      {
        path: "my-meals",
        element: <MyMeals />,
      },
      {
        path: "favorite",
        element: <p>favorite</p>,
      },
      {
        path: "recent",
        element: <p>recent</p>,
      },
      {
        path: "setting",
        element: <p>setting</p>,
      },
      {
        path: "help",
        element: <p>help</p>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
