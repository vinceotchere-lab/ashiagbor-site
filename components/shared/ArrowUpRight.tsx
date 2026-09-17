export default function ArrowUpRight({
  className = "w-3 h-3",
  strokeWidth = 1.6,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      className={`inline-block shrink-0 stroke-current align-middle ${className}`}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2.2 7.8L7.8 2.2M7.8 2.2H3.6M7.8 2.2V6.4"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
