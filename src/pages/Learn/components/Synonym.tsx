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
      <span className='flex text-sm'>
        <p>{title}</p>
        <span className="ml-4 flex flex-wrap gap-2 italic">
          {synonymsList.map(synonym => (
            <Link key={synonym} href={`/words/${synonym}`}>
              <a className="text-primary hover:underline">{synonym}</a>
            </Link>
          ))}
        </span>
      </span>
    )
  );
}
