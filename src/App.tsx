import { ListTasksPage } from "@/modules/taskManager/pages/list-tasks.page.tsx";
import { SideMenu } from "./components/common/side-menu.component";

export function App() {
  return (
    <div className="h-full w-full  flex flex-row" >
      <SideMenu></SideMenu>
      <div className="w-full">
        <ListTasksPage></ListTasksPage>
      </div>
    </div>
  )
}
