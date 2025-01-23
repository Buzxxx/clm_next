import { Button } from "@/components/ui/button";

type classType = {
  className?: string;
  onClick: () => void;
};

export default function BackIcon({
  className = "w-20 h-20",
  onClick,
}: classType) {
  const customeClass = className + " " +  "text-black";
  return (
    <Button
      onClick={onClick}
      className={`bg-transparent border-none hover:bg-gray-100 text-black font-bold py-2 px-4 rounded ${customeClass}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
      </svg>
    </Button>
  );
}
