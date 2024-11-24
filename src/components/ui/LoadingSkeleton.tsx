export default function LoadingSkeleton() {
  return (
    <div role="status" className="w-full animate-skeleton">
      <div className="flex items-center content-between w-full h-[74px] mb-[5px] bg-background rounded-xl">
        <div className="flex items-center justify-between w-full px-8 h-[74px] mb-[5px] bg-background rounded-xl">
          <div className="h-[22px] rounded-full bg-sidebar-accent w-[30px] lg:w-[80px]"></div>
          <div className="h-[40px] flex flex-col">
            <div className="h-[18px] w-[50px] lg:w-[90px] rounded-full bg-sidebar-accent mb-2"></div>
            <div className="h-[12px] w-[40px] lg:w-[70px] rounded-full bg-sidebar-accent"></div>
          </div>
          <div className="h-[18px] rounded-full bg-sidebar-accent w-[90px] lg:w-[180px]"></div>
          <div className=" gap-2 hidden lg:flex">
            <div className="h-[38px] rounded-md bg-sidebar-accent lg:w-[50px]"></div>
            <div className="h-[38px] rounded-md bg-sidebar-accent lg:w-[50px]"></div>
          </div>
        </div>
      </div>
      <div className="flex items-center content-between w-full h-[74px] mb-[5px] bg-background rounded-xl opacity-80">
        <div className="flex items-center justify-between w-full px-8 h-[74px] mb-[5px] bg-background rounded-xl">
          <div className="h-[22px] rounded-full bg-sidebar-accent w-[30px] lg:w-[80px]"></div>
          <div className="h-[40px] flex flex-col">
            <div className="h-[18px] w-[50px] lg:w-[90px] rounded-full bg-sidebar-accent mb-2"></div>
            <div className="h-[12px] w-[40px] lg:w-[70px] rounded-full bg-sidebar-accent"></div>
          </div>
          <div className="h-[18px] rounded-full bg-sidebar-accent w-[90px] lg:w-[180px]"></div>
          <div className=" gap-2 hidden lg:flex">
            <div className="h-[38px] rounded-md bg-sidebar-accent lg:w-[50px]"></div>
            <div className="h-[38px] rounded-md bg-sidebar-accent lg:w-[50px]"></div>
          </div>
        </div>
      </div>
      <div className="flex items-center content-between w-full h-[74px] mb-[5px] bg-background rounded-xl opacity-50">
        <div className="flex items-center justify-between w-full px-8 h-[74px] mb-[5px] bg-background rounded-xl">
          <div className="h-[22px] rounded-full bg-sidebar-accent w-[30px] lg:w-[80px]"></div>
          <div className="h-[40px] flex flex-col">
            <div className="h-[18px] w-[50px] lg:w-[90px] rounded-full bg-sidebar-accent mb-2"></div>
            <div className="h-[12px] w-[40px] lg:w-[70px] rounded-full bg-sidebar-accent"></div>
          </div>
          <div className="h-[18px] rounded-full bg-sidebar-accent w-[90px] lg:w-[180px]"></div>
          <div className=" gap-2 hidden lg:flex">
            <div className="h-[38px] rounded-md bg-sidebar-accent lg:w-[50px]"></div>
            <div className="h-[38px] rounded-md bg-sidebar-accent lg:w-[50px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
