import { ModeToggle } from "@/components/mode-toggle";
import UserNav from "@/components/admin/header/user-nav";

interface NavbarProps {
  title: string;
}

export function Header({ title }: NavbarProps) {
  return (
    <header className="bg-zinc-50 sticky top-0 z-10 w-full backdrop-blur dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          {/* <SheetMenu /> */}sheet menu
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
