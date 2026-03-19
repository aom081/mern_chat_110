import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full h-full hidden md:flex flex-col items-center justify-center p-8 bg-base-100/50">
      <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
        <MessageSquare className="size-8 text-primary" />
      </div>
      <h2 className="text-xl font-semibold mb-2">Welcome to SE Chat</h2>
      <p className="text-base-content/70 text-center">
        Select a conversation from the sidebar to start chatting.
      </p>
    </div>
  );
};

export default NoChatSelected;
