import { RouterProvider } from "react-router";
import { router } from "./routes/main-routes-file";

function App() {

  return (
    <div className="all-page">
      <div className="overlay"></div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;