import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";

import { BankAccount } from "@/interfaces/bank-account.interface";
import { BankAccountApi } from "@/application/bank-account/bank-account.api";
import { Container } from "@/components/common/container.component";
import { CreateOrUpdateBankAccount } from "@/components/bank-account/create-bank-account.component";
import { Main } from "@/components/common/main.component";

export function BankAccountPage() {
  const bankAccount = new BankAccountApi();

  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);

  useEffect(() => { loadBankAccount() }, []);

  const loadBankAccount = async () => {
    await bankAccount.findAll().then(({ items }) => {
      setBankAccounts(items);
    });
  }

  const columns: string[] = [
    'Name',
    'Bank',
    'Currency',
  ]

  return (
    <Container>
      <header className='flex flex-row items-center justify-between'>
        <span className="text-3xl">Bank accounts</span>
        <CreateOrUpdateBankAccount submitted={async () => await loadBankAccount()} />
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
            {bankAccounts.map(bankAccount => (
              <TableRow key={bankAccount._id}>
                <TableCell>{bankAccount.name}</TableCell>
                <TableCell>{bankAccount.bank}</TableCell>
                <TableCell>{bankAccount.currency}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Main>
    </Container>
  )
}