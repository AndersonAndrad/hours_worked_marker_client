import { CalendarIcon, Filter } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";

interface FilterProps {
  filter: (date: { from: Date, to: Date }) => void
}

export function FilterTaskProject({ filter }: FilterProps) {
  const [date, setDate] = useState<DateRange | undefined>(undefined)

  const submit = () => {
    filter({ from: date?.from || new Date, to: date?.to || new Date() })
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'ghost'} ><Filter /></Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-3">
        <SheetHeader>
          <SheetTitle>Filter tasks</SheetTitle>
          <SheetDescription>
            You can filter tasks by this filters.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-3 w-full">
          <div className={cn("grid gap-2")}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <SheetFooter className="mt-auto">
          <SheetClose>
            <Button onClick={() => submit()}>Filter</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}