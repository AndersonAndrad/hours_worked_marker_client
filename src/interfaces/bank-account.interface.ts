export interface BankAccount {
  _id: string;
  name: string;
  currency: number;
  accountNumber: string;
  agencyNumber: string;
  typeAccount: TypeBankAccount;
  disabled: boolean;
  bank: string;
  color: string;
}

export interface MonthHistory {
  _id: string;
  month: Date;
  currency: number;
  bills: Bill[];
  accountBank: BankAccount;
}

export interface Bill {
  identificator: string;
  currency: number;
  description: string;
}

export enum TypeBankAccount {
  PJ = 'pessoa_juridica',
  PF = 'pessoa_fisica',
}
