import { useEffect, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader } from "../ui/dialog";

import { ProjectApi } from "@/application/project/project.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Project } from "@/interfaces/project.interface";

interface UpdateProjectProps {
  project: Project;
  opened: boolean;
  onClose: () => void;
}

export function UpdateProject(props: UpdateProjectProps) {
  const projectApi = new ProjectApi();
  const { opened, onClose, project } = props;

  const [name, setName] = useState<string>('')
  const [hoursPrice, setHoursPrice] = useState<number>(0)

  useEffect(() => {
    setName(project.name);
    setHoursPrice(project.hoursPrice);
  }, [project])

  const updateProject = async () => {
    await projectApi.update(project._id, {
      name,
      hoursPrice
    }).then(() => onClose())
  }

  return (
    <Dialog open={opened} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader className="font-bold">Update project</DialogHeader>
        <DialogDescription>Update the project with basic information.</DialogDescription>
        <div className="flex flex-row gap-3">
          <section className="flex flex-col gap-2">
            <label htmlFor="project-name">Project name</label>
            <Input
              id="project-name"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </section>

          <section className="flex flex-col gap-2">
            <label htmlFor="project-price-hour">Price per hour</label>
            <Input
              id="project-price-hour"
              type="number"
              onChange={(event) => setHoursPrice(Number(event.target.value))}
              value={hoursPrice}
            />
          </section>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant={'secondary'}>Cancel</Button>
          </DialogClose>
          <DialogClose>
            <Button onClick={() => updateProject()}>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}