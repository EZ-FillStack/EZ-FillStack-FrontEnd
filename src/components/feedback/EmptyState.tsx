// OO가 없을 때 empty로 사용
type EmptyStateProps = {
   message: string;
};

const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
      <p className="text-sm font-medium text-muted">{message}</p>
    </div>
  );
};

export default EmptyState;
