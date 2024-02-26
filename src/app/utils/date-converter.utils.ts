import { Task } from '@/interfaces/task.interface.ts';

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * convert date to Month day, year
 * @param date
 */
export const formatDate = ( date: Date ): string => {
    const newDate = new Date( date );

    const dateFormatter = new Intl.DateTimeFormat( 'en-US', {
        day: 'numeric',
        month: 'short', // 'short' will give you the abbreviated month name
        year: 'numeric',
    } );

    return dateFormatter.format( newDate );
};


export const calculateTotalTime = ( dateArray: Date[] ) => {
    let ms = 0;

    dateArray.forEach( date => {
        ms += new Date( date ).getTime();
    } );

    return calculateTimes( ms );
};

export const calculateTotalTimeWorked = ( tasks: Task[] ) => {
    let ms = 0;

    tasks.forEach( task => {
        const finishTime = task.finish instanceof Date ? task.finish : new Date();
        ms += finishTime.getTime() - task.start.getTime();
    } );

    return calculateTimes( ms );
};

const calculateTimes = ( ms: number ) => {
    const totalSeconds = Math.floor( ms / 1000 );
    const days = Math.floor( totalSeconds / ( 3600 * 24 ) );
    const hours = Math.floor( totalSeconds / 3600 );
    const minutes = Math.floor( ( totalSeconds % 3600 ) / 60 );
    const seconds = totalSeconds % 60;

    return {
        days,
        hours,
        minutes,
        seconds
    };
};
