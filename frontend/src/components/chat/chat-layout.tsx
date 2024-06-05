"use client";
import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { Sidebar } from "../sidebar/sidebar";
import { Chat } from "./chat";
import { conversations } from "../../../dummy";

interface ChatLayoutProps
  extends Omit<React.ComponentProps<typeof ResizablePanelGroup>, "direction"> {}

export function ChatLayout({ className, ...rest }: ChatLayoutProps) {
  const [isSidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className={cn("h-full items-stretch", className)}
      {...rest}
    >
      <ResizablePanel
        defaultSize={30}
        collapsedSize={8}
        collapsible={true}
        minSize={24}
        maxSize={30}
        onCollapse={() => {
          setSidebarCollapsed(true);
        }}
        onExpand={() => {
          setSidebarCollapsed(false);
        }}
        className={cn(
          isSidebarCollapsed &&
            "min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out"
        )}
      >
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          conversations={conversations}
        />
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={70} minSize={30}>
        <Chat
          messages={[]}
          selectedUser={{ id: 1, avatar: "", messages: [], name: "Paul-Henry" }}
          isMobile={false}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
