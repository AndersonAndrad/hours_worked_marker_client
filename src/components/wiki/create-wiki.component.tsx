import { Button } from '@/components/ui/button.tsx';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CreateWiki() {
  const navigate = useNavigate();

  const navigateToCreateWiki = () => {
    navigate('create-document');
  };

  return (
    <Button variant="default" className="flex gap-1 items-center" onClick={navigateToCreateWiki}>
      <Plus />
      Document
    </Button>
  );
}
