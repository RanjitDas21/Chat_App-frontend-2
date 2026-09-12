import { MessageCircleIcon } from "lucide-react";

const NoChatHistoryPlaceholder = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="w-16 h-16 bg-white border border-zinc-200 shadow-sm rounded-full flex items-center justify-center mb-5">
        <MessageCircleIcon className="size-8 text-accent-600" />
      </div>
      <h3 className="text-lg font-medium text-zinc-800 mb-3">
        Start your conversation with {name}
      </h3>
      <div className="flex flex-col space-y-3 max-w-md mb-5">
        <p className="text-zinc-500 text-sm">
          This is the beginning of your conversation. Send a message to start chatting!
        </p>
        <div className="h-px w-32 bg-zinc-200 mx-auto"></div>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        <button className="px-4 py-2 text-xs font-medium text-accent-700 bg-accent-50 rounded-full hover:bg-accent-100 transition-colors">
          👋 Say hello
        </button>
        <button className="px-4 py-2 text-xs font-medium text-accent-700 bg-accent-50 rounded-full hover:bg-accent-100 transition-colors">
          🤝 How are you?
        </button>
        <button className="px-4 py-2 text-xs font-medium text-accent-700 bg-accent-50 rounded-full hover:bg-accent-100 transition-colors">
          📅 Meet up soon?
        </button>
      </div>
    </div>
  );

};

export default NoChatHistoryPlaceholder;