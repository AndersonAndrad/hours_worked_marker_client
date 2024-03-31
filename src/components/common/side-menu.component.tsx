import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionTrigger } from "../ui/accordion";

import { AccordionItem } from "@radix-ui/react-accordion";
import { FontItalicIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import packageJson from '../../../package.json';
import { Toggle } from "../ui/toggle";

interface MenuItem {
  label: string;
  path: string;
  disabled: boolean;
  icon: JSX.Element;
  parent: MenuAccordion
}

enum MenuAccordion {
  PROJECTS = 'projects',
  FINANCY = 'financy',
  USER = 'user',
}

export function SideMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const items: MenuItem[] = [
      { label: 'Profile', path: '', disabled: true, icon: <FontItalicIcon />, parent: MenuAccordion.USER },
      { label: 'Dashboard', path: '/dashboard', disabled: true, icon: <FontItalicIcon />, parent: MenuAccordion.PROJECTS },
      { label: 'Projects', path: '/projects', disabled: false, icon: <FontItalicIcon />, parent: MenuAccordion.PROJECTS },
      { label: 'Tasks', path: '/tasks', disabled: false, icon: <FontItalicIcon />, parent: MenuAccordion.PROJECTS },
      { label: 'Financy', path: '', disabled: true, icon: <FontItalicIcon />, parent: MenuAccordion.FINANCY },
    ]
    setMenuItems(items);
  }, [])

  const navigateTo = (path: string): void => {
    navigate(path)
  }

  const firstLetterUppercase = (word: string): string => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  return (
    <div className="w-1/5 h-full p-6 flex flex-col gap-10">
      <h3 className="text-3xl font-bold">Settings</h3>
      <Accordion type="single" collapsible className="w-full">
        {Object.values(MenuAccordion).map((menuParent, index) => (
          <AccordionItem value={menuParent} key={index}>
            <AccordionTrigger>{firstLetterUppercase(menuParent)}</AccordionTrigger>
            <AccordionContent>
              {menuItems.filter(menuItem => menuItem.parent === menuParent).map(menuItem => (
                <Toggle
                  className="text-1xl w-full flex flex-row justify-start"
                  disabled={menuItem.disabled}
                  onClick={() => { navigateTo(menuItem.path) }}
                >
                  <span className="flex flex-row gap-2 items-center"  >{firstLetterUppercase(menuItem.label)}</span>
                </Toggle>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="mt-auto opacity-25">
        <span>Version: {packageJson.version}</span>
      </div>
    </div>
  )
}