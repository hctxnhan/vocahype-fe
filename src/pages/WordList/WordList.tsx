import { APIResponse, Data } from "@/api/api-definition/get-word-list";
import { FillParent } from "@/components/layout/FillParent/FillParent";
import { Loading } from "@/components/layout/Loading/Loading";
import { fetcher } from "@/lib/configs/axios";
import { useAuthState } from "@/lib/hooks/firebase/auth/useAuthState";
import { WheelEvent } from "react";
import useSWRInfinite from "swr/infinite";
import { WordItem } from "./components/WordItem";


export function WordList () {

  const { user } = useAuthState();

  const {
    data,
    mutate,
    size,
    setSize,
    isLoading,
  } = useSWRInfinite<APIResponse>(
    (index) => {
      return `/words/learn?page%5Boffset%5D=${index}&page%5Blimit%5D=10`
    },
    fetcher
  );

  const words: Data[] = data ? [].concat(...data?.flatMap((item: any) => item?.data)) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.length;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1].data?.length < 5);

  const handleScroll = (event: WheelEvent) => {
    const container = event.currentTarget;
    const scrollAmount = event.deltaY;
    container.scrollTo({
      top: 0,
      left: container.scrollLeft + scrollAmount
    });
    if (container.scrollLeft + container.clientWidth + 200 >= container.scrollWidth && !isLoadingMore && isReachingEnd) {
      setSize(size + 1)
    }
  };

  const handleLearnWord = (id: string, index: number) => {
    console.error(id)
    console.error(index)
    mutate();
  }

  if (isLoading && size === 1)
    return (
      <FillParent>
        <Loading />
      </FillParent>
    );

  if (!words) return <div>Something went wrong</div>;

  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="flex flex-col gap-2">
        <div className="text-sky-700 text-[32px] font-bold leading-normal">Keep up the good work, {user?.displayName}!</div>
        <div className="text-lg text-slate-600">You have 10 words in progress today, 3 words have due and 3 more words to learn</div>
      </div>
      <div onWheel={handleScroll} className="flex gap-2 overflow-auto">
        {words.length ?
          words.map((word, index) => <WordItem onLearnWord={handleLearnWord.bind(null, word.attributes.id, index)} data={word} key={word.id} />)
          : <div className="w-full text-center h-[350px]">No data display</div>}
      </div>
    </div>
  )
}
