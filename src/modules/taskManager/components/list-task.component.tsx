import {CUSubTask} from "@/modules/taskManager/components/CU-sub-task.component.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CheckCheck, Pause, Play, Trash2} from "lucide-react";
import {Alert} from "@/components/common/alert.component.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {calculateTotalTimeWorked} from "@/app/utils/date-converter.utils.ts";

interface ListTasksProps {
    work: Work;
}
export function ListTasks({work}: ListTasksProps){
    const timeWorked = (tasks: Task[]): string => {
        const {hours, minutes, seconds} = calculateTotalTimeWorked(tasks);
        return `${hours}:${minutes}:${seconds}`
    }

    return (
        <>
            {/* list days */}
            <ul className="p-4 bg-gray-100 rounded-sm">
                {work.days.map(day => {
                    return (
                        <li key={day._id} id={day._id}>
                            <div className='flex flex-row gap-1'>
                                <span className='font-bold'>{String(day.day)}</span>
                                {day.tasks && <Badge>Worked: {timeWorked(day.tasks)}</Badge>}
                            </div>
                            {/* list tasks */}
                            <ul className="p-4">
                                {day.tasks && day.tasks.map(task => {
                                    return (
                                        <li key={task._id} id={task._id}>
                                            <div className="flex flex-row gap-3 items-center">
                                                <span className='w-full'>{task.description}</span>
                                                <div className='flex flex-row justify-end gap-2 w-full'>
                                                    <Alert title={`Alert, you are deleting`} description={`Do you want delete ${task.description} ?`}>
                                                        <Button><Trash2 /></Button>
                                                    </Alert>
                                                    { !task.finished && <Button disabled={!task.paused}><Play /></Button>}
                                                    { !task.finished && <Button disabled={task.paused}><Pause /></Button>}
                                                    { !task.finished && <Button disabled={task.finished}><CheckCheck /></Button>}
                                                    { !task.finished && <CUSubTask parentTaskName={task.description}></CUSubTask>}
                                                </div>
                                            </div>
                                            {/* list sub tasks */}
                                            <ul className="p-4">
                                                {task.subTasks.map(subTask => {
                                                    return (
                                                        <li key={subTask._id} id={subTask._id}>
                                                            <div>
                                                                {subTask.description}
                                                            </div>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
