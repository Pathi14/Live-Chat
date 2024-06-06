import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Info, Phone, Video } from "lucide-react";
import { Button } from "../ui/button";
import { User } from "../sidebar/sidebar";

interface ChatHeaderProps {
  interlocutor: User;
}

export const topbarIcons = [{ icon: Phone }, { icon: Video }, { icon: Info }];

export default function ChatHeader({ interlocutor }: ChatHeaderProps) {
  return (
    <div className="w-full h-20 flex p-4 justify-between items-center border-b">
      <div className="flex items-center gap-2">
        <Avatar className="flex justify-center items-center">
          <AvatarImage
            src="https://i.pravatar.cc/300"
            alt={interlocutor.name}
          />
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{interlocutor.name}</span>
          <span className="text-xs">Active 2 mins ago</span>
        </div>
      </div>

      <div>
        {topbarIcons.map((icon, index) => (
          <Button
            key={index}
            variant="ghost"
            className="dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
          >
            <icon.icon size={20} className="text-muted-foreground" />
          </Button>
        ))}
      </div>
    </div>
  );
}
