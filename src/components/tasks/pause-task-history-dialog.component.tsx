import { Dialog, DialogContent, DialogDescription, DialogHeader } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { calculateTotalTime, calculateWorkedPeriods, pauseTime } from "@/utils/task.utils";

import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Task } from "@/interfaces/task.interface";
import { formatDate } from "@/utils/date-converter.utils";
import { useState } from "react";

interface PauseTaskDialogProps {
  task: Task;
  opened: boolean;
  onClose: () => void;
}

interface HistoryPausedProps extends Pick<PauseTaskDialogProps, 'task'> { }

interface HistorySubTaskProps extends Pick<PauseTaskDialogProps, 'task'> { }

enum TypeTabs {
  HISTORY_PAUSED = 'paused',
  HISTORY_SUBTASKS = 'subtasks'
}

export function PauseTaskHistoryDialog(props: PauseTaskDialogProps) {
  const { opened, onClose, task } = props;
  return (
    <Dialog open={opened} onOpenChange={() => { onClose() }}>
      <DialogContent style={{ width: '1000px' }}>
        <DialogHeader>History</DialogHeader>
        <DialogDescription><b>{task.name}</b> - {task.description}</DialogDescription>
        <div>
          <Tabs defaultValue={TypeTabs.HISTORY_PAUSED} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value={TypeTabs.HISTORY_PAUSED}>Paused</TabsTrigger>
              <TabsTrigger value={TypeTabs.HISTORY_SUBTASKS}>Subtask</TabsTrigger>
            </TabsList>
            <TabsContent value={TypeTabs.HISTORY_PAUSED}>
              <HistoryPaused task={task} />
            </TabsContent>

            <TabsContent value={TypeTabs.HISTORY_SUBTASKS}>
              <HistorySubTask task={task} />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const HistoryPaused = (props: HistoryPausedProps) => {
  const { task } = props
  return (
    <div className="flex flex-col gap-4 text-sm">
      <header>
        <span>Total paused: {pauseTime([task])}</span>
      </header>

      <ScrollArea className="h-full max-h-96 rounded-md border overflow-auto">
        {task && task.pauses.map(pause => {
          return (
            <div key={pause._id}>
              <ul className="flex flex-col gap-1 py-3 px-1">
                <li>Start: {formatDate(pause.start)}</li>
                <li>End: {pause?.end && formatDate(pause.end)}</li>
                <li>Total: {calculateTotalTime(pause.start, pause.end)}</li>
              </ul>
              <Separator />
            </div>
          )
        })}
      </ScrollArea>
    </div>
  )
}

const HistorySubTask = (props: HistorySubTaskProps) => {
  const { task } = props

  const [activityBeforePause, setActivityBeforePause] = useState<string>('')

  return (
    <div className="flex flex-col gap-4 text-sm">
      <div className="grid grid-cols-2 gap-2">
        <ScrollArea className="h-full max-h-96 rounded-md border overflow-auto">
          {task && calculateWorkedPeriods(task).map((pause, index) => {
            return (
              <div className="cursor-pointer" key={index} onClick={() => setActivityBeforePause(pause.activityBeforePause ?? '')}>
                <ul className="flex flex-col gap-1 py-3 px-1">
                  <li>Start: {formatDate(pause.start)}</li>
                  <li>End: {pause?.end && formatDate(pause.end)}</li>
                  <li>Total: {calculateTotalTime(pause.start, pause.end)}</li>
                </ul>
                <Separator />
              </div>
            )
          })}
        </ScrollArea>
        <div className="h-auto w-full rounded-md border overflow-auto p-2">
          {activityBeforePause}
        </div>
      </div>
    </div>
  )
}