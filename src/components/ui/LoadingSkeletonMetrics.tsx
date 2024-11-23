export default function LoadingSkeletonMetrics() {
  return (
    <div
      role="status"
      className="w-full animate-skeleton bg-background rounded-xl h-[443px] p-6"
    >
      <div className="w-[100px] bg-sidebar-accent h-[30px] rounded-full"></div>
      <div className="w-[150px] bg-sidebar-accent h-[15px] rounded-full mt-2"></div>
    </div>
  );
}
