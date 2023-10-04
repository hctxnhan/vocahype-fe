import { Loader2 } from 'lucide-react';

import { Button, ButtonProps } from './button';

export interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
  alternateText?: string;
}

export function LoadingButton({
  isLoading,
  alternateText,
  ...rest
}: LoadingButtonProps) {
  return (
    <Button disabled={isLoading} {...rest}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {alternateText ?? rest.children}
        </>
      ) : (
        rest.children
      )}
    </Button>
  );
}
