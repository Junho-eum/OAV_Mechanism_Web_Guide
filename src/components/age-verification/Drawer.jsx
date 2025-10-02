import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { styles } from "../../styles/ui";

export default function Drawer({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* overlay */}
          <div className="absolute inset-0 bg-black/30" onClick={onClose} />

          {/* top sheet */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 22, stiffness: 250 }}
            className="absolute left-0 right-0 top-0 w-full bg-white dark:bg-neutral-900 shadow-xl
                       rounded-b-3xl overflow-hidden"
          >
            {/* sheet content wrapper: responsive paddings and max height */}
            <div className="max-w-6xl mx-auto px-5 sm:px-7 pt-6 pb-3 sm:pb-5 max-h-[85vh] overflow-y-auto">
              {/* grab handle */}
              <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-gray-300/80 dark:bg-neutral-700" />

              {/* header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{title}</h3>
                <button onClick={onClose} className={styles.iconBtn} aria-label="Close">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* content */}
              <div>{children}</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
