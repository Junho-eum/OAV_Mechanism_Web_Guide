import React, { useMemo, useState } from "react";
import { METHODS } from "../../data/methods";
import MethodCard from "./MethodCard";
import Drawer from "./Drawer";
import ProgressBar from "./ProgressBar";
import useAnalytics from "../../hooks/useAnalytics";
import HowItWorksSlider from "./HowItWorksSlider";

export default function AgeVerificationShowcase() {
  const { track } = useAnalytics();
  const [openHow, setOpenHow] = useState(null);
  const [completed, setCompleted] = useState({});

  // Lookup table so we can get a method by key
  const methodByKey = useMemo(() => {
    const map = new Map();
    METHODS.forEach((m) => map.set(m.key, m));
    return map;
  }, []);

  // Shuffle the methods once per mount so card order is randomized
  const shuffledMethods = useMemo(() => {
    const arr = [...METHODS];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  const totalMethods = METHODS.length;
  const viewedCount = Object.keys(completed).length;
  const allDone = totalMethods > 0 && viewedCount >= totalMethods;

  const handleOpenHow = (key) => {
    track("open_panel", { type: "how", key });
    setOpenHow(key);
  };

  const handleCloseHow = () => {
    setOpenHow(null);
  };

  const handleMethodComplete = (methodKey) => {
    if (!methodKey) return;
    setCompleted((prev) => {
      if (prev[methodKey]) return prev;
      return { ...prev, [methodKey]: true };
    });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-neutral-950 dark:text-neutral-100">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Age Verification Methods
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Explore various age verification techniques.
          </p>
          <p className="text-base font-medium text-gray-800 dark:text-neutral-200 mt-1">
            Click &quot;How it works&quot; to learn more about each method. Once
            you have viewed all methods, you can proceed to the next section of
            the survey.
          </p>
        </header>

        {/* Global progress + completion banner */}
        <div className="space-y-2 mb-4">
          <ProgressBar total={totalMethods} viewed={viewedCount} />
          <div
            className={`rounded-lg border px-3 py-2 text-sm ${
              allDone
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-amber-200 bg-amber-50 text-amber-800"
            }`}
          >
            {allDone ? (
              <>
                You&apos;ve reviewed all age verification methods. You may
                proceed.
              </>
            ) : (
              <>
                Please review the &quot;How it works&quot; information for each
                method before continuing.
              </>
            )}
          </div>
        </div>

        {/* Method cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {shuffledMethods.map((m, idx) => (
            <MethodCard
              key={m.key}
              method={m}
              delay={idx * 0.05}
              completed={!!completed[m.key]}
              onHow={() => handleOpenHow(m.key)}
            />
          ))}
        </section>
      </div>

      {/* How it works drawer */}
      <Drawer
        open={!!openHow}
        onClose={handleCloseHow}
        title={
          openHow ? `${methodByKey.get(openHow)?.name} – How it works` : ""
        }
      >
        {openHow && (
          <HowItWorksSlider
            method={methodByKey.get(openHow)}
            onComplete={handleMethodComplete}
            onFinish={handleCloseHow}
          />
        )}
      </Drawer>
    </div>
  );
}
