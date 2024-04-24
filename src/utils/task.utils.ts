import { Pause, Task } from '@/interfaces/task.interface';

export const calculateOpenedTasksTime = (tasks: Task[]): string => {
  let totalTime = 0;

  if (!tasks.length) return formatTime(0);

  tasks
    .filter((task) => !task.scheduled)
    .forEach((task) => {
      if (!task.finished) {
        const taskTime = calculateTaskTime(task);
        totalTime += taskTime;
      }
    });

  const totalPauseMilliseconds = pauseTime(tasks);

  totalTime -= totalPauseMilliseconds;

  totalTime = Math.max(totalTime, 0);

  return formatTime(totalTime);
};

// Function to calculate the total time spent on finished tasks
export const calculateFinishedTasksTime = (tasks: Task[]): string => {
  let totalTime = 0;
  tasks.forEach((task) => {
    if (task.finished) {
      const taskTime = calculateTaskTime(task);
      totalTime += taskTime;
    }
  });
  return formatTime(totalTime);
};

// Function to calculate total time spent in pauses
export const pauseTime = (tasks: Task[]): number => {
  let totalPauseTime = 0;
  tasks.forEach((task) => {
    if (task.pauses && task.pauses.length > 0) {
      task.pauses.forEach((pause) => {
        const end = pause?.end ? new Date(pause?.end) : new Date();
        totalPauseTime += end.getTime() - new Date(pause?.start).getTime();
      });
    }
  });
  return totalPauseTime;
};

export const calculatePauseTime = (tasks: Task[]): string => {
  return formatTime(pauseTime(tasks));
};

// Helper function to calculate time spent on a task considering pauses
export const calculateTaskTime = (task: Task): number => {
  const startTime = new Date(task.start).getTime();
  const finishTime = task.finish ? new Date(task.finish).getTime() : new Date().getTime();
  let totalTime = finishTime - startTime;

  // Deduct time spent in pauses
  if (task.pauses && task.pauses.length > 0) {
    task.pauses.forEach((pause) => {
      const pauseStartTime = new Date(pause.start).getTime();
      const pauseEndTime = pause?.end ? new Date(pause.end).getTime() : new Date().getTime();
      totalTime -= pauseEndTime - pauseStartTime;
    });
  }

  return totalTime;
};

export const calculateTotalTime = (start: Date, finish?: Date): string => {
  const startTime = new Date(start).getTime();
  const finishTime = finish ? new Date(finish).getTime() : new Date().getTime();
  return formatTime(finishTime - startTime);
};

export const calculateWorkedPeriods = (task: Task): Pause[] => {
  if (!task.pauses.length) return [];

  task.pauses = task.pauses.slice().reverse();
  const { start, pauses, finish } = task;
  const workedPeriods: Pause[] = [];

  let previousEndTime = new Date(start);

  for (const pause of pauses) {
    if (!pause?.end) continue;

    const pauseStart = new Date(pause.start);
    const pauseEnd = new Date(pause.end);

    const workedPeriod = {
      _id: pause._id,
      start: previousEndTime,
      end: pauseStart,
      description: pause.activityBeforePause,
    };

    workedPeriods.push(workedPeriod);

    previousEndTime = pauseEnd;
  }

  if (finish) {
    const lastWorkedPeriod = {
      _id: pauses[pauses.length - 1]._id,
      start: previousEndTime,
      end: new Date(finish),
      description: '',
    };

    workedPeriods.push(lastWorkedPeriod);
  }

  return workedPeriods;
};

export const formatTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days}:${hours % 24}:${minutes % 60}:${seconds % 60}`;
};
