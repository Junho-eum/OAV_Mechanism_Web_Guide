import { useState } from "react";
import StepCard from "../StepCard";
import ProgressBar from "../ProgressBar";
import Result from "../Result";
import { Upload } from "lucide-react";
import { styles } from "../../../styles/ui";
import { classNames } from "../../../utils/classNames";

export default function DemoUploadID({ onDone }) {
  const [file, setFile] = useState(null);
  const [step, setStep] = useState(0);

  const next = async () => {
    if (step === 0 && !file) return;
    await new Promise((r) => setTimeout(r, 800));
    setStep(step + 1);
  };

  return (
    <div className="space-y-4">
      {step === 0 && (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Upload a photo of the front of your ID (mock).
          </p>
          <label className="flex items-center gap-3 p-4 border rounded-2xl hover:bg-gray-50 cursor-pointer">
            <Upload className="w-5 h-5" />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
            />
            <span className="text-sm">
              {file ? file.name : "Choose image…"}
            </span>
          </label>
          <button
            onClick={next}
            className={classNames(
              styles.btn,
              file ? "" : "opacity-50 pointer-events-none"
            )}
          >
            Continue
          </button>
        </div>
      )}
      {step === 1 && (
        <StepCard
          title="Extracting DOB"
          subtitle="OCR & security checks (simulated)"
        >
          <ProgressBar duration={900} />
          <button onClick={next} className={styles.btn}>
            Show result
          </button>
        </StepCard>
      )}
      {step === 2 && <Result ageOK={true} onDone={onDone} />}
    </div>
  );
}
