import { useState } from "react";
import Result from "../Result";
import { styles } from "../../../styles/ui";
import { classNames } from "../../../utils/classNames";

/**
 * DemoCardCheck (privacy-safe mock)
 * ---------------------------------
 * • Simulates a $0 authorization with the card issuer without sending
 *   any real card data to a server.
 * • Offers a sample test card so participants don't need to use their
 *   actual card details.
 * • Performs local Luhn validation and a mocked issuer response that
 *   only returns an over-18 assertion (no DOB or personal data shown).
 */

const SAMPLE_CARDS = [
  { label: "Visa (test)", number: "4242 4242 4242 4242", zip: "94110" },
  { label: "Mastercard (test)", number: "5555 5555 5555 4444", zip: "10001" },
];

export default function DemoCardCheck({ onDone }) {
  const [card, setCard] = useState("");
  const [zip, setZip] = useState("");
  const [ok, setOk] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMockMsg, setShowMockMsg] = useState(false);

  // Luhn algorithm - local only
  const luhn = (numStr) => {
    const s = numStr.replace(/\D/g, "");
    let sum = 0;
    let alt = false;
    for (let i = s.length - 1; i >= 0; i--) {
      let n = parseInt(s[i], 10);
      if (alt) {
        n *= 2;
        if (n > 9) n -= 9;
      }
      sum += n;
      alt = !alt;
    }
    return s.length > 0 && sum % 10 === 0;
  };

  const mask = (numStr) => {
    const s = numStr.replace(/\D/g, "");
    if (!s) return "";
    if (s.length <= 4) return s.padStart(4, "*");
    const last4 = s.slice(-4);
    return `**** **** **** ${last4}`;
  };

  const submit = async () => {
    setShowMockMsg(false);
    setOk(null);
    const cleaned = card.replace(/\s+/g, "");
    if (!luhn(cleaned)) {
      setOk(false);
      return;
    }

    // Simulate local tokenization + issuer check without network
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));

    // Mock issuer logic: pretend issuer says 18+ for test cards and random for others
    const isSample = SAMPLE_CARDS.some((c) => c.number.replace(/\s+/g, "") === cleaned);
    const pseudoResult = isSample ? true : Math.random() > 0.2; // 80% succeed

    setLoading(false);
    setOk(pseudoResult);
    setShowMockMsg(true);
  };

  const useSample = (s) => {
    setCard(s.number);
    setZip(s.zip || "");
    setOk(null);
    setShowMockMsg(false);
  };

  const clear = () => {
    setCard("");
    setZip("");
    setOk(null);
    setShowMockMsg(false);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        This demo simulates age verification with your card issuer.
        <strong className="block mt-1">No card data leaves your browser.</strong>
      </p>

      <div className="flex gap-2 flex-wrap">
        {SAMPLE_CARDS.map((s) => (
          <button
            key={s.number}
            type="button"
            onClick={() => useSample(s)}
            className="inline-flex items-center rounded-xl px-3 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
          >
            Use sample: {s.label}
          </button>
        ))}

        <button
          type="button"
          onClick={clear}
          className={classNames("inline-flex items-center rounded-xl px-3 py-2 text-sm font-medium border", styles.btnSecondary)}
        >
          Clear
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          value={card}
          onChange={(e) => setCard(e.target.value)}
          placeholder="Card number"
          className={styles.input}
          inputMode="numeric"
        />
        <input
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="Billing ZIP"
          className={styles.input}
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={submit}
          disabled={loading || !card}
          className={classNames(
            styles.btn,
            loading || !card ? "opacity-50 pointer-events-none" : ""
          )}
        >
          {loading ? "Checking…" : "Check"}
        </button>
        <button
          type="button"
          onClick={() => setOk(null)}
          className={classNames(styles.btnSecondary)}
        >
          Reset
        </button>
      </div>

      {showMockMsg && (
        <div className="rounded-xl border p-3 text-sm bg-gray-50">
          <div className="font-medium mb-1">Mock issuer response</div>
          <div className="text-xs text-gray-600">
            {ok
              ? "Issuer mock: account holder is over 18."
              : "Issuer mock: card invalid or cannot verify age."}
          </div>
        </div>
      )}

      {ok !== null && (
        <Result
          ageOK={ok}
          detail={ok ? "Issuer confirms 18+" : "Card invalid / cannot verify"}
          onDone={onDone}
        />
      )}
    </div>
  );
}
