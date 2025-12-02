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
            <h3 className="font-bold text-[22px]">{method.name}</h3>
          </div>
          <p className="mt-2 text-[20px] text-gray-600">{method.summary}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Button
          onClick={onHow}
          className={
            completed
              ? "w-full justify-center py-2 text-sm font-medium border border-emerald-600 !bg-emerald-600 !text-white"
              : "w-full justify-center py-2 text-sm font-medium !bg-black !text-white hover:!bg-neutral-900"
          }
        >
          {completed ? (
            <>✓ Viewed</>
          ) : (
            <>
              <Info className="w-4 h-4 mr-1" /> How it works
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
