import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";

interface TaskProps {
    parentWork: string;
}

export function CUTask ({parentWork}: TaskProps) {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>New task</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader className='font-bold'>New Task</DialogHeader>
                    <DialogDescription>Create a task for <span className='font-bold'>{parentWork}</span></DialogDescription>
                    <div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="task-description">Description</label>
                            <Input id="task-description"/>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant={'secondary'}>Cancel</Button>
                        <Button>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
