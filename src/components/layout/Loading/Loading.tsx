import { Half2Icon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils/utils';

export function Loading({
  loadingText = 'loading',
  fontStyle,
}: {
  loadingText?: string;
  fontStyle?: string;
}) {
  return (
    <div className="center flex-col gap-2">
      <Half2Icon width={50} height={50} className="h-6 w-6 animate-spin" />
      <p
        className={cn(
          `text-md text-center animate-pulse font-semibold uppercase ${
            fontStyle ? fontStyle : 'font-display'
          }`
        )}
      >
        {loadingText}
      </p>
    </div>
  );
}
