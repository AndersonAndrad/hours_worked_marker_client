import './globals.css';

import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { WorkContextProvider } from './contexts/work.context.tsx';
import { makeServer } from './infra/miragejs/miragejs.config.ts';
import { router } from './router.tsx';

if (process.env.REACT_APP_ENVIRONMENT === 'test') makeServer()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <WorkContextProvider>
        <div className='bg-primary text-white w-screen h-screen'>
            <RouterProvider router={router} />
        </div>
    </WorkContextProvider>
);
