import { useRef, useState } from "react";
import StepCard from "../StepCard";
import ProgressBar from "../ProgressBar";
import Result from "../Result";
import { Upload } from "lucide-react";
import { styles } from "../../../styles/ui";
import { classNames } from "../../../utils/classNames";

/**
 * DemoUploadID – privacy-safe mock with drag & drop
 * -------------------------------------------------
 * • No real images are read or uploaded.
 * • Step 0 uses a drag‑and‑drop (or click) dropzone to simulate an upload.
 * • We only capture the filename string for realism; we do not read file bytes.
 * • Everything runs locally; no network calls.
 */

export default function DemoUploadID({ onDone }) {
  const [hasSample, setHasSample] = useState(false);
  const [droppedName, setDroppedName] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [step, setStep] = useState(0);
  const fileInputRef = useRef(null);

  const next = async () => {
    if (step === 0 && !hasSample) return;
    await new Promise((r) => setTimeout(r, 800));
    setStep((s) => s + 1);
  };

  const useSample = () => {
    setHasSample(true);
    setDroppedName("mock_id_front.png");
  };

  // Handlers for a privacy-safe dropzone
  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };
  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    // We don't read file contents; just show the first filename as a mock
    const f = e.dataTransfer?.files?.[0];
    if (f) {
      setHasSample(true);
      setDroppedName(f.name || "mock_id_front.png");
    }
  };

  const onPickClick = () => fileInputRef.current?.click();
  const onPicked = (e) => {
    const f = e.target.files?.[0];
    if (f) {
      // Do not read the file; name only for realism
      setHasSample(true);
      setDroppedName(f.name);
      // Clear the input so nothing is retained
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-4">
      {step === 0 && (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            This demo does <span className="font-semibold">not</span> accept real ID photos.
            Drag &amp; drop an image <em>(simulated)</em> or click to select a mock file.
            No files are read or uploaded.
          </p>

          {/* Dropzone (simulated) */}
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={onPickClick}
            role="button"
            tabIndex={0}
            className={classNames(
              "rounded-2xl border-2 border-dashed p-6 transition-colors cursor-pointer",
              dragActive ? "border-gray-900 bg-gray-50" : "border-gray-300 hover:bg-gray-50"
            )}
          >
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <Upload className="w-5 h-5 text-gray-500" />
              <div>
                <div className="font-medium">Drop image here (simulated)</div>
                <div className="text-xs text-gray-500">
                  Or click to choose a file. We only record the file name for this demo.
                </div>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onPicked}
              className="hidden"
            />
          </div>

          <div className="flex gap-2">
            <button type="button" onClick={useSample} className={styles.btn}>
              Use sample ID
            </button>
            <button
              type="button"
              onClick={next}
              className={classNames(
                styles.btnSecondary,
                hasSample ? "" : "opacity-50 pointer-events-none"
              )}
              title={hasSample ? undefined : "Drop/select a mock file or use the sample first"}
            >
              Continue
            </button>
          </div>

          {hasSample && (
            <p className="text-xs text-gray-500">
              Selected: <span className="font-medium">{droppedName || "mock_id_front.png"}</span>
            </p>
          )}
        </div>
      )}

      {step === 1 && (
        <StepCard title="Extracting DOB" subtitle="OCR &amp; security checks (simulated)">
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
