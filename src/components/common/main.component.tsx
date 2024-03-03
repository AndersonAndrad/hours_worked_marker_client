interface MainProps {
  children: React.ReactNode
}

export function Main({ children }: MainProps) {
  return (
    <div className='flex-grow h-1 overflow-auto'>
      {children}
    </div>
  )
}