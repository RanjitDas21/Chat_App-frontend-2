import { XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();

  const {onlineUsers} = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);

    // cleanup function
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div
      className="flex justify-between items-center bg-white border-b
   border-zinc-200 min-h-[76px] px-4 sm:px-6 flex-1"
    >
      <div className="flex items-center space-x-3 min-w-0">
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-11 rounded-full ring-1 ring-zinc-200">
            <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="text-zinc-900 font-semibold truncate">{selectedUser.fullName}</h3>
          <p className={`text-sm ${isOnline ? "text-accent-600" : "text-zinc-400"}`}>
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <button
        onClick={() => setSelectedUser(null)}
        className="size-9 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors flex-shrink-0"
      >
        <XIcon className="w-5 h-5 cursor-pointer" />
      </button>
    </div>
  );

}
export default ChatHeader;