import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTrigger
} from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Task, Work } from '@/interfaces/task.interface.ts';
import { useState } from 'react';
import { serverApi } from '@/infra/api/server.api.ts';
import { useWork } from '@/app/contexts/work.context.tsx';

interface TaskProps {
    parentWork: Work;
}

export function CUTask( { parentWork }: TaskProps ) {
    const [ taskName, setTaskName ] = useState<string>( '' );
    const { insertTaskToWork } = useWork();

    const registerTask = () => {
        serverApi.post( `tasks`, { taskName } ).then( ( { data } ) => {
            const task: Task = JSON.parse( data );

            insertTaskToWork( task, parentWork._id );
        } );
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>New task</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader className="font-bold">New Task</DialogHeader>
                    <DialogDescription>Create a task for <span
                        className="font-bold">{ parentWork.name }</span></DialogDescription>
                    <div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="task-description">Description</label>
                            <Input
                                id="task-description"
                                onChange={ ( event ) => setTaskName( event.target.value ) }
                                value={ taskName }
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant={ 'secondary' }>Cancel</Button>
                        <Button onClick={ () => registerTask() }>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
