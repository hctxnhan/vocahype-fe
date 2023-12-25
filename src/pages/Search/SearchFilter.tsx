import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SearchFilter(props: SearchFilterProps) {
  return (
    <Select value={props.value} onValueChange={props.onChange}>
      <SelectTrigger className={props.className}>
        <SelectValue placeholder="Filter" />
      </SelectTrigger>
      <SelectContent className='shadow-2xl'>
        <SelectItem value="to_learn">All</SelectItem>
        <SelectItem value="learning">Learning</SelectItem>
        <SelectItem value="mastered">Mastered</SelectItem>
        <SelectItem value="ignore">Ignored</SelectItem>
      </SelectContent>
    </Select>
  );
}
