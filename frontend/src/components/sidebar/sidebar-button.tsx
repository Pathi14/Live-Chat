"use client";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Conversation } from "./sidebar";

interface SidebarButtonProps {
  collapsed: boolean;
  active: boolean;
  conversation: Conversation;
  OnMouseDown: () => void;
}

export default function SidebarButton({
  collapsed,
  active,
  conversation,
  OnMouseDown,
}: SidebarButtonProps) {
  const interlocutor = conversation.users[1];

  if (collapsed) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <Button
              variant={active ? "secondary" : "ghost"}
              className="h-12"
              onMouseDown={OnMouseDown}
            >
              <Avatar>
                <AvatarImage
                  src="https://i.pravatar.cc/300"
                  alt={interlocutor.name}
                />
              </Avatar>
              <span className="sr-only"></span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="flex items-center gap-4">
            {interlocutor.name}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Button
      variant={active ? "secondary" : "ghost"}
      className="flex justify-start items-center gap-5 h-12"
      onMouseDown={OnMouseDown}
    >
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/300" alt={interlocutor.name} />
      </Avatar>

      <p>{interlocutor.name}</p>
    </Button>
  );
}
