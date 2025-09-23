import React from "react";

export const styles = {
  btn:
    "inline-flex items-center justify-center rounded-xl px-3.5 py-2.5 text-sm font-medium " +
    "bg-gray-900 text-white hover:bg-black " +
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 " +
    "disabled:opacity-50 disabled:pointer-events-none " +
    "dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white dark:focus:ring-neutral-200",
  btnSecondary:
    "inline-flex items-center justify-center rounded-xl px-3.5 py-2.5 text-sm font-medium " +
    "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 " +
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 " +
    "dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800/80 dark:focus:ring-neutral-300",
  input:
    "w-full rounded-xl border border-gray-200 px-3 py-2 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-gray-900 " +
    "dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:ring-neutral-300",
  iconBtn: "rounded-full p-2 hover:bg-gray-100 dark:hover:bg-neutral-800",
};

export function Button({ variant = "primary", className = "", ...props }) {
  const base = variant === "secondary" ? styles.btnSecondary : styles.btn;
  return React.createElement(
    "button",
    { className: `${base} ${className}`, ...props },
    props.children
  );
}
