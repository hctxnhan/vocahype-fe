import { Link } from 'wouter';

import { Synonym as SynonymModel } from '@/api/model/Synonym';

export function Synonym({
  synonymsList,
  title,
}: {
  synonymsList: SynonymModel[];
  title: string;
}) {
  return (
    synonymsList.length > 0 && (
      <>
        <div>
          <p className="font-display font-bold">{title}</p>
          {synonymsList.map(synonym => (
            <Link key={synonym.id} href={`/words/${synonym.id}`}>
              <a className="text-blue-500 hover:underline">{synonym.synonym}</a>
            </Link>
          ))}
        </div>
      </>
    )
  );
}
