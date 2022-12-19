import "./assets/css/App.css";
import {
  Routes,
  Route,
  createBrowserRouter,
  useRoutes,
} from "react-router-dom";

import { lazy, Suspense, useContext } from "react";
import Loader from "@services/Loader";
import LoginPage from "./pages/Home/Login";
import DecisionsPage from "./pages/Protected/Decisions";
import RegisterPage from "./pages/Home/Register";
import HomePage from "./pages/Home/Home";
import ProfilePage from "./pages/Protected/Profile";
import SettingsPage from "./pages/Protected/Settings";
import ProtectedLayout from "./components/ProtectedLayout";
import AdminLayout from "./components/AdminLayout";
import DashboardPage from "./pages/Admin/Dashboard";
import HomeLayout from "./components/HomeLayout";

import { FolderContext } from "./contexts/Folder";

function App() {
  const { pages, components } = useContext(FolderContext);

  // // Array pour les routes
  let routes = [];
  Object.values(pages).forEach((element, index) => {
    let childrenroutes = [];
    const folder = Object.keys(pages)[index];
    Object.keys(element).forEach((files) => {
      childrenroutes = [
        ...childrenroutes,
        {
          path: `${files.toLocaleLowerCase()}`,
          // components: lazy(() => import(`./pages/${files}.jsx`)),
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Loader foldername={`pages/${folder}`} filename={files} />
            </Suspense>
          ),
        },
      ];
    });

    routes = [
      ...routes,
      {
        path: `/${folder
          .toLocaleLowerCase()
          .replace("home", "")
          .replace("protected", "user")}`,
        // components: lazy(() => import(`./components/${folder}Layout.jsx`)),
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Loader foldername="components/" filename={`${folder}Layout`} />
          </Suspense>
        ),
        // errorElement: <ErrorPage />,
        children: childrenroutes,
      },
    ];
  });
  const element = useRoutes(routes);

  return element;
}
export default App;
