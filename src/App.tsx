import { Outlet } from "react-router-dom";
import { CardComponent } from "./components/common/card.component";
import { Navbar } from "./components/common/navbar.component";
import { SideMenu } from "./components/common/side-menu.component";
import { Toaster } from "./components/ui/sonner";

export function App() {
  return (
    <div className='flex flex-col bg-primary text-white w-screen h-screen'>
      <Navbar />
      <div className='flex flex-row w-full h-full'>
        <SideMenu />
        <div className='w-full p-4 flex flex-col'>
          <CardComponent>
            <Toaster />
            <Outlet />
          </CardComponent>
        </div>
      </div>
    </div>
  )
}
