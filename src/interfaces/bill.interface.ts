import { PaginatedRequest } from "./paginate.interface";

export interface BillFindAll extends PaginatedRequest { }

export interface Bill {
  _id: string;
  dueDate?: Date;
  paidDate?: Date;
  totalPaid?: number;
  observation?: string;
  description: string;
  parentPaid?: Bill;
  installmentValue?: number;
  code: string;
  totalValue: number;
  paidOut?: boolean;
  // @todo - implement account bank interface
  accountBank: any;
  client?: any /** @todo add client interface  */;
  provider?: any /** @todo add provider interface  */;
  // @todo - implement category interface
  category?: any;
  cashFlow: CashFlow;
}

export enum CashFlow {
  EXPENSES = 'expenses',
  INCOME = 'income',
}
