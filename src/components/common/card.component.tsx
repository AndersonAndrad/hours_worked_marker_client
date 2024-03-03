interface CardProps {
  children: React.ReactNode
}

export function CardComponent({ children }: CardProps) {
  return (
    <div className="border-solid border-y border-x border-opacity-25 border-white p-4 mt-9 rounded-sm h-full flex-grow'">
      {children}
    </div>
  )
}