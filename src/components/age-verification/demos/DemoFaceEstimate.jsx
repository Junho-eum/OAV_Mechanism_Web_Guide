import { useEffect, useMemo, useRef, useState } from "react";
import Result from "../Result";
import { Camera } from "lucide-react";
import { styles } from "../../../styles/ui";
import { classNames } from "../../../utils/classNames";

const SCAN_DURATION_MS = 3000; // how long to keep the camera on before auto-verifying

export default function DemoFaceEstimate({ onDone }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [score, setScore] = useState(null);
  const [error, setError] = useState("");

  // Stop camera tracks
  const stopStream = () => {
    const stream = streamRef.current;
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => stopStream();
  }, []);

  const startScan = async () => {
    setError("");
    setScore(null);
    setScanning(true);
    setSecondsLeft(Math.ceil(SCAN_DURATION_MS / 1000));

    try {
      // Request the user-facing camera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
    } catch (e) {
      setScanning(false);
      setError("Camera permission denied or unavailable.");
      return;
    }

    // Countdown + auto-finish
    const startedAt = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startedAt;
      const remainSec = Math.max(0, Math.ceil((SCAN_DURATION_MS - elapsed) / 1000));
      setSecondsLeft(remainSec);
      if (elapsed >= SCAN_DURATION_MS) {
        finishScan();
      } else {
        // schedule next animation frame tick for smoothness
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    // Kick off countdown
    rafRef.current = requestAnimationFrame(tick);
  };

  const rafRef = useRef(null);
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const finishScan = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    stopStream();
    // Simulate an on-device model output: pseudo age between 18 and 40
    const pseudo = 18 + Math.floor(Math.random() * 23);
    setScore(pseudo);
    setScanning(false);
  };

  const retry = () => {
    stopStream();
    setScore(null);
    setError("");
    setSecondsLeft(0);
    setScanning(false);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Turn on your camera. After a short scan, we’ll confirm “over‑18” locally in your browser.
      </p>

      {/* Camera frame */}
      <div className="rounded-2xl border overflow-hidden">
        {scanning ? (
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="block w-full h-64 object-cover bg-black"
            />
            <div className="absolute inset-x-0 bottom-0 p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-white/90">
                  <Camera className="w-4 h-4" />
                  Scanning…
                </span>
                <span className="px-2 py-1 rounded-md bg-white/90">
                  {secondsLeft}s
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 sm:p-6">
            <div className="text-sm text-gray-600">
              Position your face in the frame and start the scan. No footage is uploaded.
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2">
        {!scanning && score === null && (
          <button onClick={startScan} className={styles.btn}>
            Start camera &amp; scan
          </button>
        )}
        {scanning && (
          <button onClick={finishScan} className={classNames(styles.btnSecondary)}>
            Finish now
          </button>
        )}
        {!scanning && score !== null && (
          <button onClick={retry} className={classNames(styles.btnSecondary)}>
            Scan again
          </button>
        )}
      </div>

      {/* Errors */}
      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      {/* Result */}
      {score !== null && (
        <div className="mt-2">
          <Result
            ageOK={score >= 18}
            onDone={onDone}
          />
        </div>
      )}
    </div>
  );
}
