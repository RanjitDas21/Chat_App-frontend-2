import { MessageCircleIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function NoChatFound() {
  const { setActiveTab } = useChatStore();

  return (
    <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
      <div className="w-16 h-16 bg-accent-50 rounded-full flex items-center justify-center">
        <MessageCircleIcon className="w-8 h-8 text-accent-600" />
      </div>
      <div>
        <h4 className="text-zinc-800 font-medium mb-1">No conversations yet</h4>
        <p className="text-zinc-500 text-sm px-6">
          Start a new chat by selecting a contact from the contacts tab
        </p>
      </div>
      <button
        onClick={() => setActiveTab("contacts")}
        className="px-4 py-2 text-sm font-medium text-accent-700 bg-accent-50 rounded-lg hover:bg-accent-100 transition-colors"
      >
        Find contacts
      </button>
    </div>
  );

}
export default NoChatFound;