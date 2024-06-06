import { ChatContext } from "@/context/chat-context";
import { useContext } from "react";

export function useChatContext() {
  const chatContextProps = useContext(ChatContext);

  return chatContextProps;
}
