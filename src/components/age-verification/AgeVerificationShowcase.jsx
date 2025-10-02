import { useState, useMemo } from "react";
import { METHODS } from "../../data/methods";
import MethodCard from "./MethodCard";
import Drawer from "./Drawer";
import StepCard from "./StepCard"; // only if you want to reuse here; optional
import useAnalytics from "../../hooks/useAnalytics";
import HowItWorksSlider from "./HowItWorksSlider";




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

  // Build a lookup so drawers can fetch method data by key (stable even after shuffle)
  const methodByKey = useMemo(() => {
    const map = new Map();
    METHODS.forEach((m) => map.set(m.key, m));
    return map;
  }, []);
  
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
          <p className="text-sm text-gray-600 mt-1">
            Please keep in mind that this is a showcase of different methods and
            does not store your data.
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {shuffledMethods.map((m, idx) => (
            <MethodCard
              key={m.key}
              method={m}
              delay={idx * 0.05}
              onHow={() => {
                onOpen("how", m.key);
              }}
              onDemo={() => {
                onOpen("demo", m.key);
              }}
            />
          ))}
        </section>
      </div>

      <Drawer
        open={!!openHow}
        onClose={closeAll}
        title={
          openHow ? `${methodByKey.get(openHow)?.name} – How it works` : ""
        }
      >
        {openHow && <HowItWorksSlider method={methodByKey.get(openHow)} />}
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
