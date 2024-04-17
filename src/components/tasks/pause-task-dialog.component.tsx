import { Pause, Task } from "@/interfaces/task.interface";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "../ui/dialog";

import { TaskApi } from "@/application/tasks/task.api";
import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface PauseTaskDialogProps {
  task: Task;
  opened: boolean;
  onClose: () => void;
  refreshParent: () => void;
}

export function PauseTaskDialog(props: PauseTaskDialogProps) {
  const { opened, onClose, task, refreshParent } = props;
  const taskApi = new TaskApi();

  const [description, setDescription] = useState<string>('');
  const [startDate] = useState<Date>(new Date());

  const pauseTask = async (): Promise<void> => {
    const pauseTask: Partial<Omit<Pause, '_id'>> = {
      activityBeforePause: description.trim(),
      start: startDate
    }

    await taskApi.togglePauseStatus(task._id, pauseTask).then(() => {
      refreshParent();
      onClose();
    })
  }

  return (
    <Dialog open={opened} onOpenChange={() => { onClose() }}>
      <DialogContent>
        <DialogHeader>Would you like to add the task {task.name} to pause?</DialogHeader>
        <DialogDescription>Before adding, describe what you are doing to remember later and document your actions.</DialogDescription>
        <div className="grid grid-flow-row auto-rows-max gap-2">
          <div >
            <Textarea className="resize-none min-h-28" maxLength={250} onChange={(event) => setDescription(event.target.value)} />
          </div>
          <div className="flex flex-row justify-end h-fit">
            <Button onClick={async () => { await pauseTask() }}>Pause</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}