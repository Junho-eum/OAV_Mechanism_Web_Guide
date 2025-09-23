import { ShieldCheck } from "lucide-react";
import { classNames } from "../../utils/classNames";
import { Button } from "../../styles/ui";

export default function Result({ ageOK, detail, onDone }) {
  return (
    <div
      className={classNames(
        "rounded-2xl border p-4",
        ageOK
          ? "border-emerald-300 bg-emerald-50"
          : "border-rose-300 bg-rose-50"
      )}
    >
      <div className="flex items-start gap-2">
        <ShieldCheck
          className={classNames(
            "w-5 h-5 mt-0.5",
            ageOK ? "text-emerald-600" : "text-rose-600"
          )}
        />
        <div>
          <div className="font-medium">
            {ageOK ? "Access granted" : "Access denied"}
          </div>
          {detail && <div className="text-xs text-gray-600 mt-1">{detail}</div>}
        </div>
      </div>
      <Button className="mt-3" onClick={onDone}>
        Finish
      </Button>
    </div>
  );
}
