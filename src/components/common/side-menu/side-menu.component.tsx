import { Accordion, AccordionContent, AccordionTrigger } from "../../ui/accordion";
import { FolderGit2, FolderRoot, HandCoins, Home, LayoutDashboard, LucideIcon, WalletCards } from "lucide-react";
import { useEffect, useState } from "react";

import { AccordionItem } from "@radix-ui/react-accordion";
import { SideMenuOption } from "./side-menu-option.component";
import { firstLetterUppercase } from "@/utils/string.utils";
import { generateHash } from "@/utils/base64.utils";
import packageJson from '../../../../package.json';

interface MenuItem {
  label: string;
  path: string;
  disabled: boolean;
  icon: LucideIcon;
  parent: MenuAccordion
  selected: boolean;
  id: string;
}

enum MenuAccordion {
  PROJECTS = 'projects',
  FINANCY = 'financy',
  USER = 'user',
}

export function SideMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const items: MenuItem[] = [
      { label: 'Profile', path: '', disabled: true, icon: Home, parent: MenuAccordion.USER, selected: false, id: generateHash() },

      // Projects
      { label: 'Dashboard', path: '/project/dashboard', disabled: false, icon: LayoutDashboard, parent: MenuAccordion.PROJECTS, selected: false, id: generateHash() },
      { label: 'List projects', path: '/projects', disabled: false, icon: FolderRoot, parent: MenuAccordion.PROJECTS, selected: false, id: generateHash() },
      { label: 'Tasks', path: '/tasks', disabled: false, icon: FolderGit2, parent: MenuAccordion.PROJECTS, selected: false, id: generateHash() },

      // Financy
      // { label: 'Dashboard', path: '/financy/dashboard', disabled: true, icon: LayoutDashboard, parent: MenuAccordion.FINANCY, selected: false, id: generateHash() },
      { label: 'Bills', path: '/bills', disabled: false, icon: HandCoins, parent: MenuAccordion.FINANCY, selected: false, id: generateHash() },
      // { label: 'Category', path: '', disabled: true, icon: Home, parent: MenuAccordion.FINANCY, selected: false, id: generateHash() },
      // { label: 'Client', path: '', disabled: true, icon: Home, parent: MenuAccordion.FINANCY, selected: false, id: generateHash() },
      { label: 'Account bank', path: '/bank-account', disabled: false, icon: WalletCards, parent: MenuAccordion.FINANCY, selected: false, id: generateHash() },
      // { label: 'Cost center', path: '', disabled: true, icon: Home, parent: MenuAccordion.FINANCY, selected: false, id: generateHash() },
      // { label: 'Type payment', path: '', disabled: true, icon: Home, parent: MenuAccordion.FINANCY, selected: false, id: generateHash() },
      // { label: 'DRE', path: '', disabled: true, icon: FileBarChart, parent: MenuAccordion.FINANCY, selected: false, id: generateHash() },
    ]
    setMenuItems(items);
  }, [])

  const markSelectedMenuOption = (id: string) => {
    const options = menuItems.map(option => {
      option.selected = option.id === id;
      return option;
    })
    setMenuItems(options);
  }

  return (
    <div className="w-1/5 h-full p-6 flex flex-col gap-10">
      <h3 className="text-3xl font-bold">Settings</h3>
      <Accordion type="single" collapsible className="w-full">
        {Object.values(MenuAccordion).map((menuParent, index) => (
          <AccordionItem value={menuParent} key={index}>
            <AccordionTrigger>{firstLetterUppercase(menuParent)}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              {menuItems.filter(menuItem => menuItem.parent === menuParent).map((menuItem, index) => (
                <SideMenuOption
                  key={index}
                  Icon={menuItem.icon}
                  label={menuItem.label}
                  path={menuItem.path}
                  selected={menuItem.selected}
                  disabled={menuItem.disabled}
                  clicked={() => markSelectedMenuOption(menuItem.id)}
                />
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