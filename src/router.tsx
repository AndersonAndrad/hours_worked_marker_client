import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { NotFound } from './pages/not-found.page';
import { ProjectDashboard } from './pages/project-dashboard.page';
import { ProjectsPage } from './pages/projects.page';
import { TasksProjectPage } from './pages/tasks-project.page';
import { TasksPage } from './pages/tasks.page';
import { WikiPage } from '@/pages/wiki/wiki.page.tsx';
import { WikiCreateDocumentPage } from '@/pages/wiki/wiki-create-document.page.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: 'tasks', element: <TasksPage /> },

      { path: 'wiki', element: <WikiPage /> },
      { path: 'wiki/create-document', element: <WikiCreateDocumentPage /> },

      { path: 'projects', element: <ProjectsPage /> },
      /**
       * @TODO check to transform this route in children by tasks
       */
      { path: 'project', element: <TasksProjectPage /> },
      { path: 'project/dashboard', element: <ProjectDashboard /> },
    ],
  },
]);
