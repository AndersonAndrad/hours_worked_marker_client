import { Outlet } from "react-router-dom";
import { CardComponent } from "./components/common/card.component";
import { Navbar } from "./components/common/navbar.component";
import { SideMenu } from "./components/common/side-menu.component";
import { Toaster } from "./components/ui/sonner";

export function App() {
  return (
    <div className='flex flex-col h-full'>
      <Navbar />
      <div className='flex flex-row w-full flex-grow'>
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

// return (
//   <div className="flex flex-col h-full">
//     <div className="bg-blue-300">
//       navbar
//     </div>
//     <div className="flex bg-purple-400  flex-grow">
//       <div className="bg-yellow-300 w-1/4 h-full">
//         sidbar
//       </div>
//       <div className="bg-red-300 w-full">
//         <div className="flex flex-col h-full">
//           <header className="bg-slate-500">
//             header
//           </header>
//           <main className="bg-purple-800 flex-grow h-1 overflow-auto">
//             <ul>
//               {Array.from({ length: 100 }).map(() => {
//                 return (
//                   <li>001</li>
//                 )
//               })}
//             </ul>
//           </main>
//           <footer className="bg-red-600">
//             footer
//           </footer>
//         </div>
//       </div>
//     </div>
//   </div>
// )