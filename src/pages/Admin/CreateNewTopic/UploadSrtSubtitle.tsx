import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
export function UploadSrtSubtitle() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="subtitle">Select .srt subtitle file for this topic</Label>
      <Input id="subtitle" type="file" />
    </div>
  );
}
