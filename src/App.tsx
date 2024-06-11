import { AuthenticatePage } from "./pages/sing-in.page";
import { AuthenticationContext } from "./contexts/authentication.context";
import { CardComponent } from "./components/common/card.component";
import { Navbar } from "./components/common/navbar.component";
import { Outlet } from "react-router-dom";
import { SideMenu } from "./components/common/side-menu/side-menu.component";
import { Toaster } from "sonner";
import { useContext } from "react";

export function App() {
  const { retrieveUser } = useContext(AuthenticationContext);

  const user = retrieveUser()

  return (
    <div className='flex flex-col h-full'>
      <Navbar />
      <div className='flex flex-row w-full flex-grow mt-9'>
        {user ?
          <>
            <SideMenu />
            <div className='w-full flex flex-col mb-9 mr-4'>
              <CardComponent>
                <Toaster />
                <Outlet />
              </CardComponent>
            </div>
          </> :
          <AuthenticatePage />}
      </div>
    </div>
  )
}