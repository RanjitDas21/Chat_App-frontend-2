import { useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // preview the image (optional)
  const previewURL = URL.createObjectURL(file);
  setSelectedImg(previewURL);

  // Create formData
  const formData = new FormData();
  formData.append("profilePic", file);

  // Send to backend
  await updateProfile(formData);
};


  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
      {/* AVATAR */}
      <div className="avatar online">
        <button
          className="size-14 rounded-full overflow-hidden relative group"
          onClick={() => fileInputRef.current.click()}
        >
          <img
            src={selectedImg || authUser.profilePic || "/avatar.png"}
            alt="User image"
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-zinc-900/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <span className="text-white font-medium">Change</span>
          </div>
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* USERNAME & ONLINE TEXT */}
      <div>
        <h3 className="text-zinc-900 font-semibold text-[15px] max-w-[170px] truncate">
          {authUser.fullName}
        </h3>

        <p className="text-accent-600 text-xs font-medium">Online</p>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-1 items-center ml-1">
        {/* SOUND TOGGLE BTN */}
        <button
          className="text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors size-9 rounded-lg flex items-center justify-center"
          onClick={() => {
            // play click sound before toggling
            mouseClickSound.currentTime = 0; // reset to start
            mouseClickSound.play().catch((error) => console.log("Audio play failed:", error));
            toggleSound();
          }}
          title={isSoundEnabled ? "Mute sounds" : "Unmute sounds"}
        >
          {isSoundEnabled ? (
            <Volume2Icon className="size-[18px] cursor-pointer" />
          ) : (
            <VolumeOffIcon className="size-[18px] cursor-pointer" />
          )}
        </button>

        {/* LOGOUT BTN */}
        <button
          className="text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors size-9 rounded-lg flex items-center justify-center"
          onClick={logout}
          title="Log out"
        >
          <LogOutIcon className="size-[18px] cursor-pointer" />
        </button>
      </div>
    </div>
      </div>
    </div>
  );
}
export default ProfileHeader;