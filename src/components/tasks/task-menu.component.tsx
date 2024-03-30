import { BookmarkCheck, MoreVertical, Soup, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

import { TaskApi } from "@/application/tasks/task.api";
import { Task } from "@/interfaces/task.interface";
import { useState } from "react";
import { Button } from "../ui/button";

interface TaskMenuProps {
  task: Task
  refreshParent: () => void
}

export function TaskMenu({ task, refreshParent }: TaskMenuProps) {
  const taskApi = new TaskApi();

  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const [openFinishDialog, setOpenFinishDialog] = useState<boolean>(false);

  const [openStartTaskDialog, setOpenStartTaskDialog] = useState<boolean>(false);

  const pauseTask = async (): Promise<void> => {
    await taskApi.togglePauseStatus(task._id).then(() => {
      refreshParent();
    })
  }

  const playTask = async (): Promise<void> => {
    await taskApi.togglePauseStatus(task._id).then(() => {
      refreshParent();
    })
  }

  const deleteTask = async (): Promise<void> => {
    await taskApi.delete(task._id).then(() => {
      refreshParent()
      setOpenDeleteDialog(false);
    })
  }

  const finishTask = async (): Promise<void> => {
    await taskApi.update(task._id, { finished: true, finish: new Date() }).then(() => {
      refreshParent()
      setOpenFinishDialog(false);
    });
  }

  const startTask = async (): Promise<void> => {
    await taskApi.startTask(task._id).then(() => {
      refreshParent()
      setOpenStartTaskDialog(false);
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button>
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpenStartTaskDialog(true)} disabled={!task?.scheduled || task.finished}>
            Start
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => pauseTask()} disabled={task?.scheduled || task.paused || task.finished}>
            Pause
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => playTask()} disabled={task?.scheduled || !task.paused || task.finished}>
            Play
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenFinishDialog(true)} disabled={task.finished}>
            Finish
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled={task.finished}>
            Update
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="w-full" onClick={() => setOpenDeleteDialog(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* alert finish task */}
      <AlertDialog open={openFinishDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle><span className="text-base font-bold">Attention !</span></AlertDialogTitle>
            <AlertDialogDescription>Do you want finish <span className="font-bold">{task.name} ?</span></AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant={'ghost'} onClick={() => setOpenFinishDialog(false)}>Cancel</Button>
            <Button onClick={() => finishTask()} className="flex flex-row gap-2">
              <BookmarkCheck />
              Finish
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* alert delete task */}
      <AlertDialog open={openDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle><span className="text-base font-bold">Attention !</span></AlertDialogTitle>
            <AlertDialogDescription>Do you want delete <span className="font-bold">{task.name} ?</span></AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant={'ghost'} onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
            <Button onClick={() => deleteTask()} variant={'destructive'} className="flex flex-row gap-2">
              <Trash2 />
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* alert start task */}
      <AlertDialog open={openStartTaskDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle><span className="text-base font-bold">Attention !</span></AlertDialogTitle>
            <AlertDialogDescription>
              Do you want start <span className="font-bold">{task.name} ?</span> <br />
              When you do this, the timer starts counting, and the task actions are released.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant={'ghost'} onClick={() => setOpenStartTaskDialog(false)}>Cancel</Button>
            <Button onClick={() => startTask()} className="flex flex-row gap-2">
              <Soup />
              Start
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

