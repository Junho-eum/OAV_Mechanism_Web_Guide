import { useState, useMemo } from "react";
import { METHODS } from "../../data/methods";
import MethodCard from "./MethodCard";
import Drawer from "./Drawer";
import StepCard from "./StepCard"; // only if you want to reuse here; optional
import useAnalytics from "../../hooks/useAnalytics";

function HowItWorks({ method }) {
  return (
    <ol className="list-decimal pl-6 space-y-2 text-sm leading-6">
      {method.how.map((step) => (
        <li key={step}>{step}</li>
      ))}
    </ol>
  );
}

function DemoHost({ method, onDone }) {
  const DemoComp = method.demo;
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-gray-50 p-3 text-xs text-gray-600">
        This is a simulated environment. No data is uploaded; everything runs locally
        in your browser.
      </div>
      <DemoComp onDone={onDone} />
    </div>
  );
}

export default function AgeVerificationShowcase() {
  const { track } = useAnalytics();
  const [openHow, setOpenHow] = useState(null);
  const [openDemo, setOpenDemo] = useState(null);

// Shuffle METHODS only once when component mounts
  const shuffledMethods = useMemo(() => {
    // Copy so original METHODS stays untouched
    const arr = [...METHODS];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
    return arr;
  }, []);

  const onOpen = (type, key) => {
    track("open_panel", { type, key });
    if (type === "how") setOpenHow(key);
    else setOpenDemo(key);
  };
  const closeAll = () => {
    setOpenHow(null);
    setOpenDemo(null);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-neutral-950 dark:text-neutral-100">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Age Verification Methods
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Explore various age verification techniques
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {shuffledMethods.map((m, idx) => (
            <MethodCard
              key={m.key}
              method={m}
              delay={idx * 0.05}
              onHow={() => {
                /* open drawer */
              }}
              onDemo={() => {
                /* open demo */
              }}
            />
          ))}
        </section>
      </div>

      <Drawer
        open={!!openHow}
        onClose={closeAll}
        title={METHODS.find((m) => m.key === openHow)?.name + " – How it works"}
      >
        {openHow && (
          <HowItWorks method={METHODS.find((m) => m.key === openHow)} />
        )}
      </Drawer>

      <Drawer
        open={!!openDemo}
        onClose={closeAll}
        title={METHODS.find((m) => m.key === openDemo)?.name + " – Demo"}
      >
        {openDemo && (
          <DemoHost
            method={METHODS.find((m) => m.key === openDemo)}
            onDone={closeAll}
          />
        )}
      </Drawer>
    </div>
  );
}
