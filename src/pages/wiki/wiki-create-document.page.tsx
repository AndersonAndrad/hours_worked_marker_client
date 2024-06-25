import { Textarea } from '@/components/ui/textarea.tsx';
import { ConvertStringToHTML } from '@/components/wiki/convert-string-html.component.tsx';

export function WikiCreateDocumentPage() {
  const str: string = 'this is my wiki __italic__ ##test##';

  return (
    <div className="h-full flex flex-row gap-2">
      <div className="h-full w-1/2">
        <Textarea className="h-full"></Textarea>
      </div>
      <div className="h-full w-1/2">
        <ConvertStringToHTML str={str} />
      </div>
    </div>
  );
}
