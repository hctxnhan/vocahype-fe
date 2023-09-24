import { APIResponse } from "@/api/api-definition/get-word-list";
import { getLearnWordList } from "@/api/words/learnWord";
import { FillParent } from "@/components/layout/FillParent/FillParent";
import { Loading } from "@/components/layout/Loading/Loading";
import { WheelEvent, useEffect, useState } from "react";
import useSWR from "swr";
import { WordItem } from "./components/WordItem";

export function WordList () {

  const [page] = useState(0)
  const [words, setWords] = useState<APIResponse['data']>([])


  const { data, isLoading, isValidating } = useSWR(
    ['/words/learn', page],
    ([, page]) =>
      getLearnWordList({ page })
  );

  const handleScroll = (event: WheelEvent) => {
    const container = event.currentTarget;
    const scrollAmount = event.deltaY;
    container.scrollTo({
      top: 0,
      left: container.scrollLeft + scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleLearnWord = (id: string) => {
    setWords(words.filter(item => item.attributes.id != id))
  }

  useEffect(() => {
    if (data) {
      setWords(data.data)
    }
  }, [data])

  if (isLoading || isValidating)
    return (
      <FillParent>
        <Loading />
      </FillParent>
    );

  if (!words) return <div>Something went wrong</div>;

  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="flex flex-col gap-2">
        <div className="text-sky-700 text-[32px] font-bold leading-normal">Keep up the good work, Nhan!</div>
        <div className="text-lg text-slate-600">You have 10 words in progress today, 3 words have due and 3 more words to learn</div>
      </div>
      <div onWheel={handleScroll} className="flex gap-2 overflow-auto">
        {words.length ?
          words?.map(word => <WordItem onLearnWord={handleLearnWord} data={word} key={word.id} />)
          : <div className="w-full text-center h-[350px]">Not data display</div>}
      </div>
    </div>
  )
}
