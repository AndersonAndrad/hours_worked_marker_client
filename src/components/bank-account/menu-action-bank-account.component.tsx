import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { MoreVertical, Trash2 } from "lucide-react";

import { BankAccount } from "@/interfaces/bank-account.interface";
import { Button } from "../ui/button";
import { ConfirmDeleteBankAccount } from "./confirm-delete.component";
import { useState } from "react";

interface MenuActionProps {
  bankAccount: BankAccount;
  refresh: () => void;
}

export function MenuActionBankAccount(props: MenuActionProps) {
  const { bankAccount, refresh } = props;

  const [deleteOpened, setOpenDelete] = useState<boolean>(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem className="flex flex-row gap-2 items-center" onClick={() => setOpenDelete(true)}>
              <Trash2 />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDeleteBankAccount bankAccount={bankAccount} openend={deleteOpened} onClose={() => { setOpenDelete(false); refresh() }} />
    </>
  )
}