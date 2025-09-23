import { useState } from "react";
import Result from "../Result";
import { styles } from "../../../styles/ui";
import { classNames } from "../../../utils/classNames";

export default function DemoCardCheck({ onDone }) {
  const [card, setCard] = useState("");
  const [zip, setZip] = useState("");
  const [ok, setOk] = useState(null);

  const luhn = (numStr) => {
    let sum = 0,
      alt = false;
    for (let i = numStr.length - 1; i >= 0; i--) {
      let n = parseInt(numStr[i], 10);
      if (alt) {
        n *= 2;
        if (n > 9) n -= 9;
      }
      sum += n;
      alt = !alt;
    }
    return sum % 10 === 0;
  };

  const submit = async () => {
    if (!luhn(card.replace(/\s+/g, ""))) {
      setOk(false);
      return;
    }
    await new Promise((r) => setTimeout(r, 700));
    setOk(true);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Enter a credit card number and billing ZIP code to perform a $0
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          value={card}
          onChange={(e) => setCard(e.target.value)}
          placeholder="Card number"
          className={styles.input}
        />
        <input
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="Billing ZIP"
          className={styles.input}
        />
      </div>
      <button
        onClick={submit}
        className={classNames(
          styles.btn,
          card ? "" : "opacity-50 pointer-events-none"
        )}
      >
        Check
      </button>
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
