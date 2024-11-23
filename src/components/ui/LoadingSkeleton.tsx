export default function LoadingSkeleton() {
  return (
    <div role="status" className="w-full animate-skeleton">
      <div className="flex items-center content-between w-full h-[74px] mb-[5px] bg-background rounded-xl">
        <div className="flex items-center justify-between w-full px-8 h-[74px] mb-[5px] bg-background rounded-xl">
          <div className="h-[22px] rounded-full bg-sidebar-accent w-[80px]"></div>
          <div className="h-[40px] flex flex-col">
            <div className="h-[18px] w-[90px] rounded-full bg-sidebar-accent mb-2"></div>
            <div className="h-[12px] w-[70px] rounded-full bg-sidebar-accent"></div>
          </div>
          <div className="h-[18px] rounded-full bg-sidebar-accent w-[180px]"></div>
          <div className="flex gap-2">
            <div className="h-[38px] rounded-md bg-sidebar-accent w-[50px]"></div>
            <div className="h-[38px] rounded-md bg-sidebar-accent w-[50px]"></div>
          </div>
        </div>
      </div>
      <div className="flex items-center content-between w-full h-[74px] mb-[5px] bg-background rounded-xl opacity-80">
        <div className="flex items-center justify-between w-full px-8 h-[74px] mb-[5px] bg-background rounded-xl">
          <div className="h-[22px] rounded-full bg-sidebar-accent opacity-80 w-[80px]"></div>
          <div className="h-[40px] flex flex-col">
            <div className="h-[18px] w-[90px] rounded-full bg-sidebar-accent opacity-80 mb-2"></div>
            <div className="h-[12px] w-[70px] rounded-full bg-sidebar-accent opacity-80"></div>
          </div>
          <div className="h-[18px] rounded-full bg-sidebar-accent opacity-80 w-[180px]"></div>
          <div className="flex gap-2">
            <div className="h-[38px] rounded-md bg-sidebar-accent opacity-80 w-[50px]"></div>
            <div className="h-[38px] rounded-md bg-sidebar-accent opacity-80 w-[50px]"></div>
          </div>
        </div>
      </div>
      <div className="flex items-center content-between w-full h-[74px] mb-[5px] bg-background rounded-xl opacity-50">
        <div className="flex items-center justify-between w-full px-8 h-[74px] mb-[5px] bg-background rounded-xl">
          <div className="h-[22px] rounded-full bg-sidebar-accent opacity-50 w-[80px]"></div>
          <div className="h-[40px] flex flex-col">
            <div className="h-[18px] w-[90px] rounded-full bg-sidebar-accent opacity-50 mb-2"></div>
            <div className="h-[12px] w-[70px] rounded-full bg-sidebar-accent opacity-50"></div>
          </div>
          <div className="h-[18px] rounded-full bg-sidebar-accent opacity-50 w-[180px]"></div>
          <div className="flex gap-2">
            <div className="h-[38px] rounded-md bg-sidebar-accent opacity-50 w-[50px]"></div>
            <div className="h-[38px] rounded-md bg-sidebar-accent opacity-50 w-[50px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
