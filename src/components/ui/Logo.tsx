import Image from 'next/image';
import { cn } from '@/lib/cn';
import { site } from '@/lib/site';

/**
 * The client's actual logo, lifted from their existing site and trimmed of its
 * transparent padding so it optically aligns with adjacent text.
 * The artwork carries its own dark plate, so it sits correctly on both the
 * light header and the navy footer without needing a second color treatment.
 */
export function Logo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/images/brand/logo@3x.png"
      alt={`${site.name} logo`}
      width={1041}
      height={384}
      priority={priority}
      sizes="180px"
      className={cn('h-11 w-auto', className)}
    />
  );
}
