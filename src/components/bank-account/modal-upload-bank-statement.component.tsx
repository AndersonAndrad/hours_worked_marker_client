import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

import { BankAccountApi } from "@/application/bank-account/bank-account.api";
import { BillApi } from "@/application/bill/bill.api";
import { BankAccount } from "@/interfaces/bank-account.interface";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface Props {
  opened: boolean;
  onClose: () => void;
}

export function ModalUploadBankStatement(props: Props) {
  const billApi = new BillApi();
  const bankAccountApi = new BankAccountApi();

  const { opened, onClose } = props;

  const [file, setFile] = useState(null);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [bankAccount, setBankAccount] = useState<string>('');

  const retriveBankAccounts = async (): Promise<void> => {
    await bankAccountApi.findAll().then(({ items }) => {
      setBankAccounts(items);
    });
  }

  const handleFileChange = (event: any): void => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (): Promise<void> => {
    if (!bankAccount.length) return;
    await billApi.uploadCSV(file, bankAccount).then(() => { });
  };

  useEffect(() => {
    retriveBankAccounts();
  }, [])

  return (
    <Dialog open={opened} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader className="font-bold">Register bank account</DialogHeader>
        <DialogDescription>Register a new bank account with basic information.</DialogDescription>
        <div className="flex flex-col gap-3">
          <Select onValueChange={setBankAccount}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Bank account" />
            </SelectTrigger>
            <SelectContent>
              {bankAccounts.map(bankAccount => (
                <SelectItem className="cursor-pointer" onClick={() => console.log({ value: bankAccount._id })} value={bankAccount._id}>
                  {bankAccount.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input type="file" onChange={handleFileChange} />
        </div>
        <DialogFooter>
          <Button onClick={() => handleSubmit()}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}