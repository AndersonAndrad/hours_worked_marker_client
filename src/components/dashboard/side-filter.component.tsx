import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

import { Filter } from "lucide-react";
import { Button } from "../ui/button";

export function SideFilterDashboard() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button><Filter /></Button>
      </SheetTrigger>
      <SheetContent>
        hello
      </SheetContent>
    </Sheet>
  )
}