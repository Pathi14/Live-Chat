import { MoreHorizontalIcon, SquarePenIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface SidebarHeaderProps {
  conversationsCount: number;
}

export default function SidebarHeader({
  conversationsCount,
}: SidebarHeaderProps) {
  return (
    <div className="flex justify-between p-2 items-center">
      <div className="flex gap-2 items-center text-2xl">
        <p className="font-medium">Chats</p>
        <span className="text-zinc-300">({conversationsCount})</span>
      </div>

      <div>
        <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
          <Link href="#">
            <MoreHorizontalIcon size={20} />
          </Link>
        </Button>

        <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
          <Link href="#">
            <SquarePenIcon size={20} />
          </Link>
        </Button>
      </div>
    </div>
  );
}
