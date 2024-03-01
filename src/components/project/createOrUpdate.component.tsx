import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "../ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { serverApi } from "@/infra/api/server.api";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CreateOrUpdateProps {
  subonLoadProjectsmitted: () => void;
}

export function CreateOrUpdateProject({ subonLoadProjectsmitted }: CreateOrUpdateProps) {
  const [name, setName] = useState<string>('')
  const [hourPrice, setHourPrice] = useState<number>(0)

  const createOrUpdateProject = () => {
    serverApi.post('/projects', { name, hourPrice })
      .then(() => {
        toast('Project created with success');
        subonLoadProjectsmitted();
      }).catch(error => {
        toast('Not is possible save Project', { description: error.message });
      })
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
              onChange={(event) => setHourPrice(Number(event.target.value))}
              value={hourPrice}
            />
          </section>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant={'secondary'}>Cancel</Button>
          </DialogClose>
          <DialogClose>
            <Button onClick={() => createOrUpdateProject()}>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}