import { useEffect, useRef, useState } from "react";
import Result from "../Result";
import { styles } from "../../../styles/ui";
import { classNames } from "../../../utils/classNames";

/**
 * DemoMDL – Digital ID / mDL selective disclosure (privacy-safe mock)
 *
 * Flow:
 *  1) Pick a wallet provider (mock only)
 *  2) Choose attributes to share (default: Over‑18 only)
 *  3) Present via QR/NFC simulation with a short progress
 *  4) Show result (grants if over‑18 OR full DOB selected)
 *
 * No network calls. No personal data. Everything runs locally.
 */

const PROVIDERS = ["Mobile Driver's License", "Yoti", "ID.me"];

function ProviderGrid({ onPick }) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-600">
        Choose your digital ID wallet (simulated).
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {PROVIDERS.map((p) => (
          <button key={p} className={styles.btnSecondary} onClick={() => onPick(p)}>
            {p}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-500">
        This is a local demo. You won’t be redirected and nothing is uploaded.
      </p>
    </div>
  );
}

function AttributePicker({ attrs, setAttrs, onNext, onBack }) {
  const toggle = (k) => setAttrs((a) => ({ ...a, [k]: !a[k] }));
  const canShare = Object.values(attrs).some(Boolean);

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Selective disclosure — share only what’s needed.
      </p>
      <div className="space-y-2">
        {[
          { k: "over18", label: "Over‑18 (derived attribute)" },
          { k: "dob", label: "Full DOB" },
          { k: "name", label: "Legal name" },
          { k: "address", label: "Address" },
        ].map(({ k, label }) => (
          <label
            key={k}
            className="flex items-center gap-3 p-3 border rounded-2xl"
          >
            <input
              type="checkbox"
              checked={attrs[k]}
              onChange={() => toggle(k)}
              className="h-4 w-4"
            />
            <span className="text-sm">{label}</span>
          </label>
        ))}
      </div>
      <div className="flex gap-2">
        <button className={styles.btnSecondary} onClick={onBack}>
          Back
        </button>
        <button
          className={classNames(styles.btn, canShare ? "" : "opacity-50 pointer-events-none")}
          onClick={onNext}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function PresentScreen({ onDone, onBack, attrs }) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const start = performance.now();
    const DURATION = 2500; // 2.5s simulated presentment
    const loop = (t) => {
      const d = Math.min(1, (t - start) / DURATION);
      setProgress(Math.floor(d * 100));
      if (d < 1) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        onDone(); // complete
      }
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onDone]);

  const wantsOver18 = attrs.over18;
  const wantsDOB = attrs.dob;

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Presenting credential via QR/NFC (simulated)…
      </p>

      <div className="rounded-2xl border p-4">
        <div className="grid gap-4 sm:grid-cols-2 items-center">
          {/* Mock QR block */}
          <div className="flex items-center justify-center">
            <div className="h-36 w-36 rounded-lg bg-gradient-to-br from-gray-200 to-gray-100 grid place-items-center text-xs text-gray-600 border">
              QR code
            </div>
          </div>
          <div className="text-sm">
            <div className="font-medium mb-2">Requested attributes</div>
            <ul className="list-disc pl-5 space-y-1">
              {wantsOver18 && <li>Over‑18 confirmation</li>}
              {wantsDOB && <li>Full date of birth</li>}
              {!wantsOver18 && !wantsDOB && <li>None (add at least one)</li>}
              {attrs.name && <li>Legal name</li>}
              {attrs.address && <li>Address</li>}
            </ul>
            <div className="mt-3">
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gray-900" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-1 text-xs text-gray-500">{progress}%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button className={styles.btnSecondary} onClick={onBack}>
          Back
        </button>
        <button className={styles.btn} onClick={onDone}>
          Skip wait
        </button>
      </div>
    </div>
  );
}

export default function DemoMDL({ onDone }) {
  const [step, setStep] = useState(0);
  const [provider, setProvider] = useState("");
  const [attrs, setAttrs] = useState({
    over18: true,
    name: false,
    address: false,
    dob: false,
  });
  const [granted, setGranted] = useState(null);

  const goProvider = (p) => {
    setProvider(p);
    setStep(1);
  };

  const finishPresentation = () => {
    const ageOK = attrs.over18 || attrs.dob; // succeeds if over‑18 OR DOB chosen
    setGranted(ageOK);
    setStep(3);
  };

  return (
    <div className="space-y-4">
      {step === 0 && <ProviderGrid onPick={goProvider} />}

      {step === 1 && (
        <AttributePicker
          attrs={attrs}
          setAttrs={setAttrs}
          onNext={() => setStep(2)}
          onBack={() => setStep(0)}
        />
      )}

      {step === 2 && (
        <PresentScreen
          attrs={attrs}
          onDone={finishPresentation}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <Result
          ageOK={granted}
          detail={
            granted
              ? (attrs.over18 ? "mDL cryptographic proof: over‑18" : "mDL shared full DOB")
              : "Presentation incomplete"
          }
          onDone={onDone}
        />
      )}
    </div>
  );
}
