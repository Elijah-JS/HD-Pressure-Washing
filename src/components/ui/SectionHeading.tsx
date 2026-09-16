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
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  as?: 'h2' | 'h3';
  className?: string;
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
            'eyebrow mb-3 flex items-center gap-3 sm:mb-4',
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
          'text-[clamp(1.75rem,1.05rem+2.9vw,3rem)] leading-[1.12] font-bold sm:leading-[1.08]',
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
            'mt-4 text-base leading-relaxed sm:mt-5 sm:text-lg',
            dark ? 'text-ink-200' : 'text-ink-600',
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
