import { Outlet } from "react-router-dom";
import { Navbar } from "./components/common/navbar.component";
import { SideMenu } from "./components/common/side-menu.component";

export function App() {
  return (
    <div className='flex flex-col bg-primary text-white w-screen h-screen'>
      <Navbar />
      <div className='flex flex-row w-full h-full'>
        <SideMenu />
        <div className='w-full p-4'>
          <div className=' border-solid border-y border-x border-opacity-25 border-white p-4 mt-9 rounded-sm'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
