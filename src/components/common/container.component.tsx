interface ContainerProps {
  children: React.ReactNode
}

export function Container({ children }: ContainerProps) {
  return (
    <div className='flex flex-col gap-5 flex-grow h-full'>
      {children}
    </div>
  )
}