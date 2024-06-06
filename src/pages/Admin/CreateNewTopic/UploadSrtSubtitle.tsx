import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoadingButton } from '@/components/ui/loading-button';

interface UploadSrtSubtitleProps {
  onSubmit: (file?: File) => Promise<void>;
  isLoading: boolean;
  canSubmit: boolean;
}

export function UploadSrtSubtitle({
  onSubmit: handleSubmit,
  isLoading,
  canSubmit,
}: UploadSrtSubtitleProps) {
  const [file, setFile] = useState<File | undefined>();

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="subtitle">Select .srt subtitle file for this topic</Label>
      <Input
        id="subtitle"
        type="file"
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) {
            setFile(file);
          }
        }}
      />

      <LoadingButton
        disabled={!canSubmit}
        isLoading={isLoading}
        onClick={() => void handleSubmit(file)}
        className="mt-6"
        type="submit"
      >
        Submit
      </LoadingButton>
    </div>
  );
}
