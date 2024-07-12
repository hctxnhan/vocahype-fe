import { FillInTheBlank } from './FillInBlank';
import { Matching } from './Matching';
import { MultiSelection } from './MultiSelection';
import { Selection } from './Selection';

export function QuizContainer() {
  return (
    <div className="flex flex-col gap-10">
      <Matching />
      <MultiSelection />
      <Selection />
      <FillInTheBlank />
    </div>
  );
}
