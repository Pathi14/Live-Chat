import { ChatLayout } from "@/components/chat/chat-layout";
import Link from "next/link";

export default function Home() {
  return (
    <main className="grid grid-rows-[1fr_5fr] place-items-center min-h-screen pb-5">
      <h1 className="text-3xl font-bold text-gradient">
        <Link href="#">Live Chat</Link>
      </h1>

      <ChatLayout className="border rounded-lg max-w-[90%]" />
    </main>
  );
}
