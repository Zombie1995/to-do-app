import { router } from "pages";
import { RouterProvider } from "react-router-dom";
import "reflect-metadata";
import "./index.css";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
