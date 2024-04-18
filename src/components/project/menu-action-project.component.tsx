import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

import { Button } from "../ui/button";
import { Project } from "@/interfaces/project.interface";
import { ProjectApi } from "@/application/project/project.api";
import { useState } from "react";

interface MenuActionProject {
  project: Project;
  refresh: () => void;
}

export function MenuActionProject(props: MenuActionProject) {
  const { project, refresh } = props
  const [opennedDeleteProject, setOpennedDeleteProject] = useState<boolean>(false);

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
            <DropdownMenuItem className="flex flex-row gap-2 items-center">
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

      <DeleteProject project={project} opened={opennedDeleteProject} onClose={() => { setOpennedDeleteProject(false); refresh() }} />
    </>
  )
}

interface DeleteProjectProps {
  project: Project,
  opened: boolean,
  onClose: () => void;
}

function DeleteProject(props: DeleteProjectProps) {
  const projectApi = new ProjectApi();

  const { project, opened, onClose } = props;

  const deleteProject = async (): Promise<void> => {
    await projectApi.delete(project._id).then(() => {
      onClose();
    })
  }

  return (
    <AlertDialog open={opened} onOpenChange={() => onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle><span className="text-base font-bold">Attention !</span></AlertDialogTitle>
          <AlertDialogDescription>Would you like to delete the project? <span className="font-bold">{project.name}</span></AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant={'ghost'} onClick={() => onClose()}>Cancel</Button>
          <Button variant={'destructive'} onClick={() => deleteProject()} className="flex flex-row gap-2">
            <Trash2 />
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}