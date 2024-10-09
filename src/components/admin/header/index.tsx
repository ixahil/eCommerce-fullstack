import { ModeToggle } from "@/components/mode-toggle";
import UserNav from "@/components/admin/header/user-nav";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface NavbarProps {
  title: string;
}

export function Header({ title }: NavbarProps) {
  return (
    <header className="bg-dashboard-bg dark:bg-[#09090B] sticky top-0 z-10 w-full backdrop-blur dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-4">
          <h1 className="font-bold">{title}</h1>
          <div className="flex items-center">
            <Link href={"/"} className="flex items-center gap-2">
              Go to Store
              <ExternalLink />
            </Link>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
