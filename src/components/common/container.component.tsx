interface ContainerProps {
  children: React.ReactNode
}

export function Container({ children }: ContainerProps) {
  return (
    <div className='flex flex-col gap-5 h-full'>
      {children}
    </div>
  )
}