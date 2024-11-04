import { Bill, BillFindAll } from "@/interfaces/bill.interface";

import { PaginatedResponse } from "@/interfaces/paginate.interface";
import { buildParamsFromObject } from "@/utils/http.utils";
import serverApi from "@/infra/api/server.api";
import { toast } from "sonner";

export class BillApi {
  private readonly BASE_URL: string = 'account-bank-month-history/upload-csv';
  private readonly BIll_BASE_URL: string = 'bill'

  findAll(filter: BillFindAll): Promise<PaginatedResponse<Bill>> {
    return new Promise((resolve, reject) => {
      serverApi
        .get(`${this.BIll_BASE_URL}${buildParamsFromObject(filter)}`)
        .then(({ data }) => {
          const { items, meta } = data as PaginatedResponse<Bill>;
          const paginatedResponse: PaginatedResponse<Bill> = {
            items,
            meta,
          };
          resolve(paginatedResponse);
        })
        .catch((error) => {
          toast('Error loading bills.', { description: error.message });
          reject(error);
        });
    });
  }

  uploadCSV(file: any, bankAccountId: string): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);

    return new Promise((resolve, reject) => {
      serverApi
        .post(`${this.BASE_URL}/${bankAccountId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
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
}