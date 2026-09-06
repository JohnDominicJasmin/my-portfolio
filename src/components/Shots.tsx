"use client";

import { useEffect, useRef, useState } from "react";
import { sizeOf } from "@/data/imageSizes";
import type { Shot } from "@/data/projects";

export default function Shots({
  shots,
  portrait = false,
}: {
  shots: Shot[];
  portrait?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const update = () => {
      const slide = trackRef.current?.querySelector<HTMLElement>(".shots__slide");
      if (!slide) return;
      setOffset(index * slide.getBoundingClientRect().width);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [index]);

  if (shots.length === 0) return null;

  const single = shots.length === 1;

  return (
    <div className={`shots${portrait ? " shots--portrait" : ""}`}>
      <div className="shots__frame">
        {!single && (
          <button
            className="shots__btn"
            aria-label="Previous screenshot"
            disabled={index === 0}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
          >
            ←
          </button>
        )}
        <div className="shots__viewport">
          <div
            className="shots__track"
            ref={trackRef}
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {shots.map((shot) => (
              <div key={shot.src} className="shots__slide">
                <img
                  src={shot.src}
                  alt={shot.alt}
                  loading="lazy"
                  {...sizeOf(shot.src)}
                />
              </div>
            ))}
          </div>
        </div>
        {!single && (
          <button
            className="shots__btn"
            aria-label="Next screenshot"
            disabled={index >= shots.length - 1}
            onClick={() => setIndex((i) => Math.min(shots.length - 1, i + 1))}
          >
            →
          </button>
        )}
      </div>
      {!single && (
        <p className="shots__counter">
          {index + 1} / {shots.length}
        </p>
      )}
    </div>
  );
}
