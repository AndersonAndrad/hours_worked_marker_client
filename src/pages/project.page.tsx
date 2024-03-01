import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEffect, useState } from 'react';

import { CreateOrUpdateProject } from '@/components/project/createOrUpdate.component';
import { serverApi } from '@/infra/api/server.api';
import { Project } from '@/interfaces/project.interface';
import { maskMoney } from '@/utils/currency.utils';
import { toast } from 'sonner';

export function ProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => { loadProjects() }, []);

  const loadProjects = () => {
    serverApi.get('projects')
      .then(({ data }) => {
        const { items } = JSON.parse(data) as { items: Project[] }
        setProjects(items);
      })
      .catch((error) => {
        toast('Error to load projects', { description: error.message })
      })
  }

  const columns: string[] = ['Name', 'Price per hour', 'Number of tasks']

  return (
    <div className='flex flex-col gap-5'>
      <header className='flex flex-row items-center justify-between'>
        <span className="text-3xl">Projects</span>
        <CreateOrUpdateProject subonLoadProjectsmitted={loadProjects} />
      </header>
      <main>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index}>{column}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects && projects.map(project => (
              <TableRow key={project._id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{maskMoney(project.hourPrice)}</TableCell>
                <TableCell>{project.tasks.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  )
}