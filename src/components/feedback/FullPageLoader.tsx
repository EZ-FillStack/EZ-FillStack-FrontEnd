import { cn } from "@/lib/utils";
import LoadingSpinner from "./LoadingSpinner";

type FullPageLoaderProps = {
  minHeight?: string;
};

const FullPageLoader = ({ minHeight = "min-h-[200px]" }: FullPageLoaderProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        minHeight
      )}
      role="status"
      aria-label="페이지 로딩 중"
    >
      <LoadingSpinner size="lg" />
      <p className="text-sm text-muted-foreground">로딩 중...</p>
    </div>
  );
};

export default FullPageLoader;
