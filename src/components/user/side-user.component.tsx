import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { useContext, useState } from "react";

import { AuthenticationContext } from "@/contexts/authentication.context";
import { Button } from "../ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const fakeAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy0FsTCj6xRx2VLCW2nwgz_DKCwbT01bM3PA&s'

export function SideUser() {
  const [countdownClipboard, setCountdownClipboard] = useState<boolean>(false);
  const { retrieveUser, singOut } = useContext(AuthenticationContext);
  const user = retrieveUser();

  const handleCopyUserHash = async () => {
    if (countdownClipboard) {
      toast('Copy to clipboard is counting down, wait to copy again');
      return;
    }

    await navigator.clipboard.writeText('copied2').then(() => {
      toast('User hash copied successfully');
      setCountdownClipboard(true);
    }).catch((error) => {
      toast(`Error when trying to copy user hash ${error.message}`)
    })

    setTimeout(() => { setCountdownClipboard(false) }, 5000);
  }

  const separateName = (): string => {
    return (user?.name ?? '').split(' ').map(char => char.toUpperCase()).join('');
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="p-3" disabled={!user}>
          <Avatar>
            <AvatarImage src={fakeAvatar} />
            <AvatarFallback>{separateName()}</AvatarFallback>
          </Avatar>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-col items-center">
          <div className="flex justify-center items-center">
            <Avatar className="w-24 h-24">
              <AvatarImage src={fakeAvatar} />
              <AvatarFallback>{separateName()}</AvatarFallback>
            </Avatar>
          </div>
          <SheetTitle>{user?.name}</SheetTitle>
          <SheetDescription>{user?.email}</SheetDescription>
          <SheetDescription className="flex flex-row gap-2 no-wrap items-center cursor-pointer" onClick={handleCopyUserHash}>
            <span >{user?.userHash} </span>
            <Copy />
          </SheetDescription>
        </SheetHeader>
        <div className="flex-grow flex items-end">
          <SheetClose asChild>
            <Button onClick={singOut} variant='destructive' className="w-full">Logout</Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}