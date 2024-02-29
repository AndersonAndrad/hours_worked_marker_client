import { useEffect, useState } from "react";

import { FontItalicIcon } from "@radix-ui/react-icons";
import packageJson from '../../../package.json';
import { Toggle } from "../ui/toggle";

interface MenuItem {
  label: string;
  path: string;
  disabled: boolean;
  icon: JSX.Element;
}

export function SideMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])

  useEffect(() => {
    const items: MenuItem[] = [
      { label: 'Profile', path: '', disabled: true, icon: <FontItalicIcon /> },
      { label: 'Dashboard', path: '', disabled: true, icon: <FontItalicIcon /> },
      { label: 'Work', path: '', disabled: true, icon: <FontItalicIcon /> },
      { label: 'Tasks', path: '', disabled: false, icon: <FontItalicIcon /> },
      { label: 'Financy', path: '', disabled: true, icon: <FontItalicIcon /> },
    ]
    setMenuItems(items)
  }, [])


  return (
    <div className="w-1/5 text-gray-50 p-6 bg-gray-950 flex flex-col gap-10">
      <h3 className="text-3xl font-bold">Settings</h3>
      <ul>
        {menuItems.map(menuItem => {
          return (
            <li >
              <Toggle className="text-1xl w-full flex flex-row justify-start" disabled={menuItem.disabled}>
                <span className="flex flex-row gap-2 items-center" >{menuItem.label}</span>
              </Toggle>
            </li>
          )
        })}
      </ul>
      <div className="mt-auto opacity-25">
        <span>Version: {packageJson.version}</span>
      </div>
    </div>
  )
}