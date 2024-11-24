export default function LoadingSkeletonLogs() {
  return (
    <div role="status" className="w-full animate-skeleton">
      <div className="flex items-center content-between w-full h-[74px] mb-[5px] bg-background rounded-xl">
        <div className="flex items-center justify-between w-full px-8 h-[74px] mb-[5px] bg-background rounded-xl">
          <div className="flex w-[30%] xl:w-[400px] items-center h-[18px] rounded-full bg-sidebar-accent "></div>
          <div className="h-[18px] w-[15%]  xl:w-[100px] rounded-full bg-sidebar-accent"></div>
          <div className="h-[18px] w-[20%] xl:w-[280px] rounded-full bg-sidebar-accent "></div>
        </div>
      </div>
      <div className="flex items-center content-between w-full h-[74px] mb-[5px] bg-background rounded-xl opacity-80">
        <div className="flex items-center justify-between w-full px-8 h-[74px] mb-[5px] bg-background rounded-xl">
          <div className="flex w-[30%] xl:w-[400px] items-center h-[18px] rounded-full bg-sidebar-accent "></div>
          <div className="h-[18px] w-[15%]  xl:w-[100px] rounded-full bg-sidebar-accent"></div>
          <div className="h-[18px] w-[20%] xl:w-[280px] rounded-full bg-sidebar-accent "></div>
        </div>
      </div>
      <div className="flex items-center content-between w-full h-[74px] mb-[5px] bg-background rounded-xl opacity-50">
        <div className="flex items-center justify-between w-full px-8 h-[74px] mb-[5px] bg-background rounded-xl">
          <div className="flex w-[30%] xl:w-[400px] items-center h-[18px] rounded-full bg-sidebar-accent "></div>
          <div className="h-[18px] w-[15%]  xl:w-[100px] rounded-full bg-sidebar-accent"></div>
          <div className="h-[18px] w-[20%] xl:w-[280px] rounded-full bg-sidebar-accent "></div>
        </div>
      </div>
    </div>
  );
}
