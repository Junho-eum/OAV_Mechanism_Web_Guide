import { useState } from "react";
import Result from "../Result";
import { styles } from "../../../styles/ui";
import { classNames } from "../../../utils/classNames";

export default function DemoMDL({ onDone }) {
  const [attrs, setAttrs] = useState({
    over18: true,
    name: false,
    address: false,
    dob: false,
  });
  const toggle = (k) => setAttrs((a) => ({ ...a, [k]: !a[k] }));
  const canShare = Object.values(attrs).some(Boolean);

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Selective disclosure – share only what’s needed.
      </p>
      <div className="space-y-2">
        {[
          { k: "over18", label: "Over-18 (derived attribute)" },
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
      <button
        className={classNames(
          styles.btn,
          canShare ? "" : "opacity-50 pointer-events-none"
        )}
        onClick={() => onDone?.()}
      >
        Share proof
      </button>
      {canShare && (
        <Result
          ageOK={attrs.over18 || attrs.dob}
          detail={
            attrs.over18
              ? "mDL cryptographic proof: over-18"
              : "mDL shared full DOB"
          }
          onDone={onDone}
        />
      )}
    </div>
  );
}
