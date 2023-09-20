import { LinkProps, Link as WouterLink } from 'wouter';

export function Link(
  props: LinkProps & { className?: string; href: string }
) {
  return (
    <WouterLink
      {...props}
      className={`text-brand-500 underline-offset-2 hover:underline font-medium ${props?.className ?? ''}`}
    />
  );
}
