import { Button } from '@/components/ui/button.tsx';
import { Trash } from 'lucide-react';
import { Task } from '@/interfaces/task.interface.ts';
import { CUSubTask } from '@/modules/taskManager/components/CU-sub-task.component.tsx';
import { formatDate } from '@/app/utils/date-converter.utils.ts';

interface SubTasksComponentProps {
    task: Task;
}

export function SubTasksComponent( { task }: SubTasksComponentProps ) {
    return (
        <div className="flex flex-col border-2 p-4 rounded-lg gap-3">
            <div className="flex flex-row justify-end gap-2">
                { !task.finished && <CUSubTask task={ task }></CUSubTask> }
            </div>
            <header className="flex flex-row justify-between">
                <section className="flex flex-col gap-2">
                    <span className="font-bold text-2xl">{ task.name }</span>
                    <span>{ task.description }</span>
                </section>
                <span>{ formatDate( task.start ) }</span>
            </header>
            <main>
                <ul className="flex flex-col gap-2">
                    { task.subTasks && task.subTasks.map( subtask => {
                        return (
                            <li className="flex flex-row items-center justify-between">
                                <span>{ subtask.description }</span>
                                <Button><Trash/></Button>
                            </li>
                        );
                    } ) }
                </ul>
            </main>
        </div>
    );
}
