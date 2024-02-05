const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export const convertDate = (date: Date): string => {
    date = new Date(date);

    const monthName: string = months[date.getMonth()];

    return `${date.getDate()} ${monthName.slice(0, 3).toLowerCase()}. ${date.getFullYear()}`
}

export const calculateTotalTime = (dateArray: Date[]) => {
    let ms = 0;

    dateArray.forEach(date => {
        ms += new Date(date).getTime();
    });

    return calculateTimes(ms);
}

export const calculateTotalTimeWorked = (tasks: Task[]) => {
    let ms = 0;

    tasks.forEach(task => {
        const finishTime = task.finish instanceof Date ? task.finish : new Date();
        ms += finishTime.getTime() - task.start.getTime();
    });

    return calculateTimes(ms);
}

const calculateTimes = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
        days,
        hours,
        minutes,
        seconds
    };
}
