'use client';

import Image from 'next/image';
import { useId, useState } from 'react';
import { MoveHorizontal } from 'lucide-react';

export type BeforeAfterPair = {
  beforeSrc: string;
  beforeAlt: string;
  afterSrc: string;
  afterAlt: string;
};

/**
 * Draggable before/after comparison.
 *
 * Built on a real <input type="range"> rather than pointer maths: it gets
 * touch dragging, keyboard control (arrows / Home / End) and screen-reader
 * semantics for free, which a div-with-listeners implementation does not.
 * The input is transparent and stretched over the frame; only the thumb shows.
 */
export function BeforeAfterSlider({ pair }: { pair: BeforeAfterPair }) {
  const [pos, setPos] = useState(50);
  const id = useId();

  return (
    <figure className="group/ba">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-navy-900 select-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-400 has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-navy-950">
        {/* AFTER - the base layer */}
        <Image
          src={pair.afterSrc}
          alt={pair.afterAlt}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover object-center"
        />

        {/* BEFORE - clipped from the left edge to the handle */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          aria-hidden="true"
        >
          <Image
            src={pair.beforeSrc}
            alt=""
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Divider - a hairline, not a light source. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 z-10 w-px bg-white/85"
          style={{ left: `calc(${pos}% - 0.5px)` }}
        />

        {/* Handle: solid white so it stays findable against any photo, and
            large enough to be a comfortable thumb target on touch. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 z-20 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy-900 shadow-lift transition-transform duration-200 group-hover/ba:scale-105"
          style={{ left: `${pos}%` }}
        >
          <MoveHorizontal className="size-5" strokeWidth={2.25} />
        </div>

        {/* Corner labels */}
        <span className="pointer-events-none absolute top-3 left-3 z-10 rounded-full bg-navy-950/75 px-2.5 py-1 text-[0.625rem] font-semibold tracking-[0.14em] text-white uppercase sm:top-4 sm:left-4 sm:px-3 sm:text-[0.6875rem]">
          Before
        </span>
        <span className="pointer-events-none absolute top-3 right-3 z-10 rounded-full bg-navy-950/75 px-2.5 py-1 text-[0.625rem] font-semibold tracking-[0.14em] text-white uppercase sm:top-4 sm:right-4 sm:px-3 sm:text-[0.6875rem]">
          After
        </span>

        {/* The actual control */}
        <label htmlFor={id} className="sr-only">
          Reveal the before and after
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          step={1}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-valuetext={`${Math.round(pos)}% before`}
          className="absolute inset-0 z-30 h-full w-full cursor-ew-resize appearance-none bg-transparent focus-visible:outline-none [&::-moz-range-thumb]:h-full [&::-moz-range-thumb]:w-11 [&::-moz-range-thumb]:cursor-ew-resize [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-transparent [&::-webkit-slider-thumb]:h-[28rem] [&::-webkit-slider-thumb]:w-11 [&::-webkit-slider-thumb]:cursor-ew-resize [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-transparent"
        />

      </div>
    </figure>
  );
}
