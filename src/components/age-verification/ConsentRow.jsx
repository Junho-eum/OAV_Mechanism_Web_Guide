import { classNames } from "../../utils/classNames";

export default function ConsentRow({ label, checked, disabled }) {
  return (
    <div
      className={classNames(
        "flex items-center justify-between p-3 rounded-2xl border",
        disabled && "opacity-50"
      )}
    >
      <span className="text-sm">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        readOnly
        className="h-4 w-4"
      />
    </div>
  );
}
