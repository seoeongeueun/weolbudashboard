import { lightenColor } from "@/lib/helpers";

export function Tag({ label, color }: { label: string; color: string }) {
  const bgColor = color ? lightenColor(color, 0.5) : undefined;

  return (
    <span
      role="badge"
      style={{ backgroundColor: bgColor, color: color }}
      className="inline-block text text-xs font-bold px-2 rounded-xs"
    >
      {label}
    </span>
  );
}
