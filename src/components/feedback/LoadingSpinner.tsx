import { cn } from "@/lib/utils";

type LoadingSpinnerProps = {
  size?: "sm" | "default" | "lg";
};

const LoadingSpinner = ({ size = "default" }: LoadingSpinnerProps) => {
  return (
    <div
      role="status"
      aria-label="로딩 중"
      className={cn(
        "rounded-full border-2 border-primary border-t-transparent animate-spin",
        size === "sm" && "h-4 w-4",
        size === "default" && "h-6 w-6",
        size === "lg" && "h-8 w-8"
      )}
    />
  );
};

export default LoadingSpinner;
