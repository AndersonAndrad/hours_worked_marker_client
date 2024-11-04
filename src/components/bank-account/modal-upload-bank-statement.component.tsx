import { Dialog, DialogContent, DialogFooter, DialogHeader } from "../ui/dialog";

import { BillApi } from "@/application/bill/bill.api";
import { Button } from "../ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Input } from "../ui/input";
import { useState } from "react";

interface Props {
  opened: boolean;
  onClose: () => void;
}

export function ModalUploadBankStatement(props: Props) {
  const billApi = new BillApi();

  const { opened, onClose } = props;

  const [file, setFile] = useState(null);

  const handleFileChange = (event: any): void => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (): Promise<void> => {
    await billApi.uploadCSV(file, '6708967fc47ccb9397f0c4ba').then(() => { });
  };

  return (
    <Dialog open={opened} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader className="font-bold">Register bank account</DialogHeader>
        <DialogDescription>Register a new bank account with basic information.</DialogDescription>
        <Input type="file" onChange={handleFileChange} />
        <DialogFooter>
          <Button onClick={() => handleSubmit()}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}