import { useEffect, useState } from 'react';

import { CardComponent } from '@/components/common/card.component';
import { serverApi } from '@/infra/api/server.api.ts';
import { Project } from '@/interfaces/project.interface';
import { useNavigate } from 'react-router-dom';

export function TasksPage() {
    const [projects, setProjects] = useState<Project[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        serverApi.get('/projects').then(({ data }) => {
            const { items } = JSON.parse(data) as { items: Project[] };

            setProjects(items);
        });
    }, []);

    const navigateToProject = (project: Project) => {
        navigate('/project', { state: { project } })
    }

    return (
        <div className='flex flex-col gap-5'>
            <header className='flex flex-row items-center justify-between'>
                <span className="text-3xl">Tasks</span>
            </header>
            <main className='grid grid-cols-3 gap-2'>
                {
                    projects.map(project => (
                        <CardComponent key={project._id}>
                            <div
                                className='flex flex-row justify-between cursor-pointer'
                                onClick={() => { navigateToProject(project) }}
                            >
                                <span className='text-base font-bold'>{project.name}</span>
                                <span className='text-sm'>Number of tasks {project.tasks.length}</span>
                            </div>
                        </CardComponent>
                    ))
                }
            </main>
        </div>
    );
}
