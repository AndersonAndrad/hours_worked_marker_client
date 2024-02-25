import { Button } from '@/components/ui/button.tsx';
import { Trash } from 'lucide-react';

export function SubTasksComponent() {
  return (
    <div className='p-2 flex flex-col gap-4 border-solid border-orange-500 bg-green-500'>
      <div className="flex flex-row justify-end gap-2">
        {/* <CUSubTask task={task}></CUSubTask> */}
      </div>
      <header className="flex flex-row justify-between">
        <span className="font-bold text-2xl">work</span>
        <span>Oct 22, 2023, 9:00:00 AM</span>
      </header>
      <main>
        <ul>
          <li className='flex flex-row items-center justify-between'>
            <span>My subtask here</span>
            <Button><Trash /></Button>
          </li>
        </ul>
      </main>
    </div>
  )
}