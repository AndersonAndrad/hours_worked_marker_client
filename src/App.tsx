import { Navbar } from "./components/common/navbar.component";
import { AuthenticatePage } from "./pages/sing-in.page";

export function App() {
  return (
    <div className='flex flex-col h-full'>
      <Navbar />
      <div className='flex flex-row w-full flex-grow mt-9'>
        <AuthenticatePage />
        {/* <SideMenu />
        <div className='w-full flex flex-col mb-9 mr-4'>
          <CardComponent>
            <Toaster />
            <Outlet />
          </CardComponent>
        </div> */}
      </div>
    </div>
  )
}