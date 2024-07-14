import { ScrollArea } from '@/components/ui/scroll-area';
import { MultiSelection } from './MultiSelection';
import { Selection } from './Selection';
import { Quiz, QuizType, SelectionQuiz } from './type';

interface QuizItemProps {
  quiz: Quiz;
  onChoose: (correct: boolean) => void;
}

export function QuizItem({ quiz, onChoose }: QuizItemProps) {
  let quizComponent = null;
  let mappedQuiz: Quiz = quiz;

  if (quiz.type === QuizType.DEFINITION_SINGLE_SELECT) {
    quizComponent = (
      <Selection onChoose={onChoose} question={quiz as SelectionQuiz} />
    );
  } else if (quiz.type === QuizType.TRUE_FALSE) {
    mappedQuiz = {
      type: QuizType.DEFINITION_SINGLE_SELECT,
      question: `${quiz.question}: ${quiz.statement}`,
      word: quiz.word,
      result: [
        {
          text: 'True',
          correct: quiz.result === 'true',
        },
        {
          text: 'False',
          correct: quiz.result === 'false',
        },
      ],
    } as SelectionQuiz;
    quizComponent = (
      <Selection onChoose={onChoose} question={mappedQuiz as SelectionQuiz} />
    );
  } else if (quiz.type === QuizType.DEFINITION_MULTIPLE_SELECT || quiz.type === QuizType.RELATED_WORD_SELECT) {
    mappedQuiz = {
      ...quiz,
      question: `${quiz.question}: ${quiz.word}`,
    };
    quizComponent = (
      <MultiSelection onChoose={onChoose} question={quiz as SelectionQuiz} />
    );
  }

  return (
    <div className="h-full overflow-y-hidden overflow-x-visible">
      <h2 className="px-6 pt-6 text-2xl font-bold">{mappedQuiz?.question}</h2>
      <ScrollArea className="max-h-[500px] p-6">{quizComponent}</ScrollArea>
    </div>
  );
}
