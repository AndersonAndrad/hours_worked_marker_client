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

export function CUTask () {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>New task</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>New Task</DialogHeader>
                    <DialogDescription>Create a task for day</DialogDescription>
                    <div>
                        <div>
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
