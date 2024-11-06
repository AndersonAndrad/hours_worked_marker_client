import { MoreVertical, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

import { useState } from "react";
import { ModalUploadBankStatement } from "../bank-account/modal-upload-bank-statement.component";
import { Button } from "../ui/button";

interface MenuActionProps {
  refresh: () => void;
}

export function MenuActionBill(props: MenuActionProps) {
  const [uploadBill, setOpenUploadBill] = useState<boolean>(false);

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
            <DropdownMenuItem className="flex flex-row gap-2 items-center" onClick={() => setOpenUploadBill(true)}>
              <Trash2 />
              <span>Import bank statement</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <ModalUploadBankStatement opened={uploadBill} onClose={() => { setOpenUploadBill(false) }} />
    </>
  )
}