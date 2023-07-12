interface SectionTitleProps {
  title: string;
  subtitle: string;
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="font-sans text-4xl">{title}</h1>
      <h2 className="font-serif text-2xl italic text-slate-600">{subtitle}</h2>
    </div>
  );
}
