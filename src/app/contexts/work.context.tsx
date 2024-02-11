/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { createContext, useContext, useState } from "react";

import { Work } from "@/interfaces/task.interface";
import { generateHash } from "../utils/base64.utils";

interface WorkContextProviderProps {
  children: React.ReactNode
}

interface WorkContextProps {
  works: Work[]
}

const WorkContext = createContext<WorkContextProps>({} as WorkContextProps);

export function WorkContextProvider({ children }: WorkContextProviderProps) {
  const [works, setWork] = useState<Work[]>([
    { name: 'Sicoob', _id: generateHash(), enable: true, days: [] },
    { name: 'Rancho', _id: generateHash(), enable: true, days: [] }
  ]);
  /**
   * @TODO: implement to register day
   * @TODO: implement to remove day
   * @TODO: implement to register task
   * @TODO: implement to remove task
   * @TODO: implement to register sub task
   * @TODO: implement to remove sub task
   */

  // const setDay = (workId: string, day: Day): void => {
  //   const work = works.find(work => {work._id === workId});

  //   if(!work) return;

  //   if(work.days && work.days.length){

  //   } else {

  //   }
  // }

  return (
    <WorkContext.Provider value={{ works }}>
      {children}
    </WorkContext.Provider>
  )
}

export function useWork() {
  return useContext(WorkContext)
}