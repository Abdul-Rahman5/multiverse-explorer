import classNames from "classnames";

interface StatusBadgeProps {
  status: "Alive" | "Dead" | "unknown";
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const badgeClass = classNames(
    "inline-flex items-center  rounded-full border px-3 py-1.5 text-xs font-bold",
    {
      "border-green-500 bg-green-500 text-white":
        status === "Alive",

      "border-red-500 bg-red-500 text-white":
        status === "Dead",

      "border-gray-400 bg-gray-500 text-white":
        status === "unknown",
    }
  );

  const dotClass = classNames(
    "mr-2 h-2 w-2 rounded-full bg-white",
  );

  return (
    <span className={badgeClass}>
      <span className={dotClass} />
      {status}
    </span>
  );
}