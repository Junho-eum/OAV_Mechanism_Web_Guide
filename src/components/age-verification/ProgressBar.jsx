import { useEffect, useState } from "react";

export default function ProgressBar({ duration = 1000 }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let start = performance.now();
    let raf;
    const loop = (t) => {
      const d = Math.min(1, (t - start) / duration);
      setP(Math.floor(d * 100));
      if (d < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [duration]);

  return (
    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
      <div className="h-full bg-gray-800" style={{ width: `${p}%` }} />
    </div>
  );
}
