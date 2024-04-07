interface CardProps {
  children: React.ReactNode
}

export function CardComponent({ children }: CardProps) {
  return (
    <div className="p-4 rounded-sm h-full flex-grow'">
      {children}
    </div>
  )
}