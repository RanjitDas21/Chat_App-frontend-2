import { useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!text.trim() && !fileInputRef.current.files[0]) return;
    const formData = new FormData();
    formData.append("text", text.trim());
    if (isSoundEnabled) playRandomKeyStrokeSound();

    if (fileInputRef.current.files[0]) {
    formData.append("image", fileInputRef.current.files[0]);
  }

    sendMessage(formData);
    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-3 sm:p-4 border-t border-zinc-200 bg-white">
      {imagePreview && (
        <div className="max-w-3xl mx-auto mb-3 flex items-center">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-zinc-200"
            />
            <button
              onClick={removeImage}
              type="button"
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-white hover:bg-zinc-700"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className="max-w-3xl mx-auto flex items-center gap-2 sm:gap-4"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            isSoundEnabled && playRandomKeyStrokeSound();
          }}
          className="flex-1 min-w-0 bg-zinc-100 border border-transparent rounded-xl py-2 px-3 text-sm sm:text-base
          text-zinc-900 placeholder-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-400/40 focus:bg-white focus:border-zinc-200"
          placeholder="Type your message..."
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Image Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl bg-zinc-100 transition-colors
          ${imagePreview ? "text-accent-600" : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-200"}`}
        >
          <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="flex-shrink-0 w-10 h-10 sm:w-auto sm:px-4 sm:py-2 flex items-center justify-center rounded-xl bg-accent-600 text-white hover:bg-accent-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <SendIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </form>
    </div>
  );
}
export default MessageInput;