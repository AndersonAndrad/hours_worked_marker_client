import { BookmarkCheck, MoreVertical, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

import { TaskApi } from "@/application/tasks/task.api";
import { Task } from "@/interfaces/task.interface";
import { useState } from "react";
import { Button } from "../ui/button";
import { UpdateTaskDialog } from "./update-task-dialog.component";

interface TaskMenuProps {
  task: Task
  refreshParent: () => void
}

export function TaskMenu({ task, refreshParent }: TaskMenuProps) {
  const taskApi = new TaskApi();

  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const [openFinishDialog, setOpenFinishDialog] = useState<boolean>(false);

  const [openUpdateTaskDialog, setUpdateDialog] = useState<boolean>(false);

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

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button>
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => pauseTask()} disabled={task.paused || task.finished}>
            Pause
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => playTask()} disabled={!task.paused || task.finished}>
            Play
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenFinishDialog(true)} disabled={task.finished}>
            Finish
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setUpdateDialog(true)} disabled={task.finished}>
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

      <UpdateTaskDialog open={openUpdateTaskDialog} task={task} refresh={refreshParent} />
    </>
  )
}

