import './globals.css';

import { makeServer } from '@/infra/miragejs/miragejs.config.ts';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { WorkContextProvider } from './app/contexts/work.context.tsx';
import { router } from './router.tsx';

makeServer();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <WorkContextProvider>
        <RouterProvider router={router} />
    </WorkContextProvider>
);
