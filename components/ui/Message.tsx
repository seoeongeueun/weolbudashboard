import { TriangleAlert, CircleCheck } from "lucide-react";
import type { RequestStatus } from "@/types";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export function Message({ status }: { status: RequestStatus }) {
  if (status.type !== "success" && status.type !== "error") {
    return null;
  }

  return (
    <aside
      role="alert"
      aria-live="polite"
      className={twMerge(
        clsx("flex flex-row gap-1 items-center p-3 border rounded-sm", {
          "bg-error/10 border-error text-error": status.type === "error",
          "bg-theme/10 border-theme text-theme": status.type === "success",
        }),
      )}
    >
      {status.type === "error" && (
        <TriangleAlert className="w-4 h-4" aria-hidden="true" />
      )}
      {status.type === "success" && (
        <CircleCheck className="w-4 h-4" aria-hidden="true" />
      )}
      <span>{status.message}</span>
    </aside>
  );
}
