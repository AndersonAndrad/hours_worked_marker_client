import {generateHash} from "@/app/utils/base64.utils.ts";
import {CUTask} from "@/modules/taskManager/components/CU-task.component.tsx";
import {convertDate} from "@/app/utils/date-converter.utils.ts";
import {ListTasks} from "@/modules/taskManager/components/list-task.component.tsx";

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
                        paused: false,
                    },
                    {
                        _id: '1',
                        description: 'Task 1',
                        start: new Date('2024-02-04T10:30:00Z'),
                        finish: new Date('2024-02-04T15:45:30Z'),
                        finished: false,
                        paused: false,
                        subTasks: []
                    },
                    {
                        _id: '2',
                        description: 'Task 2',
                        start: new Date('2024-02-04T16:00:00Z'),
                        finish: new Date('2024-02-04T18:30:00Z'),
                        finished: true,
                        paused: false,
                        subTasks: []
                    }
                ],
                resume: ''
            }]
        }
    ].map(work => (
        {...work, days: work.days.map(day => (
                {...day, day: convertDate(day.day)}
            ))
        })
    )

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
                                <li id={work._id} className="p-4 flex flex-col gap-3">
                                    <div className="flex flex-row items-center gap-3">
                                        <span className="font-bold">
                                            {work.name}
                                        </span>
                                        <CUTask parentWork={work.name}></CUTask>
                                    </div>
                                    <ListTasks work={work}></ListTasks>
                                </li>
                            )
                        })
                    }
                </ul>
            </main>
        </div>
    )
}
