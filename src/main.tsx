import './globals.css';

import { AuthenticationProvider } from './contexts/authentication.context.tsx';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { WorkContextProvider } from './contexts/work.context.tsx';
import { makeServer } from './infra/miragejs/miragejs.config.ts';
import { router } from './router.tsx';

if (process.env.REACT_APP_ENVIRONMENT === 'test') makeServer()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <WorkContextProvider>
        <div className='bg-primary text-white w-screen h-screen'>
            <AuthenticationProvider>
                <RouterProvider router={router} />
            </AuthenticationProvider>
        </div>
    </WorkContextProvider>
);
