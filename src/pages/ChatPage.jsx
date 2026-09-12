import { useChatStore } from "../store/useChatStore.js";
import ProfileHeader from "../components/ProfileHeader.jsx";
import ActiveTabSwitch from "../components/ActiveTabSwitch.jsx";
import ChatList from "../components/ChatList.jsx";
import ContactList from "../components/ContactList.jsx";
import ChatContainer from "../components/ChatContainer.jsx";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder.jsx";
import { useEffect } from "react";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  useEffect(() => {
      const hasReloaded = sessionStorage.getItem("homeReloaded");
  
      if (!hasReloaded) {
        sessionStorage.setItem("homeReloaded", "true");
        window.location.reload();
      }
    }, []);

  return (

    <div className="relative w-full max-w-6xl h-dvh md:h-[800px] flex flex-col
      bg-white md:rounded-2xl md:border md:border-zinc-200 md:shadow-xl md:shadow-zinc-200/60 overflow-hidden">

      {/* TOP BAR — profile + tab switch span the full width */}
      <div
        className={`
          flex items-center justify-between gap-4
          border-b border-zinc-200 px-4 sm:px-6 py-3
          ${selectedUser ? "hidden md:flex" : "flex"}
        `}
      >
        <ProfileHeader />
        <ActiveTabSwitch />
      </div>

      {/* BODY — list pane + conversation pane, side by side */}
      <div className="flex flex-1 min-h-0">
        {/* LIST PANE */}
        <div
          className={`
            w-full md:w-80 flex-shrink-0
            border-r border-zinc-200
            overflow-y-auto p-3 space-y-1.5 min-h-0
            ${selectedUser ? "hidden md:block" : "block"}
          `}
        >
          {activeTab === "chats" ? <ChatList /> : <ContactList />}
        </div>

        {/* CONVERSATION PANE */}
        <div
          className={`
            flex-1 flex-col min-h-0
            bg-zinc-50
            ${!selectedUser ? "hidden md:flex" : "flex"}
          `}
        >
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </div>
    </div>
  );
}
export default ChatPage;