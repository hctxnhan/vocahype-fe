import { APIResponse } from "@/api/api-definition/get-word-list";
import { learnWord } from "@/api/words/learnWord";
import { Button } from "@/components/ui/button";
import { useAsyncAction } from "@/lib/hooks/useAsyncAction";
import { useToast } from "@/lib/hooks/useToast";
import { WordLevel } from "@/lib/interfaces/word";
import { useLocation } from "wouter";

interface WordItemProps {
  data: APIResponse['data'][0];
  onLearnWord: (id: string, index: number) => void
}

export function WordItem ({ data, onLearnWord }: WordItemProps) {
  const { attributes: {
    id,
    word
  } } = data

  const [, navigate] = useLocation();
  const { start } = useAsyncAction(learnWord);
  const toast = useToast();

  const handleClickLearnWord = () => {
    navigate(`/words/${id}`);
  }

  const handleLearn =
    (level: WordLevel) => () => {
      start([id, level], {
        onSuccess: () => {
          toast.success({ title: `Word "${word}" is added to ${level.toUpperCase()} list` });
          onLearnWord(id, 0);
        },
        onError: () => {
          toast.error({ title: `Failed to add "${word}" to ${level} list` });
        },
      });
    };

  return (
    <div className="my-8 flex-grow-0 flex-shrink-0 basis-auto rounded-lg border-2 border-slate-300 w-[350px] h-[350px] p-4 flex flex-col justify-between">
      <div className="flex flex-col gap-1">
        <div className="text-sky-700 text-[32px] font-bold">{word}</div>
        <div className="text-rose-600 text-base font-bold">LEARNING</div>
        <div className="text-slate-400 text-sm font-bold">2 days overdue</div>
      </div>
      <div className="flex justify-between">
        <Button variant={'link'} onClick={handleLearn('ignore')} className="text-rose-600 text-sm font-bold hover:cursor-pointer">IGNORE</Button>
        <Button variant={'link'} className="text-slate-500 text-sm font-bold hover:cursor-pointer">NEXT WEEK</Button>
        <Button variant={'link'} className="text-slate-500 text-sm font-bold hover:cursor-pointer">TOMORROW</Button>
        <Button variant={'link'} onClick={handleClickLearnWord} className="text-sky-600 text-sm font-bold hover:cursor-pointer">LEARN</Button>
      </div>
    </div>
  )
}
