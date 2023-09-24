
interface WordItemProps {
	word: string;
	onLearn: () => void
	onIgnore: () => void
}

export function WordItem ({ word, onLearn, onIgnore }: WordItemProps) {
	return (
		<div className="my-8 flex-grow-0 flex-shrink-0 basis-auto rounded-lg border-2 border-slate-300 w-[350px] h-[350px] p-4 flex flex-col justify-between">
			<div className="flex flex-col gap-1">
				<div className="text-sky-700 text-[32px] font-bold">{word}</div>
				<div className="text-rose-600 text-base font-bold">LEARNING</div>
				<div className="text-slate-400 text-sm font-bold">2 days overdue</div>
			</div>
			<div className="flex justify-between">
				<div onClick={onIgnore} className="text-rose-600 text-sm font-bold hover:cursor-pointer">IGNORE</div>
				<div className="text-slate-500 text-sm font-bold hover:cursor-pointer">NEXT WEEK</div>
				<div className="text-slate-500 text-sm font-bold hover:cursor-pointer">TOMORROW</div>
				<div onClick={onLearn} className="text-sky-600 text-sm font-bold hover:cursor-pointer">LEARN</div>
			</div>
		</div>
	)
}
