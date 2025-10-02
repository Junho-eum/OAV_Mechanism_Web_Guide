import { useState } from "react";
import Result from "../Result";
import { styles } from "../../../styles/ui";
import { classNames } from "../../../utils/classNames";

/**
 * DemoOIDC – "Log in with an Existing Account" (privacy-safe mock)
 *
 * Simulates an OpenID Connect flow WITHOUT contacting any provider.
 * - No real email is required or sent.
 * - Participants can use a generated sample account.
 * - Ends with a mock "over-18" assertion.
 */

function SampleEmail({ value, onChange, onGenerate }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Account email (mock)</label>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g., demo.user+1234@example.com"
          className={styles.input}
        />
        <button
          type="button"
          onClick={onGenerate}
          className="inline-flex items-center justify-center rounded-xl px-4 py-2 
             bg-blue-600 text-white font-medium shadow hover:bg-blue-700 
             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Use sample
        </button>
      </div>
      <p className="text-xs text-gray-500">
        This field is local only. You can leave it blank or use a generated
        value—nothing is uploaded.
      </p>
    </div>
  );
}

export default function DemoOIDC({ onDone }) {
  const [step, setStep] = useState(0);
  const [provider, setProvider] = useState("");
  const [email, setEmail] = useState("");
  const [granted, setGranted] = useState(null);

  const genEmail = () => {
    const n = Math.floor(Math.random() * 9000) + 1000;
    setEmail(`demo.user+${n}@example.com`);
  };

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

  const complete = async () => {
    // Simulate verifying an assertion from the IdP.
    await new Promise((r) => setTimeout(r, 700));
    setGranted(true);
  };

  return (
    <div className="space-y-4">
      {step === 0 && (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Choose an account provider (simulated).
          </p>
          <div className="grid grid-cols-2 gap-3">
            {["Google", "Apple", "Facebook", "X/Twitter"].map((p) => (
              <button
                key={p}
                className={styles.btnSecondary}
                onClick={() => {
                  setProvider(p);
                  next();
                }}
              >
                {p}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500">
            This is a local demo. You will not be redirected or asked for a real
            password.
          </p>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Sign in to <span className="font-medium">{provider}</span> (mock).
          </p>
          <SampleEmail
            value={email}
            onChange={setEmail}
            onGenerate={genEmail}
          />
          <div className="flex gap-2">
            <button className={styles.btnSecondary} onClick={back}>
              Back
            </button>
            <button className={classNames(styles.btn)} onClick={complete}>
              Continue
            </button>
          </div>
        </div>
      )}

      {granted !== null && (
        <Result ageOK={granted} detail="Over-18!" onDone={onDone} />
      )}
    </div>
  );
}
