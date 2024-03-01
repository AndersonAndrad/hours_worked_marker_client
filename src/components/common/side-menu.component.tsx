import { useEffect, useState } from "react";

import { FontItalicIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import packageJson from '../../../package.json';
import { Toggle } from "../ui/toggle";

interface MenuItem {
  label: string;
  path: string;
  disabled: boolean;
  icon: JSX.Element;
}

export function SideMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const items: MenuItem[] = [
      { label: 'Profile', path: '', disabled: true, icon: <FontItalicIcon /> },
      { label: 'Dashboard', path: '/dashboard', disabled: true, icon: <FontItalicIcon /> },
      { label: 'Projects', path: '/projects', disabled: false, icon: <FontItalicIcon /> },
      { label: 'Tasks', path: '/tasks', disabled: false, icon: <FontItalicIcon /> },
      { label: 'Financy', path: '', disabled: true, icon: <FontItalicIcon /> },
    ]
    setMenuItems(items)
  }, [])

  const navigateTo = (path: string): void => {
    navigate(path)
  }

  return (
    <div className="w-1/5 h-full p-6 flex flex-col gap-10">
      <h3 className="text-3xl font-bold">Settings</h3>
      <ul>
        {menuItems.map(menuItem => {
          return (
            <li >
              <Toggle
                className="text-1xl w-full flex flex-row justify-start"
                disabled={menuItem.disabled}
                onClick={() => { navigateTo(menuItem.path) }}
              >
                <span className="flex flex-row gap-2 items-center"  >{menuItem.label}</span>
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