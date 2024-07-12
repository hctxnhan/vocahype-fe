import { Link } from 'wouter';

export function Synonym({
  synonymsList,
  title,
}: {
  synonymsList: string[];
  title: string;
}) {
  return (
    synonymsList.length > 0 && (
      <>
        <div>
          <p className="font-display font-bold">{title}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {synonymsList.map(synonym => (
              <Link key={synonym} href={`/words/${synonym}`}>
                <a className="text-blue-500 hover:underline">{synonym}</a>
              </Link>
            ))}
          </div>
        </div>
      </>
    )
  );
}
