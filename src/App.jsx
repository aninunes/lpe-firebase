import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./componentes/Home";
import MenuPrivado from "./componentes/MenuPrivado";
import MenuPublico from "./componentes/MenuPublico";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Genero from "./componentes/telas/genero/Genero";
import Filme from "./componentes/telas/filme/Filme";
import Login from "./componentes/telas/login/Login";
import './app.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MenuPublico />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      }
    ]
  },
  {
    path: "/privado",
    element: <MenuPrivado />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "generos",
        element: <Genero />
      },
      {
        path: "filmes",
        element: <Filme />
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
