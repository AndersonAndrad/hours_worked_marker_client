import { Container } from "@/components/common/container.component";
import { Main } from "@/components/common/main.component";
import { SideFilterDashboard } from "@/components/dashboard/side-filter.component";

export function ProjectDashboard() {
  return (
    <Container>
      <header className='flex flex-row items-center justify-between'>
        <span className="text-3xl">Dashboard</span>
        <SideFilterDashboard />
      </header>
      <Main>
        <div>
          dashboard
        </div>
      </Main>
    </Container>
  )
}