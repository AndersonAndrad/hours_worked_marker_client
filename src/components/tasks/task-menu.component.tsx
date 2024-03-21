import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { BookmarkCheck, MoreVertical, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

import { Button } from "../ui/button";
import { Task } from "@/interfaces/task.interface";
import serverApi from "@/infra/api/server.api";
import { toast } from "sonner";
import { useState } from "react";

interface TaskMenuProps {
  task: Task
}

export function TaskMenu({ task }: TaskMenuProps) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const [openFinishDialog, setOpenFinishDialog] = useState<boolean>(false);

  const pauseTask = (): void => {
    serverApi.post(`/task/${task._id}/pause`).then(() => {
      toast('Task paused successfully.')
    }).catch((error) => {
      toast('Unable to pause the task.', { description: error.mesage })
    })
  }

  const playTask = (): void => {
    serverApi.post(`/task/${task._id}/play`).then(() => {
      toast('Task started successfully.')
    }).catch((error) => {
      toast('Unable to play the task.', { description: error.mesage })
    })
  }

  const deleteTask = (): void => {
    serverApi.post(`/task/${task._id}/pause`).then(() => {
      toast('Task deleted successfully.')
    }).catch((error) => {
      toast('Unable to delete the task.', { description: error.mesage })
    })
  }

  const finishTask = (): void => {
    serverApi.post(`/task/${task._id}/pause`).then(() => {
      toast('Task completed successfully.')
    }).catch((error) => {
      toast('Unable to finish the task.', { description: error.mesage })
    })
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
          <DropdownMenuItem onClick={() => pauseTask()} disabled={task.paused && !task.finished}>
            Pause
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => playTask()} disabled={!task.paused && !task.finished}>
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
    </>
  )
}

