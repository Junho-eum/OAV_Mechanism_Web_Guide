import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { classNames } from "../../utils/classNames";

export default function HowItWorksSlider({ method, onComplete, onFinish }) {
  // Accept either method.slides (rich) or fallback to method.how (strings)
  const slides = useMemo(() => {
    if (Array.isArray(method.slides) && method.slides.length)
      return method.slides;
    return (method.how || []).map((t, i) => ({
      title: `Step ${i + 1}`,
      body: t,
    }));
  }, [method]);

  const [idx, setIdx] = useState(0);
  const total = slides.length;
  const canPrev = idx > 0;
  const canNext = idx < total - 1;
  const goPrev = () => canPrev && setIdx((i) => i - 1);
  const goNext = () => canNext && setIdx((i) => i + 1);
  const goTo = (i) => setIdx(i);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    if (
      !hasCompletedRef.current &&
      typeof onComplete === "function" &&
      total > 0 &&
      idx === total - 1
    ) {
      hasCompletedRef.current = true;
      onComplete(method?.key || method?.name || "unknown");
    }
  }, [idx, total, onComplete, method]);
  // Keyboard support
  const containerRef = useRef(null);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, total]);

  return (
    <div ref={containerRef} className="space-y-4">
      <div className="relative">
        {/* Frame */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
          {/* Slide content */}
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-5 items-center">
            {/* Visual (optional) */}
            <div className="sm:col-span-3">
              {slides[idx]?.image ? (
                <img
                  src={slides[idx].image}
                  alt={
                    slides[idx].imageAlt ||
                    slides[idx].title ||
                    "How it works illustration"
                  }
                  className="w-full rounded-xl border border-gray-100 object-contain"
                />
              ) : (
                <div className="h-40 sm:h-48 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 text-sm">
                  No image provided
                </div>
              )}
            </div>

            {/* Copy */}
            <div className="sm:col-span-2">
              {slides[idx]?.kicker && (
                <p className="text-sm uppercase tracking-wide text-gray-500">
                  {slides[idx].kicker}
                </p>
              )}
              <h3 className="text-2xl font-semibold text-gray-900">
                {slides[idx]?.title || `Step ${idx + 1}`}
              </h3>
              {slides[idx]?.body && (
                <p className="mt-3 text-lg text-gray-700 leading-7">
                  {slides[idx].body}
                </p>
              )}
              {slides[idx]?.bullets?.length > 0 && (
                <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 space-y-1">
                  {slides[idx].bullets.map((b, bi) => (
                    <li key={bi}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Prev / Next */}
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={goPrev}
            disabled={!canPrev}
            className={classNames(
              "inline-flex items-center gap-1 rounded-xl border px-3.5 py-2 text-sm",
              canPrev
                ? "bg-white hover:bg-gray-50 border-gray-200"
                : "bg-white border-gray-100 opacity-50 cursor-not-allowed"
            )}
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={classNames(
                  "h-2.5 w-2.5 rounded-full",
                  i === idx ? "bg-gray-900" : "bg-gray-300 hover:bg-gray-400"
                )}
              />
            ))}
          </div>
          {idx === total - 1 ? (
            <button
              onClick={() => {
                if (typeof onFinish === "function") {
                  onFinish();
                }
              }}
              className={classNames(
                "inline-flex items-center gap-1 rounded-xl px-3.5 py-2 text-sm text-white",
                "bg-gray-900 hover:bg-black"
              )}
            >
              Finish
            </button>
          ) : (
            <button
              onClick={goNext}
              disabled={!canNext}
              className={classNames(
                "inline-flex items-center gap-1 rounded-xl px-3.5 py-2 text-sm text-white",
                canNext
                  ? "bg-gray-900 hover:bg-black"
                  : "bg-gray-400 opacity-60 cursor-not-allowed"
              )}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Accessibility: small step counter */}
      <p className="text-xs text-gray-500 text-center">
        {idx + 1} / {total}
        {total > 0 && idx === total - 1 && (
          <span className="ml-2 inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
            All steps viewed
          </span>
        )}
      </p>
    </div>
  );
}
