interface Work {
    _id: string;
    name: string;
    enable: boolean;
    days: Day[];
}

interface Day {
    _id: string;
    day: Date;
    tasks?: Task[];
    resume: string;
}

interface Task {
    description: string;
    start: Date;
    finish?: Date;
    finished: boolean;
    subTasks: SubTask[];
}

interface SubTask {
    description: string;
    finished: string;
}
