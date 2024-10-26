import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Container } from "@/components/common/container.component";
import { Main } from "@/components/common/main.component";

export function BankAccountPage() {

  const columns: string[] = [
    'Name',
    'Bank',
    'Currency',
  ]

  return (
    <Container>
      <header className='flex flex-row items-center justify-between'>
        <span className="text-3xl">Bank accounts</span>
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
          <TableBody></TableBody>
        </Table>
      </Main>
    </Container>
  )
}