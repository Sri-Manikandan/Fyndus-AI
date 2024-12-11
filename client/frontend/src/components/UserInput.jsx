import React, { useState, useEffect, useRef } from "react";
import { useChatbot } from "../hooks/useChatbot";

const UserInput = ({ setResponse, isChatbotReady, setIsChatbotReady }) => {
  const { initChatbot, sendMessage, error } = useChatbot(setResponse, setIsChatbotReady);

  useEffect(() => {
    initChatbot().then((ready) => {
      setIsChatbotReady(ready);
    });
  }, []);

  const [Text, setText] = useState("");
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setText(e.target.value);
    autoResize(e.target);
  };

  // Function to auto-resize the textarea
  const autoResize = (element) => {
    element.style.height = "auto";  // Reset the height
    element.style.height = element.scrollHeight + "px";  // Adjust height based on scroll
  };

  const handleSendMessage = () => {
    if (Text.trim()) {
      sendMessage(Text);
      setText(""); // Clear the input field after sending the message
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {isChatbotReady ? (
        <section className="flex flex-col items-center">
          <div className="w-full p-4 bg-white rounded-lg shadow-md">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col items-center gap-4"
            >
              <textarea
                ref={inputRef}
                value={Text}
                onChange={handleInputChange}
                className="resize-none w-full h-36 bg-gray-100 text-black p-4 text-lg border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type a message..."
              />
              <button
                type="button"
                onClick={handleSendMessage}
                className="w-full bg-blue-500 text-white p-3 rounded-md mt-2 hover:bg-blue-600 transition-all duration-300"
              >
                Send
              </button>
            </form>
          </div>
        </section>
      ) : (
        <div className="text-center text-gray-500">Loading...</div>
      )}
    </div>
  );
};

export default UserInput;
