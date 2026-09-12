import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UserLoadingSkeleton from "./UserLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } = useChatStore();

  const {onlineUsers} = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UserLoadingSkeleton />;

  return (
    
      (allContacts && allContacts?.filteredUsers?.length > 0) &&
      <>
      {allContacts?.filteredUsers?.map((contact) => (
        <div
          key={contact._id}
          className="p-4 rounded-xl cursor-pointer hover:bg-zinc-100 transition-colors"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar ${onlineUsers.includes(contact._id) ? "online" : "offline"}`}>
              <div className="size-12 rounded-full">
                <img src={contact.profilePic || "/avatar.png"} />
              </div>
            </div>
            <h4 className="text-zinc-800 font-medium">{contact.fullName}</h4>
          </div>
        </div>
      ))}
    </>
    
  );

}
export default ContactList;