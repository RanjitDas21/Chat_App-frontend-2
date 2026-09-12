import { MessageCircleIcon } from "lucide-react";

const NoConversationPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="size-20 bg-white border border-zinc-200 shadow-sm rounded-full flex items-center justify-center mb-5">
        <MessageCircleIcon className="size-10 text-accent-600" />
      </div>
      <h3 className="text-lg font-semibold text-zinc-800 mb-2">Select a conversation</h3>
      <p className="text-zinc-500 max-w-md">
        Choose a contact from the sidebar to start chatting or continue a previous conversation.
      </p>
    </div>
  );

};

export default NoConversationPlaceholder;