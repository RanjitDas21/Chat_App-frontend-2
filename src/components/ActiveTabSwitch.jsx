import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="flex gap-1 bg-zinc-100 p-1 rounded-lg flex-shrink-0">
      <button
        onClick={() => setActiveTab("chats")}
        className={`px-3 sm:px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
          activeTab === "chats"
            ? "bg-white text-zinc-900 shadow-sm"
            : "text-zinc-500 hover:text-zinc-700"
        }`}
      >
        Chats
      </button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`px-3 sm:px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
          activeTab === "contacts"
            ? "bg-white text-zinc-900 shadow-sm"
            : "text-zinc-500 hover:text-zinc-700"
        }`}
      >
        Contacts
      </button>
    </div>
  );
}
export default ActiveTabSwitch;