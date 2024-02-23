/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { createContext, useContext, useState } from 'react';

import { SubTask, Task, Work } from '@/interfaces/task.interface';

interface WorkContextProviderProps {
    children: React.ReactNode;
}

interface WorkContextProps {
    works: Work[]
    setWork: ( work: Work ) => void,
    insertTaskToWork: ( task: Task, workId: string ) => void;
    insertSubTaskToTask: ( subtask: SubTask, taskId: string ) => void;
}

const WorkContext = createContext<WorkContextProps>( {} as WorkContextProps );

export function WorkContextProvider( { children }: WorkContextProviderProps ) {
    const [ works, setWorks ] = useState<Work[]>( [] );

    const setWork: WorkContextProps['setWork'] = ( newWork ) => {
        setWorks( ( prevWorks ) => [ ...prevWorks, newWork ] );
    };

    const insertTaskToWork: WorkContextProps['insertTaskToWork'] = ( task, workId ) => {
        setWorks( ( prevWorks ) => {
            return prevWorks.map( ( work ) => {
                if ( work._id === workId ) {
                    work.tasks.push( task );
                }
                return work;
            } );
        } );
    };

    const insertSubTaskToTask: WorkContextProps['insertSubTaskToTask'] = ( subtask: SubTask, taskId: string ) => {
        const cacheWorks = works.map( work => {
            return {
                ...work,
                tasks: work.tasks.map( task => {
                    if ( task._id === taskId ) {
                        task.subTasks.push( subtask );
                    }

                    return task;
                } )
            };
        } );

        setWorks( cacheWorks );
    };

    return (
        <WorkContext.Provider value={ { works, setWork, insertTaskToWork, insertSubTaskToTask } }>
            { children }
        </WorkContext.Provider>
    );
}

export function useWork() {
    return useContext( WorkContext );
}
