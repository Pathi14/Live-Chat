import { useChatContext } from "@/hooks/useChatContext";
import ChatHeader from "./chat-header";
import { ChatMessagesList } from "./chat-messages-list";
import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export function Chat() {
  const { conversations, activeConversationIndex } = useChatContext();
  const activeConversation = conversations[activeConversationIndex];
  const { user: currentUser } = useAuth();

  useEffect(() => console.log(activeConversation), [activeConversationIndex]);

  const interlocutor = activeConversation.users.find(
    (user) => user.id !== currentUser?.id
  );

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatHeader interlocutor={interlocutor!} />

      <ChatMessagesList
        messages={activeConversation.messages}
        interlocutor={interlocutor!}
      />
    </div>
  );
}
