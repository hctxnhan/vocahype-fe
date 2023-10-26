import { LinkProps, Link as WouterLink } from 'wouter';

export function Link(
  props: LinkProps & { className?: string; href: string }
) {
  return (
    <WouterLink
      {...props}
      className={`text-primary underline-offset-2 hover:underline font-medium ${props?.className ?? ''}`}
    />
  );
}
