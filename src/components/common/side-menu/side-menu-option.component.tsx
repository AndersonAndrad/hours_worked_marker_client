import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { firstLetterUppercase } from "@/utils/string.utils";
import { useNavigate } from "react-router-dom";

interface SideMenuOptionProps {
  Icon?: LucideIcon;
  label: string;
  selected: boolean;
  disabled: boolean;
  path: string;
  clicked: () => void;
}

export function SideMenuOption({ Icon, label, selected = false, disabled = false, path, clicked }: SideMenuOptionProps) {
  const navigate = useNavigate();

  const checkVariantButton = () => {
    return selected ? 'secondary' : 'default'
  }

  const navigateTo = (): void => {
    navigate(path)
    clicked();
  }

  return (
    <div>
      <Button
        variant={checkVariantButton()}
        disabled={disabled} onClick={() => navigateTo()}
        className="flex flex-row gap-2 items-center w-full justify-start"
      >
        {Icon && <Icon />}
        {firstLetterUppercase(label)}
      </Button>
    </div>
  )
}