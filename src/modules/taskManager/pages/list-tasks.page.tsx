import { CUTask } from '@/modules/taskManager/components/CU-task.component.tsx';
import { useWork } from '@/app/contexts/work.context';
import { useEffect } from 'react';
import { serverApi } from '@/infra/api/server.api.ts';
import { Work } from '@/interfaces/task.interface.ts';

export function ListTasksPage() {
    const { works, setWork } = useWork();

    useEffect( () => {
        serverApi.get( '/works' ).then( ( { data } ) => {
            const { items } = JSON.parse( data ) as { items: Work[] };

            items.forEach( work => {
                setWork( work );
            } );
        } );
    }, [] );

    return (
        <div className="bg-gray-800 h-screen text-blue-100">
            <header>
                <span className="font-bold">Tasks</span>
            </header>

            <main>
                <ul>
                    {
                        works.map( work => {
                            return (
                                /* List works */
                                <li key={ work._id } id={ work._id } className="p-4 flex flex-col gap-3">
                                    <div className="flex flex-row items-center gap-3">
                                        <span className="font-bold">
                                            { work.name }
                                        </span>
                                        <CUTask parentWork={ work }></CUTask>
                                    </div>
                                    {/*<ListTasks work={ work }></ListTasks>*/ }
                                </li>
                            );
                        } )
                    }
                </ul>
            </main>
        </div>
    );
}
