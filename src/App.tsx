import { Outlet } from "react-router-dom";
import { CardComponent } from "./components/common/card.component";
import { Navbar } from "./components/common/navbar.component";
import { SideMenu } from "./components/common/side-menu.component";
import { Toaster } from "./components/ui/sonner";

export function App() {
  return (
    <div className='flex flex-col h-full'>
      <Navbar />
      <div className='flex flex-row w-full flex-grow mt-9'>
        <SideMenu />
        <div className='w-full flex flex-col mb-9 mr-4'>
          <CardComponent>
            <Toaster />
            <Outlet />
          </CardComponent>
        </div>
      </div>
    </div>
  )
}