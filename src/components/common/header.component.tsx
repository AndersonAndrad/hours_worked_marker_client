interface HeaderProps {
  title: string;
  children?: React.ReactNode
}

export function Header({ title, children }: HeaderProps) {
  return (
    <div className="flex flex-row items-center justify-between">
      <span className="text-3xl">{title}</span>
      {children}
    </div>
  )
}