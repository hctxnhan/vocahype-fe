import { Button } from '@/components/ui/button';
import {
  SpeakerLoudIcon,
  QuestionMarkCircledIcon,
  TriangleLeftIcon,
  TriangleRightIcon,
} from '@radix-ui/react-icons';
import { useMemo } from 'react';

interface ExampleProps {
  example: string;
  word: string;
}

function Example({ example, word }: ExampleProps) {
  const result = useMemo(() => {
    return example.replace(new RegExp(word, 'g'), `<strong>${word}</strong>`);
  }, [example, word]);
  return <p dangerouslySetInnerHTML={{ __html: result }} />;
}

export function Learn() {
  return (
    <div className="relative flex h-full flex-col gap-4">
      <div className="rounded-3xl bg-[url('https://static.theprint.in/wp-content/uploads/2022/04/Web_Photo_Editor-71-1024x576.jpg?compress=true')] bg-cover bg-no-repeat px-16 py-8 text-white">
        <div className="flex items-center gap-4">
          <div className="font-serif text-4xl font-black">SLAUGHTER</div>
          <Button variant={'ghost'} size="icon">
            <SpeakerLoudIcon width={20} height={20} />
          </Button>
        </div>
        <div className="font-sans font-normal">/ˈslɔː.tər/</div>
        <div className="flex items-center gap-2 font-display font-bold">
          <div>verb</div>
          <QuestionMarkCircledIcon width={18} height={18} />
        </div>
      </div>
      <div className="flex items-center justify-center gap-16 font-display text-sm font-semibold">
        <div className="flex items-center hover:cursor-pointer">
          <TriangleLeftIcon width={40} height={40} />
          <div>previous</div>
        </div>
        <div className="flex items-center hover:cursor-pointer">
          <div>next</div>
          <TriangleRightIcon width={40} height={40} />
        </div>
      </div>
      <div className="flex justify-center text-lg font-bold">
        the killing of many people cruelly and unfairly, especially in a war.
      </div>
      <div className="h-[180px] rounded-3xl bg-red-500 bg-[url('https://static.theprint.in/wp-content/uploads/2022/04/Web_Photo_Editor-71-1024x576.jpg?compress=true')] bg-cover bg-no-repeat"></div>
      <Example
        example="“Hardly anyone in the town escaped the slaughter when the rebels were
        defeated.”"
        word="slaughter"
      />
      <div className="absolute bottom-0 left-0 right-0 flex justify-between gap-4">
        <Button className="w-full rounded-3xl bg-slate-400 px-8 py-6 font-semibold">
          HARD
        </Button>
        <Button className="w-full rounded-3xl bg-slate-500 px-8 py-6 font-semibold">
          GOOD
        </Button>
        <Button className="w-full rounded-3xl bg-slate-600 px-8 py-6 font-semibold">
          EASY
        </Button>
      </div>
    </div>
  );
}
