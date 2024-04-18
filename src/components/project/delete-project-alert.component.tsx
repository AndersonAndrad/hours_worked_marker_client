import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";

import { Button } from "../ui/button";
import { Project } from "@/interfaces/project.interface";
import { ProjectApi } from "@/application/project/project.api";
import { Trash2 } from "lucide-react";

interface DeleteProjectProps {
  project: Project,
  opened: boolean,
  onClose: () => void;
}

export function DeleteProjectAlert(props: DeleteProjectProps) {
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