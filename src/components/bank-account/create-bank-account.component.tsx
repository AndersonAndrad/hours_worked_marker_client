import { BankAccount, Banks, TypeBankAccount } from "@/interfaces/bank-account.interface";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

import { BankAccountApi } from "@/application/bank-account/bank-account.api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface CreateOrUpdateProps {
  submitted: () => void;
}

export function CreateOrUpdateBankAccount({ submitted }: CreateOrUpdateProps) {
  const bankAccountApi = new BankAccountApi()

  /**
   * @todo implement icon
   */
  const banks: { label: string, value: string }[] = [
    { label: Banks.NUBANK, value: Banks.NUBANK.toLocaleLowerCase() }
  ];

  const submit = async () => {
    const props = form.getValues() as Omit<BankAccount, '_id'>;

    await bankAccountApi.create(props).then(() => submitted());

    form.reset();
  }

  const bankAccountSchema = z.object({
    name: z.string().min(2, { message: 'bank account must be at least 2 characters.' }),
    typeAccount: z.enum([TypeBankAccount.PF, TypeBankAccount.PJ]),
    accountNumber: z.string(),
    agencyNumber: z.string(),
    bank: z.string(),
    currency: z.number(),
    color: z.string()
  })

  const form = useForm<z.infer<typeof bankAccountSchema>>({
    resolver: zodResolver(bankAccountSchema),
    defaultValues: {
      name: '',
      accountNumber: '',
      agencyNumber: '',
      bank: '',
      color: '',
      currency: 0,
      typeAccount: TypeBankAccount.PF
    }
  })

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={'ghost'} className="flex flex-row gap-2">
          <PlusIcon /> New Bank account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="font-bold">Register bank account</DialogHeader>
        <DialogDescription>Register a new bank account with basic information.</DialogDescription>
        <div className="flex flex-col gap-3">
          <Form {...form}>
            {/* name */}
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Bank account name..." {...field} />
                </FormControl>
                <FormDescription>
                  It is name to identify your bank account
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} />

            <div className="flex items-center gap-2">
              <FormField control={form.control} name="accountNumber" render={({ field }) => (
                <FormItem>
                  <FormLabel>Account number</FormLabel>
                  <FormControl>
                    <Input placeholder="Account number..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="agencyNumber" render={({ field }) => (
                <FormItem>
                  <FormLabel>Agency number</FormLabel>
                  <FormControl>
                    <Input placeholder="Agency number..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="bank" render={({ field }) => (
              <FormItem>
                <FormLabel>Bank</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bank..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {banks.map(bank => (
                      <SelectItem value={bank.value}>{bank.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )} />
          </Form>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button onClick={async () => await submit()}>Submit</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}