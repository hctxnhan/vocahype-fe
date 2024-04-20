interface RecentSearchProps {
  isOpen: boolean;
  history: string[];
  onRemoveAll: VoidFunction;
  onClickWord: (word: string) => void;
}

export function RecentSearch({
  isOpen,
  history,
  onRemoveAll,
  onClickWord,
}: RecentSearchProps) {
  return isOpen ? (
    <div className="absolute top-12 w-full rounded-lg border border-border bg-background shadow-2xl">
      <div className="flex items-center justify-between border-b border-border px-8 py-4 text-sm last:border-b-0">
        <div className="font-semibold">RECENT SEARCH</div>
        {!!history.length && (
          <div
            onClick={onRemoveAll}
            className="font-dinRound text-destructive hover:cursor-pointer"
          >
            Remove all
          </div>
        )}
      </div>
      {!!history.length && (
        <div className="max-h-[500px] overflow-auto">
          {history?.map(history => (
            <div
              key={history}
              onClick={onClickWord.bind(null, history)}
              className="border-b border-solid border-border px-8 py-4 text-sm last:border-b-0 hover:cursor-pointer hover:bg-accent hover:last:rounded-b-lg"
            >
              {history}
            </div>
          ))}
        </div>
      )}
    </div>
  ) : null;
}
