/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { createContext, useContext, useState } from 'react';

import { Task, Work } from '@/interfaces/task.interface';

interface WorkContextProviderProps {
    children: React.ReactNode;
}

interface WorkContextProps {
    works: Work[]
    setWork: ( work: Work ) => void,
    insertTaskToWork: ( task: Task, workId: string ) => void;
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
                    // Update the tasks array for the specific work
                    return {
                        ...work,
                        tasks: [ ...work.tasks, task ],
                    };
                }
                return work;
            } );
        } );
    };

    /**
     * @TODO: implement to register day
     * @TODO: implement to remove day
     * @TODO: implement to register task
     * @TODO: implement to remove task
     * @TODO: implement to register sub task
     * @TODO: implement to remove sub task
     */

    return (
        <WorkContext.Provider value={ { works, setWork, insertTaskToWork } }>
            { children }
        </WorkContext.Provider>
    );
}

export function useWork() {
    return useContext( WorkContext );
}
