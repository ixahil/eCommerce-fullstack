import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectSidebar, setIsOpen } from "@/store/slice/sidebar-slice";
import { ChevronLeft } from "lucide-react";

export function SidebarToggle() {
  const { isOpen } = useAppSelector(selectSidebar);
  const dispatch = useAppDispatch();

  return (
    <div className="invisible lg:visible absolute top-[12px] -right-[16px] z-20">
      <Button
        onClick={() => dispatch(setIsOpen(!isOpen))}
        className="rounded-md w-8 h-8"
        variant="outline"
        size="icon"
      >
        <ChevronLeft
          className={cn(
            "h-4 w-4 transition-transform ease-in-out duration-700",
            !isOpen ? "rotate-180" : "rotate-0"
          )}
        />
      </Button>
    </div>
  );
}
