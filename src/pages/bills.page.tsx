import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bill, BillFindAll } from "@/interfaces/bill.interface";
import { useEffect, useState } from "react";

import { BillApi } from "@/application/bill/bill.api";
import { MenuActionBill } from "@/components/bill/menu-action.component";
import { Container } from "@/components/common/container.component";
import { Main } from "@/components/common/main.component";
import { Paginate } from "@/components/common/paginate.component";
import { Meta } from "@/interfaces/paginate.interface";
import { maskMoney } from "@/utils/currency.utils";
import { formatBillTextDynamic } from "@/utils/string.utils";

export function BillsPage() {
  const billsApi = new BillApi();

  const [meta, setMeta] = useState<Meta>({ quantityItems: 0, totalPages: 0 })
  const [bills, setBills] = useState<Bill[]>([])
  const [filter, setFilter] = useState<BillFindAll>({ page: 1, itemsPerPage: 10 });

  const retrieveBills = async (billFilter?: BillFindAll) => {
    await billsApi.findAll(billFilter ?? filter).then(({ items, meta }) => {
      setBills(items);
      setMeta(meta);
    });
  }

  const changePage = async (page: number): Promise<void> => {
    setFilter({ ...filter, page });

    await retrieveBills({ ...filter, page });
  }

  useEffect(() => {
    retrieveBills();
  }, []);

  const columns: string[] = [
    'Description',
    'Total value',
    'Cash flow'
  ];

  return (
    <Container>
      <header className='flex flex-row items-center justify-between'>
        <span className="text-3xl">Bills</span>

        <MenuActionBill refresh={() => { }} />
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
            {
              bills.map(bill => (
                <TableRow key={bill._id}>
                  <TableCell>{formatBillTextDynamic(bill.description)}</TableCell>
                  <TableCell>{maskMoney(bill.totalValue)}</TableCell>
                  <TableCell>{bill.cashFlow}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        <footer>
          <Paginate totalPages={meta.totalPages} onChangePage={(page) => changePage(page)} />
        </footer>
      </Main>
    </Container>
  );
}