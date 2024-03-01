import { useWork } from '@/contexts/work.context';
import { serverApi } from '@/infra/api/server.api.ts';
import { Work } from '@/interfaces/task.interface.ts';
import { CUTask } from '@/modules/taskManager/components/CU-task.component.tsx';
import { ListTasks } from '@/modules/taskManager/components/list-task.component.tsx';
import { useEffect } from 'react';

export function ListTasksPage() {
    const { works, setWork } = useWork();

    useEffect(() => {
        serverApi.get('/works').then(({ data }) => {
            const { items } = JSON.parse(data) as { items: Work[] };

            items.forEach(work => {
                setWork(work);
            });
        });
    }, []);
    return (
        <div className=" h-full text-blue-100">
            <header>
                <span className="font-bold">Tasks</span>
            </header>
            <main>
                <ul>
                    {
                        works.length && works.map(work => {
                            return (
                                /* List works */
                                <li key={work._id} id={work._id} className="p-4 flex flex-col gap-3">
                                    <div className="flex flex-row items-center gap-3">
                                        <span className="font-bold">
                                            {work.name}
                                        </span>
                                        <CUTask parentWork={work}></CUTask>
                                    </div>
                                    {work.tasks && <ListTasks work={work}></ListTasks>}
                                </li>
                            );
                        })
                    }
                </ul>
            </main>
        </div>
    );
}
