import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import Link from "next/link";

type Props = {
  search: boolean;
  button: {
    label: string;
    href: string;
  };
};

export const TopBar = ({
  button = { label: "Add", href: "/new" },
  search = false,
}: Props) => {
  return (
    <div className="mb-5 flex justify-between w-full">
      {search && <SearchInput />}
      <Button asChild>
        <Link href={button.href}>{button.label}</Link>
      </Button>
    </div>
  );
};

export function SearchInput() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder="Search..." />
      <Button type="submit">Search</Button>
    </div>
  );
}
