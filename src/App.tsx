import IngredientProvider from "./components/IngredientProvider";
import Meal from "./components/Meal";
import Layout from "./layout";

function App() {
  return (
    <IngredientProvider>
      <Layout>
        <Meal />
      </Layout>
    </IngredientProvider>
  );
}

export default App;
