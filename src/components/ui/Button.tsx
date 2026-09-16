import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'dark' | 'outline' | 'ghost' | 'onDark';
type Size = 'compact' | 'md' | 'lg';

/**
 * Note: `base` sets `inline-flex`. Passing `hidden` via className will NOT
 * reliably win against it - both are display utilities and the cascade order
 * decides. To hide a button responsively, wrap it in an element that carries
 * the `hidden`/`block` classes instead.
 */
const base =
  'group/btn inline-flex items-center justify-center gap-2 rounded-full font-semibold ' +
  'transition-[background-color,color,box-shadow,transform] duration-200 ease-[var(--ease-out-soft)] ' +
  'active:translate-y-px select-none whitespace-nowrap';

const variants: Record<Variant, string> = {
  /* The one high-emphasis action on the page: request a quote.
     The colour alone carries the emphasis. An earlier version had a wide
     brand-blue drop shadow, which made the button glow rather than sit on
     the page - the single loudest "AI landing page" tell in the design. */
  primary: 'bg-brand-600 text-white shadow-subtle hover:bg-brand-700',
  /* Secondary emphasis on light backgrounds - e.g. click-to-call. */
  dark: 'bg-ink-900 text-white hover:bg-ink-800 shadow-subtle',
  outline: 'border border-ink-900/15 bg-white text-ink-900 hover:border-ink-900/30 hover:bg-ink-50',
  ghost: 'text-ink-700 hover:bg-ink-900/5 hover:text-ink-900',
  /* Secondary emphasis on photography or navy. A flat translucent fill with a
     hairline border - no frosted glass, which never survives being placed on
     a busy photograph anyway. */
  onDark: 'border border-white/30 bg-white/8 text-white hover:border-white/50 hover:bg-white/15',
};

const sizes: Record<Size, string> = {
  /* Responsive on purpose: overriding `md` from className cannot win, because
     same-property utilities are ordered by the stylesheet, not by class order. */
  compact: 'h-10 px-4 text-sm sm:h-11 sm:px-5 sm:text-[0.9375rem]',
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-[3.25rem] px-7 text-base',
};

type Props = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & (
  | ({ href: string } & Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'className' | 'children'>)
  | ({ href?: undefined } & Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'>)
);

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: Props) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (typeof props.href === 'string') {
    const { href, ...rest } = props as { href: string } & ComponentPropsWithoutRef<'a'>;
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const { ...rest } = props as ComponentPropsWithoutRef<'button'>;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
