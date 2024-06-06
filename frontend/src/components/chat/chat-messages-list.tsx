import { cn } from "@/lib/utils";
import React from "react";
import ChatBottombar from "./chat-bottombar";
import { AnimatePresence, motion } from "framer-motion";
import { Message, User } from "../sidebar/sidebar";
import { useChatContext } from "@/hooks/useChatContext";

interface ChatMessagesListProps {
  messages: Message[];
  interlocutor: User;
}

export function ChatMessagesList({
  messages,
  interlocutor,
}: ChatMessagesListProps) {
  const { activeMessages, setActiveMessages } = useChatContext();
  const handleSendMessage = (newMessage: Message) => {};

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full max-h-full flex flex-col">
      <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
        <AnimatePresence>
          {activeMessages.map((message, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: messages.indexOf(message) * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                message.sender.id !== interlocutor.id
                  ? "items-end"
                  : "items-start"
              )}
            >
              <div className="flex gap-3 items-center">
                <span
                  className={cn(
                    "bg-accent p-3 rounded-md max-w-xs font-medium",
                    message.sender.id !== interlocutor.id &&
                      "bg-[#494abc] text-white"
                  )}
                >
                  {message.content}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <ChatBottombar onSendMessage={handleSendMessage} />
    </div>
  );
}
