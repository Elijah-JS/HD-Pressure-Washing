import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Shared section header. Keeping eyebrow / title / lede in one component is
 * what stops eight sections from drifting into eight different type scales.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  tone = 'light',
  as: Tag = 'h2',
  className,
  ledeClassName,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  as?: 'h2' | 'h3';
  className?: string;
  ledeClassName?: string;
}) {
  const dark = tone === 'dark';

  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <div
          data-reveal=""
          className={cn(
            'eyebrow mb-2.5 flex items-center gap-3 sm:mb-4',
            align === 'center' && 'justify-center',
            dark ? 'text-brand-300' : 'text-brand-600',
          )}
        >
          <span
            aria-hidden="true"
            className={cn('h-px w-7', dark ? 'bg-brand-300/60' : 'bg-brand-500/50')}
          />
          {eyebrow}
        </div>
      )}

      <Tag
        data-reveal=""
        style={{ '--reveal-delay': '60ms' } as React.CSSProperties}
        className={cn(
          'text-[1.5rem] leading-[1.18] font-bold sm:text-[clamp(1.85rem,1.15rem+2.4vw,3rem)] sm:leading-[1.1] lg:leading-[1.08]',
          dark && 'text-white',
        )}
      >
        {title}
      </Tag>

      {lede && (
        <p
          data-reveal=""
          style={{ '--reveal-delay': '120ms' } as React.CSSProperties}
          className={cn(
            'mt-2.5 max-w-[36rem] text-[0.875rem] leading-[1.5] sm:mt-5 sm:text-lg sm:leading-relaxed',
            dark ? 'text-ink-200' : 'text-ink-600',
            ledeClassName,
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
