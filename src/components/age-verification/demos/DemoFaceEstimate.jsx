import { useState } from "react";
import Result from "../Result";
import { Camera } from "lucide-react";
import { styles } from "../../../styles/ui";
import { classNames } from "../../../utils/classNames";

export default function DemoFaceEstimate({ onDone }) {
  const [img, setImg] = useState(null);
  const [score, setScore] = useState(null);

  const analyze = async () => {
    await new Promise((r) => setTimeout(r, 800));
    const pseudo = 18 + Math.floor(Math.random() * 23);
    setScore(pseudo);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Upload a selfie (mock). Data stays in the browser.
      </p>
      <label className="flex items-center gap-3 p-4 border rounded-2xl hover:bg-gray-50 cursor-pointer">
        <Camera className="w-5 h-5" />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImg(e.target.files?.[0] || null)}
          className="hidden"
        />
        <span className="text-sm">{img ? img.name : "Choose image…"}</span>
      </label>
      <button
        onClick={analyze}
        className={classNames(
          styles.btn,
          img ? "" : "opacity-50 pointer-events-none"
        )}
      >
        Estimate age
      </button>
      {score !== null && (
        <div className="mt-2">
          <Result
            ageOK={score >= 18}
            detail={`Estimated age ≈ ${score}`}
            onDone={onDone}
          />
        </div>
      )}
    </div>
  );
}
