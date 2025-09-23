import { motion } from "framer-motion";
import { Info, Play } from "lucide-react";
import { classNames } from "../../utils/classNames";
import { Button } from "../../styles/ui";

export default function MethodCard({ method, onHow, onDemo, delay = 0 }) {
  const Icon = method.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="group rounded-2xl border border-gray-200/80 dark:border-neutral-800
           bg-white dark:bg-neutral-900 p-6 hover:shadow-md transition-shadow text-left"
    >
      <div
        className={classNames(
          "rounded-xl p-3 inline-flex mb-2",
          "bg-gradient-to-br",
          method.color
        )}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="mt-2">
        <div className="font-semibold text-base">{method.name}</div>
        <p className="text-sm text-gray-600 dark:text-neutral-400 mt-1 leading-6">
          {method.summary}
        </p>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Button variant="secondary" onClick={onHow}>
          <Info className="w-4 h-4 mr-1" /> How it works
        </Button>
        <Button onClick={onDemo}>
          <Play className="w-4 h-4 mr-1" /> Try demo
        </Button>
      </div>
    </motion.div>
  );
}
