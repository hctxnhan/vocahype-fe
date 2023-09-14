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
    <div>
      <div className="flex items-center justify-between border-b border-solid border-gray-200 px-8 py-4 text-sm last:border-b-0">
        <div className="font-semibold text-slate-400">RECENT SEARCH</div>
        {!!history.length && (
          <div
            onClick={onRemoveAll}
            className="font-dinRound text-red-700 hover:cursor-pointer"
          >
            Remove all
          </div>
        )}
      </div>
      {!!history.length && (
        <div className="max-h-[500px] overflow-auto">
          {history?.map(history => (
            <div
              onClick={onClickWord.bind(null, history)}
              className=" border-b border-solid border-gray-200 px-[32px]  py-4 text-sm text-slate-800 last:border-b-0 hover:cursor-pointer hover:bg-slate-100 hover:last:rounded-b-lg"
            >
              {history}
            </div>
          ))}
        </div>
      )}
    </div>
  ) : null;
}
