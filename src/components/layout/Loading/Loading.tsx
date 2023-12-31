import { Half2Icon } from '@radix-ui/react-icons';

export function Loading({ loadingText = 'loading' }: { loadingText?: string }) {
  return (
    <div className="center flex-col gap-2">
      <Half2Icon width={50} height={50} className="h-6 w-6 animate-spin" />
      <p className="text-md animate-pulse font-display font-semibold uppercase">
        {loadingText}
      </p>
    </div>
  );
}
