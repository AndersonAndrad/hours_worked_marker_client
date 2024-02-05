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

interface SubtaskProps {
    parentTaskName: string;
}

export function CUSubTask ({parentTaskName}: SubtaskProps) {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>New sub task</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader className='font-bold'>New sub Task</DialogHeader>
                    <DialogDescription>Create a sub task for <span className="font-bold">{parentTaskName}</span></DialogDescription>
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
