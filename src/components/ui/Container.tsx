import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * The single horizontal rhythm for the whole site. Every section uses this so
 * left edges align perfectly from the nav all the way down to the footer.
 */
export function Container({
  as: Tag = 'div',
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={cn('mx-auto w-full max-w-[78rem] px-5 sm:px-8 lg:px-12', className)}>
      {children}
    </Tag>
  );
}
