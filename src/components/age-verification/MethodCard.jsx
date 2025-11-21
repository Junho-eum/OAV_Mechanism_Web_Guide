// src/components/age-verification/MethodCard.jsx
import { motion } from "framer-motion";
import { Info, Play } from "lucide-react";
import { Button } from "../../styles/ui";

export default function MethodCard({
  method,
  onHow,
  onDemo,
  completed = false,
  delay = 0,
}) {
  const Icon = method.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="group rounded-2xl border border-gray-200/80 dark:border-neutral-800
           bg-white dark:bg-neutral-900 p-6 hover:shadow-md transition-shadow text-left"
    >
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
          <Icon className="w-5 h-5 text-indigo-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center flex-wrap gap-2">
            <h3 className="font-semibold text-base">{method.name}</h3>
            {completed && (
              <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                ✓ Viewed
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-600">{method.summary}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Button
          variant="secondary"
          onClick={onHow}
          className="w-full justify-center py-2 text-sm font-medium !bg-black text-white hover:!bg-neutral-900"
        >
          <Info className="w-4 h-4 mr-1" /> How it works
        </Button>
      </div>
    </motion.div>
  );
}
