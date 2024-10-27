import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";

import { BankAccount } from "@/interfaces/bank-account.interface";
import { BankAccountApi } from "@/application/bank-account/bank-account.api";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

interface DeleteProps {
  bankAccount: BankAccount;
  openend: boolean;
  onClose: () => void;
}

export function ConfirmDeleteBankAccount(props: DeleteProps) {
  const bankAccountApi = new BankAccountApi();

  const { bankAccount, onClose, openend } = props;

  const deleteBankAccount = async (): Promise<void> => {
    await bankAccountApi.delete(bankAccount._id).then(() => onClose())
  }

  return (
    <AlertDialog open={openend} onOpenChange={() => onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <span className="text-base font-bold">Attention !</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Would you like to delete the bank account? <span className="font-bold">{bankAccount.name}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant={'ghost'} onClick={() => onClose()}>Cancel</Button>
          <Button variant={'destructive'} onClick={async () => await deleteBankAccount()} className="flex flex-row gap-2">
            <Trash2 />
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}