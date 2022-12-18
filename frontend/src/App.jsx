import "./assets/css/App.css";
import { Routes, Route, createBrowserRouter } from "react-router-dom";

import { lazy, Suspense, useContext } from "react";
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
          components: lazy(() => import(`./pages/${files}.jsx`)),
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <components />
            </Suspense>
          ),
        },
      ];
    });

    routes = [
      ...routes,
      {
        path: `/${folder.toLocaleLowerCase().replace("home", "")}`,
        components: lazy(() => import(`./components/${folder}Layout.jsx`)),
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <components />
          </Suspense>
        ),
        // errorElement: <ErrorPage />,
        children: childrenroutes,
      },
    ];
  });
  const router = createBrowserRouter(routes);

  return (
    <Routes router={router}>
      {/* {Object.keys(pages).map((item) => (
        console.log(`<Route path=/${item.toLowerCase().replace('home', '').replace('protected', 'user')} element=eval(${item}Layout)>`),
        <Route key={`/${item.toLowerCase().replace('home', '')}`} path={`/${item.toLowerCase().replace('home', '')}`} element={eval(`${item}Layout`)}>
                {Object.keys(pages[item]).map((subitem, index) => (
                 console.log(`<Route path=${subitem.toLowerCase()} element=eval(${subitem}Page)/>`),

                 <Route
                   key={`${subitem.toLowerCase()}`}
                    path={`${subitem.toLowerCase()}`}
                    component= {<Loader path={subitem} />}
                    // errorElement={<ErrorPage />}
                    />
                 ))}
           {console.log("</Route>")}
           </Route>
         ))} */}

      {/* <Route path="/user" element={<ProtectedLayout />}>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminPage />} />
      </Route> */}

      {/* <Route path="*" element={<NoMatch />} /> */}
    </Routes>
  );
}

export default App;
