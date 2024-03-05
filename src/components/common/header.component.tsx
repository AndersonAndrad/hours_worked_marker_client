import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

interface HeaderProps {
  title: string;
  pathNavigation?: string;
  children?: React.ReactNode
}

export function Header({ title, children, pathNavigation }: HeaderProps) {
  const navigate = useNavigate();

  const navigateTo = (path: string): void => {
    navigate(path);
  }

  return (
    <div className="flex flex-row items-center justify-between">
      <section className="flex flex-row gap-2 items-center">
        {pathNavigation &&
          <Button
            variant={'ghost'}
            onClick={() => navigateTo(pathNavigation)}
          >
            <MoveLeft />
          </Button>
        }
        <span className="text-3xl">{title}</span>
      </section>
      {children}
    </div>
  )
}