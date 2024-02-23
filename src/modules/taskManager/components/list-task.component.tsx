import { CheckCheck, Pause, Play, Trash2 } from 'lucide-react';
import { Work } from '@/interfaces/task.interface';

import { Alert } from '@/components/common/alert.component.tsx';
import { Button } from '@/components/ui/button.tsx';
import { CUSubTask } from '@/modules/taskManager/components/CU-sub-task.component.tsx';

interface ListTasksProps {
    work: Work;
}

export function ListTasks( { work }: ListTasksProps ) {
    return (
        <>
            <ul className="p-4">
                { work.tasks && work.tasks.map( task => {
                    return (
                        <li key={ task._id } id={ task._id }>
                            <div className="flex flex-row gap-3 items-center">
                                <span className="w-full">{ task.name }</span>
                                <div className="flex flex-row justify-end gap-2 w-full">
                                    <Alert
                                        title={ `Alert, you are deleting` }
                                        description={ `Do you want delete ${ task.name } ?`
                                        }>
                                        <Button><Trash2/></Button>
                                    </Alert>
                                    { !task.finished && <Button disabled={ !task.paused }><Play/></Button> }
                                    { !task.finished && <Button disabled={ task.paused }><Pause/></Button> }
                                    { !task.finished && <Button disabled={ task.finished }><CheckCheck/></Button> }
                                    { !task.finished && <CUSubTask task={ task }></CUSubTask> }
                                </div>
                            </div>
                            {/* list sub tasks */ }
                            <ul className="p-4 flex flex-col gap-2">
                                { task.subTasks && task.subTasks.map( subTask => {
                                    return (
                                        <li key={ subTask._id } id={ subTask._id }>
                                            <div className="flex flex-row items-center justify-between">
                                                { subTask.description }
                                                <Alert title={ `Alert, you are deleting a sub task` }
                                                       description={ `Do you want delete ${ subTask.description } ?` }>
                                                    <Button><Trash2/></Button>
                                                </Alert>
                                            </div>
                                        </li>
                                    );
                                } ) }
                            </ul>
                        </li>
                    );
                } ) }
            </ul>
        </>
    );
}
