import { CalendarIcon, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

import { Filter as TaskFilter } from "@/interfaces/task.interface";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Switch } from "../ui/switch";

interface FilterProps {
  filter: (filter: TaskFilter) => void
  lastFilter: TaskFilter
}

export function FilterTaskProject({ filter, lastFilter }: FilterProps) {
  const [date, setDate] = useState<DateRange | undefined>(undefined)
  const [onlyScheduled, setOnlyScheduled] = useState<boolean>(false);

  const submit = () => {
    let finalFilter: TaskFilter = {
      start: date?.from || new Date(),
      finish: date?.to || new Date(),
    }

    if (onlyScheduled) {
      finalFilter = {
        scheduled: onlyScheduled
      }
    }

    filter(finalFilter);
  }

  useEffect(() => {
    if (lastFilter?.start && lastFilter?.finish) {
      setDate({
        from: lastFilter.start,
        to: lastFilter.finish
      });
    }

    if (lastFilter?.scheduled) {
      setOnlyScheduled(lastFilter.scheduled)
    }
  }, [lastFilter])

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
          {/* Calendar */}
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

          {/* Show schedule */}
          <div className="flex flex-row items-center gap-2">
            <Switch id="only-scheduled" checked={onlyScheduled} onCheckedChange={(event) => setOnlyScheduled(event)} />
            <label htmlFor="only-scheduled" className="cursor-pointer">Show only tasks scheduled</label>
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