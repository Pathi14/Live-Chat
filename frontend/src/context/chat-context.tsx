import { Conversation, Message } from "@/components/sidebar/sidebar";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react";

const defaultChatContext = {
  conversations: [],
  activeConversationIndex: 0,
  setActiveConversationIndex: () => {},
  activeMessages: [],
  setActiveMessages: () => {},
};

type ChatContextType = {
  conversations: Conversation[];
  activeConversationIndex: number;
  activeMessages: Message[];
  setActiveMessages: Dispatch<SetStateAction<Message[]>>;
  setActiveConversationIndex: Dispatch<SetStateAction<number>>;
};

export const ChatContext = createContext<ChatContextType>(defaultChatContext);

export default function ChatContextProvider({
  conversations,
  children,
}: {
  conversations: Conversation[];
  children: React.ReactNode;
}) {
  const [activeConversationIndex, setActiveConversationIndex] =
    useState<number>(0);

  const [activeMessages, setActiveMessages] = useState<Message[]>(
    conversations[activeConversationIndex].messages
  );

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeConversationIndex,
        setActiveConversationIndex,
        activeMessages,
        setActiveMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
