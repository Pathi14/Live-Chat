"use client";
import SidebarHeader from "./sidebar-header";
import SidebarButton from "./sidebar-button";

export type User = {
  name: string;
};

export type Message = {
  content: string;
};

export type Conversation = {
  users: User[];
  messages: Message[];
};

interface SidebarProps {
  isCollapsed: boolean;
  conversations: Conversation[];
}

export function Sidebar({ conversations, isCollapsed }: SidebarProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      {!isCollapsed && (
        <SidebarHeader conversationsCount={conversations.length} />
      )}

      <div className="grid gap-5 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {conversations.map((conversation, index) => (
          <SidebarButton
            key={index}
            active={index === 0}
            collapsed={isCollapsed}
            conversation={conversation}
          />
        ))}
      </div>
    </div>
  );
}
