import { CalculatorTask, Pause, Task } from '@/interfaces/task.interface';

export const calculateOpenedTasksTime = (tasks: Task[]): number => {
  let totalTime = 0;

  if (!tasks.length) return 0;

  tasks
    .filter((task) => !task.scheduled)
    .forEach((task) => {
      if (!task.finished) {
        const taskTime = calculateTaskTime(task);
        totalTime += taskTime;
      }
    });

  const totalPauseMilliseconds = calculatePauseTime(tasks);

  totalTime -= totalPauseMilliseconds;

  totalTime = Math.max(totalTime, 0);

  return totalTime;
};

// Function to calculate the total time spent on finished tasks
export const calculateFinishedTasksTime = (tasks: Task[]): number => {
  let totalTime = 0;
  tasks.forEach((task) => {
    if (task.finished) {
      const taskTime = calculateTaskTime(task);
      totalTime += taskTime;
    }
  });

  return totalTime;
};

// Function to calculate total time spent in pauses
export const calculatePauseTime = (tasks: Task[]): number => {
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

export const calculateTotalTime = (start: Date, finish?: Date): string => {
  const startTime = new Date(start).getTime();
  const finishTime = finish ? new Date(finish).getTime() : new Date().getTime();
  return formatTime(finishTime - startTime);
};

export const calculateMoneyEarned = (totalWorkedTimeMillis: number, hourlyRate: number): number => {
  const totalWorkedTimeMinutes = totalWorkedTimeMillis / (1000 * 60);
  return (totalWorkedTimeMinutes * hourlyRate) / 60;
};

export const calculateTotalMoneyEarned = (tasks: Task[]): string => {
  const tasksMap = new Map<number, Task[]>();

  tasks.forEach((task) => {
    const key: number = task.project.hoursPrice;

    if (tasksMap.has(key)) {
      const tasks = tasksMap.get(key) || [];

      tasks.push(task);

      tasksMap.set(key, tasks);
    } else {
      tasksMap.set(key, [task]);
    }
  });

  let totalMoney: number = 0;

  Array.from(tasksMap.keys()).forEach((key) => {
    const tasks = tasksMap.get(key) || [];

    totalMoney += calculateMoneyEarned(calculateFinishedTasksTime(tasks), key);
  });

  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalMoney);
};

export const formatTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days}:${hours % 24}:${minutes % 60}:${seconds % 60}`;
};

/**
 * All ms or price formatted
 */
export const allCalculators = (tasks: Task[]): CalculatorTask => {
  return {
    openedTask: openedTasksTime(tasks),
    finishedTask: finishedTaskTime(tasks),
    pauseTask: pauseTime(tasks),
    moneyEarned: calculateTotalMoneyEarned(tasks),
  };
};

export const openedTasksTime = (tasks: Task[]): string => {
  return formatTime(calculateOpenedTasksTime(tasks));
};

export const finishedTaskTime = (tasks: Task[]): string => {
  return formatTime(calculateFinishedTasksTime(tasks));
};

export const pauseTime = (tasks: Task[]): string => {
  return formatTime(calculatePauseTime(tasks));
};

export const moneyEarned = (tasks: Task[], hourlyRate: number): string => {
  const money = calculateMoneyEarned(calculateFinishedTasksTime(tasks), hourlyRate);

  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(money);
};
