import { Container } from '@/components/common/container.component.tsx';
import { Main } from '@/components/common/main.component.tsx';
import { Card } from '@/components/ui/card.tsx';
import { Wiki } from '@/interfaces/wiki.interface.ts';
import { CreateWiki } from '@/components/wiki/create-wiki.component.tsx';

export function WikiPage() {


  const wikis: Wiki[] = [];

  return (
    <Container>
      <header className="flex justify-between">
        <span className="text-3xl">All wikis</span>
        <CreateWiki />
      </header>
      <Main>
        <div className="grid grid-cols-4">
          {
            wikis.map(wiki => (
              <Card className="p-5">
                {wiki.title}
              </Card>
            ))
          }
        </div>
      </Main>
    </Container>
  );
}
