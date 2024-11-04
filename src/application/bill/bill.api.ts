import serverApi from "@/infra/api/server.api";
import { toast } from "sonner";

export class BillApi {
  private readonly BASE_URL: string = 'account-bank-month-history/upload-csv';

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