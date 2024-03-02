interface CardProps {
  children: React.ReactNode
}

export function CardComponent({ children }: CardProps) {
  return (
    <div className="className=' border-solid border-y border-x border-opacity-25 border-white p-4 mt-9 rounded-sm flex-grow h-full'">
      {children}
    </div>
  )
}