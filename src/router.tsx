import { App } from "./App";
import { BankAccountPage } from "./pages/bank-account.page";
import { BillsPage } from "./pages/bills.page";
import { NotFound } from "./pages/not-found.page";
import { ProjectDashboard } from "./pages/project-dashboard.page";
import { ProjectsPage } from "./pages/projects.page";
import { TasksPage } from "./pages/tasks.page";
import { TasksProjectPage } from "./pages/tasks-project.page";
import {
  createBrowserRouter
} from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: '/tasks', element: <TasksPage /> },
      { path: '/projects', element: <ProjectsPage />, },
      /**
       * @TODO check to transform this route in children by tasks
       */
      { path: '/project', element: <TasksProjectPage /> },
      { path: '/project/dashboard', element: <ProjectDashboard /> },
      { path: '/bank-account', element: <BankAccountPage /> },
      { path: '/bills', element: <BillsPage /> },
    ]
  },

])

