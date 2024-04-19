import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

import { Project } from "@/interfaces/project.interface";
import { useState } from "react";
import { Button } from "../ui/button";
import { DeleteProjectAlert } from "./delete-project-alert.component";
import { UpdateProject } from "./update-project.component";

interface MenuActionProject {
  project: Project;
  refresh: () => void;
}

export function MenuActionProject(props: MenuActionProject) {
  const { project, refresh } = props
  const [opennedDeleteProject, setOpennedDeleteProject] = useState<boolean>(false);
  const [opennedUpdateProject, setOpennedUpdateProject] = useState<boolean>(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem className="flex flex-row gap-2 items-center" onClick={() => setOpennedUpdateProject(true)}>
              <Pencil />
              <span>Update</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-row gap-2 items-center" onClick={() => setOpennedDeleteProject(true)}>
              <Trash2 />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteProjectAlert project={project} opened={opennedDeleteProject} onClose={() => { setOpennedDeleteProject(false); refresh() }} />
      <UpdateProject project={project} opened={opennedUpdateProject} onClose={() => { setOpennedUpdateProject(false); refresh() }}></UpdateProject>
    </>
  )
}

