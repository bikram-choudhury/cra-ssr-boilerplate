import Home from "./Pages/Home";
import Todos from "./Pages/Todos";
import Posts from "./Pages/Posts";
import NotFound from "./Pages/NotFound";

import loadData from "./helpers/loadData";
import App from "./App";

const Routes = [
  {
    component: App,
    routes: [
      {
        path: "/",
        exact: true,
        component: Home,
      },
      {
        path: "/todos",
        component: Todos,
        loadData: () => loadData("todos"),
      },
      {
        path: "/posts",
        component: Posts,
        loadData: () => loadData("posts"),
      },
      { component: NotFound },
    ],
  },
];

export default Routes;
