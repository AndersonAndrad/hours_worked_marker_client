import {generateHash} from "@/app/utils/base64.utils.ts";
import {CUTask} from "@/modules/taskManager/components/CU-task/CU-task.component.tsx";
import {Button} from "@/components/ui/button.tsx";

export function ListTasksPage() {
    const works: Work[] = [
        {
            _id: generateHash(),
            name: 'Sicoob',
            enable: true,
            days: [{
                _id: generateHash(),
                day: new Date(),
                tasks: [
                    {
                        _id: generateHash(),
                        description: 'Create todo list',
                        subTasks: [
                            {
                                _id: generateHash(),
                                description: 'Insert first item',
                                finished: false,
                            }
                        ],
                        start: new Date(),
                        finished: false,
                    }
                ],
                resume: ''
            }]
        }
    ];

    return (
        <div>
            <header>
                <span className="font-bold">Tasks</span>
            </header>

            <main>
                <ul>
                    {
                        works.map(work => {
                            return (
                                /* List works */
                                <li id={work._id} className="p-4 bg-amber-100 flex flex-col gap-3">
                                    <div className="flex flex-row items-center gap-3">
                                        <span className="font-bold">
                                            {work.name}
                                        </span>
                                        <CUTask></CUTask>
                                    </div>
                                    {/* list days */}
                                    <ul className="p-4">
                                        {work.days.map(day => {
                                            return (
                                                <li id={day._id}>
                                                    <div>
                                                        {String(day.day)}
                                                    </div>
                                                    {/* list tasks */}
                                                    <ul className="p-4">
                                                        {day.tasks && day.tasks.map(task => {
                                                            return (
                                                                <li id={task._id}>
                                                                    <div className="flex flex-row gap-3 items-center">
                                                                        {task.description}
                                                                        <Button> New sub task</Button>
                                                                    </div>
                                                                    {/* list sub tasks */}
                                                                    <ul className="p-4">
                                                                        {task.subTasks.map(subTask => {
                                                                            return (
                                                                                <li id={subTask._id}>
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
                                </li>
                            )
                        })
                    }
                </ul>
            </main>
        </div>
    )
}
