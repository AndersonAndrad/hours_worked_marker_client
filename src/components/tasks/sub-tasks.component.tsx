import { Task, TaskNotation } from '@/interfaces/task.interface.ts';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button.tsx';
import { CUSubTask } from '@/modules/taskManager/components/CU-sub-task.component.tsx';
import { formatDate } from '@/utils/date-converter.utils';
import { Trash } from 'lucide-react';

interface SubTasksComponentProps {
    task: Task;
}

export function SubTasksComponent({ task }: SubTasksComponentProps) {
    const [notations, setNotations] = useState<TaskNotation[]>([])

    useEffect(() => { }, [task])

    const loadNotations = async () => {

    }

    return (
        <div className="flex flex-col border-2 p-4 rounded-lg gap-3">
            <div className="flex flex-row justify-end gap-2">
                {!task.finished && <CUSubTask task={task} refreshParent={loadNotations} />}
            </div>
            <header className="flex flex-row justify-between">
                <section className="flex flex-col gap-2">
                    <span className="font-bold text-2xl">{task.name}</span>
                    <span>{task.description}</span>
                </section>
                <span>{formatDate(task.start)}</span>
            </header>
            <main>
                <ul className="flex flex-col gap-2">
                    {notations.map(notation => {
                        return (
                            <li className="flex flex-row items-center justify-between">
                                <span>{notation.notation}</span>
                                <Button><Trash /></Button>
                            </li>
                        );
                    })}
                </ul>
            </main>
        </div>
    );
}
