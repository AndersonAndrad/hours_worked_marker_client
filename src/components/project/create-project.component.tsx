import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "../ui/dialog";

import { ProjectApi } from "@/application/project/project.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateProject } from "@/interfaces/project.interface";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

interface CreateOrUpdateProps {
  subonLoadProjectsmitted: () => void;
}

export function CreateOrUpdateProject({ subonLoadProjectsmitted }: CreateOrUpdateProps) {
  const projectApi = new ProjectApi();

  const [name, setName] = useState<string>('')
  const [hoursPrice, setHoursPrice] = useState<number>(0)
  const [expectedHoursPerDay, setExpectedHoursPerDay] = useState<number>(0);

  const createOrUpdateProject = async () => {
    const project: CreateProject = { name, hoursPrice, expectedHoursPerDay }

    await projectApi.create(project).then(() => subonLoadProjectsmitted());
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className="flex flex-row gap-2">
          <PlusIcon /> New project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="font-bold">Register project</DialogHeader>
        <DialogDescription>Register a new project with basic information.</DialogDescription>
        <div className="flex flex-col gap-3">
          <section className="flex w-full flex-col gap-2">
            <label htmlFor="project-name">Project name</label>
            <Input
              id="project-name"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </section>

          <div className="grid grid-cols-2 gap-3">
            <section className="flex flex-col gap-2">
              <label htmlFor="project-price-hour">Price per hour</label>
              <Input
                id="project-price-hour"
                type="number"
                onChange={(event) => setHoursPrice(Number(event.target.value))}
                value={hoursPrice}
              />
            </section>
            <section className="flex flex-col gap-2">
              <label htmlFor="expected-hours-per-day">Expected hours per day</label>
              <Input
                id="expected-hours-per-day"
                type="number"
                onChange={(event) => setExpectedHoursPerDay(Number(event.target.value))}
                value={expectedHoursPerDay}
              />
            </section>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant={'secondary'}>Cancel</Button>
          </DialogClose>
          <DialogClose>
            <Button id="button-submit-project" onClick={() => createOrUpdateProject()}>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}