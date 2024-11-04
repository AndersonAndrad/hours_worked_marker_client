import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";

import { Bill } from "@/interfaces/bill.interface";
import { BillApi } from "@/application/bill/bill.api";
import { Container } from "@/components/common/container.component";
import { Main } from "@/components/common/main.component";
import { Meta } from "@/interfaces/paginate.interface";
import { formatBillTextDynamic } from "@/utils/string.utils";
import { maskMoney } from "@/utils/currency.utils";

export function BillsPage() {
  const billsApi = new BillApi();

  const [meta, setMeta] = useState<Meta>({ quantityItems: 0, totalPages: 0 })
  const [bills, setBills] = useState<Bill[]>([])

  const retrieveBills = async () => {
    await billsApi.findAll({ page: 1, itemsPerPage: 10 }).then(({ items, meta }) => {
      setBills(items);
      setMeta(meta);
    });
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
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious>1</PaginationPrevious>
              </PaginationItem>

              {
                Array.from({ length: meta.totalPages }).map((_, index) => (
                  <PaginationItem>
                    <PaginationLink>{index + 1}</PaginationLink>
                  </PaginationItem>
                ))
              }

              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>

              <PaginationItem>
                <PaginationNext>1</PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </footer>
      </Main>
    </Container>
  );
}