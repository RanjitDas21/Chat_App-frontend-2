import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UserLoadingSkeleton from "./UserLoadingSkeleton";
import NoChatFound from "./NoChatFound";
import { useAuthStore } from "../store/useAuthStore";

function ChatList() {
  const {
    getMyChatPartners,
    chats,
    isUsersLoading,
    setSelectedUser,
    selectedUser,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UserLoadingSkeleton />;

  if (chats.length === 0) return <NoChatFound />;

  return (
    <>
      {chats.map((chat) => {
        const isSelected = selectedUser?._id === chat._id;

        return (
          <div
            key={chat._id}
            className={`p-4 rounded-xl cursor-pointer transition-colors ${
              isSelected
                ? "bg-accent-500"
                : "hover:bg-accent-500"
            }`}
            onClick={() => setSelectedUser(chat)}
          >
            <div className="flex items-center gap-3">
              <div
                className={`avatar ${
                  onlineUsers.includes(chat._id)
                    ? "online"
                    : "offline"
                }`}
              >
                <div className="size-12 rounded-full">
                  <img
                    src={chat.profilePic || "/avatar.png"}
                    alt={chat.fullName}
                  />
                </div>
              </div>

              <h4 className="text-zinc-800 font-medium truncate">
                {chat.fullName}
              </h4>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ChatList;
