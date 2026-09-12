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

  <div className="relative p-6 w-full max-w-6xl h-dvh md:h-[800px] flex flex-col bg-slate-200 md:rounded-2xl md:border md:border-zinc-200 md:shadow-xl md:flex-row">

    {/* LEFT SIDE — profile + tab switch + list */}
    <div
      className={`
        w-full md:w-80
        flex flex-col border-zinc-200
        min-h-0
        ${selectedUser ? "hidden md:flex" : "flex"}
      `}
    >

      {/* PROFILE HEADER */}
        <ProfileHeader />

      {/* ACTIVE TAB SWITCH */}
      <ActiveTabSwitch />

      {/* LIST PANE */}
      <div
        className="
          flex-1
          overflow-y-auto
          p-3
          space-y-2
          min-h-0
        "
      >
        {activeTab === "chats" ? <ChatList /> : <ContactList />}
      </div>

    </div>

    {/* RIGHT SIDE — CONVERSATION PANE */}
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

);

}
export default ChatPage;