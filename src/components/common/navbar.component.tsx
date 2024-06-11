import { AuthenticationContext } from "@/contexts/authentication.context";
import { AvatarIcon } from "@radix-ui/react-icons";
import { useContext } from "react";

export function Navbar() {
  const { retrieveUser } = useContext(AuthenticationContext)

  const user = retrieveUser();

  return (
    <div className="flex flex-row justify-end items-center gap-5 p-2 border-b border-opacity-25 border-white">
      <div className="flex flex-col items-end">
        <span>{user?.name}</span>
        <span className="font-thin text-sm">{user?.email}</span>
      </div>

      <AvatarIcon width='40' height='40' />
    </div>
  )
}