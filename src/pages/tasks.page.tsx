import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';

import { CardComponent } from '@/components/common/card.component';
import { Container } from '@/components/common/container.component';
import { Header } from '@/components/common/header.component';
import { Main } from '@/components/common/main.component';
import serverApi from "@/infra/api/server.api";
import { Project } from '@/interfaces/project.interface';
import { useNavigate } from 'react-router-dom';

export function TasksPage() {
    const [projects, setProjects] = useState<Project[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        loadProjects()
    }, []);

    const loadProjects = async () => {
        const { data } = await serverApi.get('project/find-all')
        const { items } = data as { items: Project[] }
        setProjects(items)
    }

    const navigateToProject = (project: Project) => {
        navigate('/project', { state: { project } })
    }

    return (
        <Container>
            <Header title='Tasks' />
            <Main>
                <div className='grid grid-cols-3 gap-2'>
                    {
                        projects && projects.map(project => (
                            <CardComponent key={project._id}>
                                <Card className='cursor-pointer'>
                                    <CardHeader onClick={() => { navigateToProject(project) }}>
                                        <CardTitle>{project.name}</CardTitle>
                                    </CardHeader>
                                </Card>
                            </CardComponent>
                        ))
                    }
                </div>
            </Main>
        </Container>
    );
}
