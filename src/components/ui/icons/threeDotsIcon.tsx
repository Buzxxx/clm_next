type classType = {
  className?: string;
};

export default function ThreeDotsIcon({ className = "w-8 h-8" }: classType) {
  const customClass = className + "";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={customClass}
    >
      <circle cx="12" cy="5" r="1.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="1.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="19" r="1.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
