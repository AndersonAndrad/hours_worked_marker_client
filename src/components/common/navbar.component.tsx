import { AvatarIcon } from "@radix-ui/react-icons";

export function Navbar() {
  return (
    <div className="flex flex-row justify-end p-2 border-b border-opacity-25 border-white">
      <AvatarIcon width='40' height='40' />
    </div>
  )
}