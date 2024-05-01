import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetTrigger } from "../ui/sheet";

import { ProjectApi } from "@/application/project/project.api";
import { Project } from "@/interfaces/project.interface";
import { Filter as FilterIcon } from "lucide-react";
import { Button } from "../ui/button";

export interface FilterSideDashboard {
  project?: Project
}
interface SideFilterDashboardProps {
  filter: (filter: FilterSideDashboard) => void;
}

export function SideFilterDashboard({ filter }: SideFilterDashboardProps) {
  const projectApi = new ProjectApi();

  const [projects, setProjects] = useState<Project[]>([]);

  const [project, setProject] = useState<Project | undefined>(undefined);

  useEffect(() => {
    initProjects();
  }, [])

  const initProjects = async () => {
    await projectApi.findAll().then(({ items }) => {
      setProjects(items);
    })
  }

  const submit = () => {
    const finalFilter: FilterSideDashboard = {}

    if (project) finalFilter['project'] = project

    filter(finalFilter);
  }

  const handleStringToInt = (projectId: string) => {
    const project = projects.find(project => project._id === projectId)
    setProject(project)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button><FilterIcon /></Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between">
        <div className="py-4">
          <Select onValueChange={handleStringToInt}>
            <SelectTrigger id="projects">
              <SelectValue placeholder='Select' />
            </SelectTrigger>
            <SelectContent position="popper">
              {projects.map(project => {
                return (
                  <SelectItem key={project._id} value={project._id} className="cursor-pointer">
                    {project.name}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
        <SheetFooter className="mt-auto">
          <SheetClose>
            <Button onClick={() => submit()}>Filter</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}