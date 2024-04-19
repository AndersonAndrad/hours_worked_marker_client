import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEffect, useState } from 'react';

import { ProjectApi } from '@/application/project/project.api';
import { Container } from '@/components/common/container.component';
import { FooterPagination } from '@/components/common/footer-pagination.component';
import { Main } from '@/components/common/main.component';
import { CreateOrUpdateProject } from '@/components/project/createOrUpdate.component';
import { MenuActionProject } from '@/components/project/menu-action-project.component';
import { Project } from '@/interfaces/project.interface';
import { maskMoney } from '@/utils/currency.utils';

export function ProjectsPage() {
  const projectApi = new ProjectApi();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => { loadProjects() }, []);

  const loadProjects = async () => {
    await projectApi.findAll().then(({ items }) => {
      setProjects(items)
    })
  }

  const columns: string[] = ['Name', 'Price per hour', 'Number of tasks', '']

  return (
    <Container>
      <header className='flex flex-row items-center justify-between'>
        <span className="text-3xl">Projects</span>
        <CreateOrUpdateProject subonLoadProjectsmitted={loadProjects} />
      </header>
      <Main>
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
                <TableCell>{maskMoney(project.hoursPrice)}</TableCell>
                <TableCell>{project.tasks && project.tasks.length}</TableCell>
                <TableCell><MenuActionProject project={project} refresh={() => loadProjects()} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Main>
      <FooterPagination />
    </Container>
  )
}

