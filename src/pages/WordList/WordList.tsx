import { APIResponse } from "@/api/api-definition/get-word";
import { getLearnWordList, learnWord } from "@/api/words/learnWord";
import { FillParent } from "@/components/layout/FillParent/FillParent";
import { Loading } from "@/components/layout/Loading/Loading";
import { useAsyncAction } from "@/lib/hooks/useAsyncAction";
import { useToast } from "@/lib/hooks/useToast";
import { WordLevel } from "@/lib/interfaces/word";
import { WheelEvent, useEffect, useState } from "react";
import useSWR from "swr";
import { WordItem } from "./components/WordItem";

export function WordList () {

	const toast = useToast();
	const [page] = useState(0)
	const [words, setWords] = useState<APIResponse['data']>([])


	const { data, isLoading, isValidating } = useSWR(
		['/words/learn', page],
		([, page]) =>
			getLearnWordList({ page })
	);
	const { start } = useAsyncAction(learnWord);

	const handleClickLearn =
		(level: WordLevel, wordId: string, word: string) => () => {
			start([wordId, level], {
				onSuccess: () => {
					toast.success({ title: `Word "${word}" is added to ${level.toUpperCase()} list` });
					setWords(words.filter(item => item.attributes.id != wordId))
				},
				onError: () => {
					toast.error({ title: `Failed to add "${word}" to ${level} list` });
				},
			});
		};

	const handleScroll = (event: WheelEvent) => {
		const container = event.currentTarget;
		const scrollAmount = event.deltaY;
		container.scrollTo({
			top: 0,
			left: container.scrollLeft + scrollAmount,
			behavior: 'smooth'
		});
	};

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
					words?.map(word => <WordItem onLearn={
						handleClickLearn('normal', word.attributes.id, word.attributes.word)
					} onIgnore={
						handleClickLearn('ignore', word.attributes.id, word.attributes.word)
					} word={word.attributes.word} key={word.id} />)
					: <div className="w-full text-center h-[350px]">Not data display</div>}
			</div>
		</div>
	)
}
