import { AuthenticationContext } from "@/contexts/authentication.context";
import { AvatarIcon } from "@radix-ui/react-icons";
import { useContext } from "react";

export function Navbar() {
  const { retrieveUser } = useContext(AuthenticationContext)

  const user = retrieveUser();

  return (
    <div className="flex flex-row justify-end items-center gap-5 p-2 border-b border-opacity-25 border-white">
      <span>{user?.name}</span>

      <AvatarIcon width='40' height='40' />
    </div>
  )
}