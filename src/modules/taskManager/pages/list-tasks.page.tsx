import { CUTask } from "@/modules/taskManager/components/CU-task.component.tsx";
import { ListTasks } from "@/modules/taskManager/components/list-task.component.tsx";
import { useWork } from "@/app/contexts/work.context";

export function ListTasksPage() {
    const { works } = useWork();

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
                                <li key={work._id} id={work._id} className="p-4 flex flex-col gap-3">
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
