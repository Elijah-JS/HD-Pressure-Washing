'use client';

import { useState } from 'react';

const LIMIT = 148;

export function ReviewExcerpt({ text }: { text: string }) {
  const [open, setOpen] = useState(false);

  if (text.length <= LIMIT) return text;

  const cut = text.lastIndexOf(' ', LIMIT);
  const excerpt = text.slice(0, cut > 40 ? cut : LIMIT);

  return (
    <>
      {open ? text : `${excerpt}\u2026`}{' '}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="font-semibold text-brand-600 underline decoration-brand-500/30 underline-offset-2"
      >
        {open ? 'Show less' : 'Read more'}
      </button>
    </>
  );
}
