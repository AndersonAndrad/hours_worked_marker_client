import { BankAccount } from '@/interfaces/bank-account.interface';
import { PaginatedResponse } from "@/interfaces/paginate.interface";
import { buildParamsFromObject } from '@/utils/http.utils';
import serverApi from '@/infra/api/server.api';
import { toast } from 'sonner';

export class BankAccountApi {
  private readonly BASE_URL: string = 'account-bank'

  delete(bankAccountId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      serverApi
        .delete(`${this.BASE_URL}/${bankAccountId}`)
        .then(() => {
          toast('Bank account deleted successfully.');
          resolve();
        })
        .catch((error) => {
          toast('An error occurred while trying to delete the bank account.', { description: error.message });
          reject(error);
        });
    });
  }

  create(props: Omit<BankAccount, '_id'>): Promise<void> {
    return new Promise((resolve, reject) => {
      serverApi
        .post(`${this.BASE_URL}`, props)
        .then(() => {
          toast('Bank account created successfully.');
          resolve();
        })
        .catch((error) => {
          toast('An error occurred while trying to create the bank account.', { description: error.message });
          reject(error);
        });
    });
  }

  /**
   * @todo implement filter interface 
   */
  findAll(filter?: any): Promise<PaginatedResponse<any>> {
    return new Promise((resolve, reject) => {
      serverApi
        .get(`${this.BASE_URL}${buildParamsFromObject(filter)}`)
        .then(({ data }) => {
          const { items, meta } = data as PaginatedResponse<BankAccount>;
          const paginatedResponse: PaginatedResponse<BankAccount> = {
            items,
            meta,
          };
          resolve(paginatedResponse);
        })
        .catch((error) => {
          toast('Error loading bank accounts.', { description: error.message });
          reject(error);
        });
    });
  }
}