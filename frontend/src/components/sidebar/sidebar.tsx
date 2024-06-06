"use client";
import SidebarHeader from "./sidebar-header";
import SidebarButton from "./sidebar-button";
import { useChatContext } from "@/hooks/useChatContext";

export type User = {
  id: string;
  name: string;
};

export type Message = {
  sender: User;
  receiver: User;
  content: string;
};

export type Conversation = {
  id: string;
  users: User[];
  messages: Message[];
};

interface SidebarProps {
  isCollapsed: boolean;
}

export function Sidebar({ isCollapsed }: SidebarProps) {
  const { conversations, activeConversationIndex, setActiveConversationIndex } =
    useChatContext();

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
            active={activeConversationIndex === index}
            collapsed={isCollapsed}
            conversation={conversation}
            OnMouseDown={() => setActiveConversationIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
