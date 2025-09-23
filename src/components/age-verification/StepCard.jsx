export default function StepCard({ title, subtitle, children }) {
  return (
    <div className="rounded-2xl border p-4">
      <div className="mb-3">
        <div className="font-medium">{title}</div>
        <div className="text-xs text-gray-500">{subtitle}</div>
      </div>
      {children}
    </div>
  );
}
