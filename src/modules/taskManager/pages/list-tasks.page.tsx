import {generateHash} from "@/app/utils/base64.utils.ts";
import {CUTask} from "@/modules/taskManager/components/CU-task/CU-task.component.tsx";

export function ListTasksPage() {
    const works: Work[] = [
        {
            _id: generateHash(),
            name: 'Sicoob',
            enable: true,
            days: []
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
                                <li id={work._id} className="p-4 bg-amber-100 flex flex-row items-center gap-3">
                                    <span className="font-bold">
                                        {work.name}
                                    </span>
                                    <CUTask></CUTask>
                                </li>
                            )
                        })
                    }
                </ul>
            </main>
        </div>
    )
}
