import {
  createBrowserRouter
} from "react-router-dom";
import { App } from "./App";
import { ListTasksPage } from "./pages/list-tasks.page";
import { NotFound } from "./pages/not-found.page";
import { ProjectPage } from "./pages/project.page";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: '/tasks', element: <ListTasksPage /> },
      { path: '/projects', element: <ProjectPage /> },
    ]
  },

])

