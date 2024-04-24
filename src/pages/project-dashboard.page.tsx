import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { Container } from "@/components/common/container.component";
import { Main } from "@/components/common/main.component";
import { SideFilterDashboard } from "@/components/dashboard/side-filter.component";
import { faker } from '@faker-js/faker';
import { useEffect } from 'react';

export function ProjectDashboard() {
  const data = [];

  useEffect(() => {
    Array.from({ length: 12 }).forEach((_, index) => {
      data.push({
        name: `${index + 1}`,
        uv: faker.number.int({ max: 24 }),
        pv: faker.number.int({ max: 24 }),
        oc: faker.number.int({ max: 24 }),
        amt: faker.number.int({ max: 24 })
      })
    })
  }, [])

  return (
    <Container>
      <header className='flex flex-row items-center justify-between'>
        <span className="text-3xl">Dashboard</span>
        <SideFilterDashboard />
      </header>
      <Main>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            <Bar dataKey="oc" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
          </BarChart>
        </ResponsiveContainer>
      </Main>
    </Container>
  )
}