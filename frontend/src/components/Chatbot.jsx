import { FaCommentDots, FaTimes, FaUser, FaRobot } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { role: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setMessages([...newMessages, { role: "bot", text: data.response }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages([...newMessages, { role: "bot", text: "Error fetching response. Please try again." }]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={toggleChatbot}
        className="fixed z-50 p-4 text-white transition duration-300 ease-in-out transform rounded-full shadow-xl bottom-5 right-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 hover:shadow-indigo-500/30"
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
      >
        {isOpen ? <FaTimes size={24} /> : <FaCommentDots size={24} />}
      </button>

      {/* Chatbot Container */}
      <div
        className={`fixed bottom-20 right-5 w-96 bg-white rounded-2xl shadow-2xl transform transition-all duration-300 ease-in-out z-50 overflow-hidden border border-gray-100 ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-5 pointer-events-none"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
              <FaRobot className="text-xl text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">AI Assistant</h1>
              <p className="text-xs text-indigo-100">Always here to help</p>
            </div>
          </div>
          <button 
            onClick={toggleChatbot}
            className="transition-colors text-white/70 hover:text-white"
            aria-label="Close chatbot"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="p-4 space-y-4 overflow-y-auto h-80 bg-gray-50">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-3 bg-indigo-100 rounded-full">
                <FaRobot className="text-2xl text-indigo-600" />
              </div>
              <h3 className="mb-1 text-lg font-medium text-gray-700">Hello there!</h3>
              <p className="max-w-xs text-sm text-gray-500">I&apos;m your AI assistant. How can I help you today?</p>
            </div>
          )}
          
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start space-x-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "bot" && (
                <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full">
                  <FaRobot className="text-sm text-indigo-600" />
                </div>
              )}
              <div 
                className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.role === "user" 
                    ? "bg-indigo-600 text-white rounded-br-none" 
                    : "bg-white text-gray-800 rounded-bl-none shadow-sm"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
              {msg.role === "user" && (
                <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-indigo-600 rounded-full">
                  <FaUser className="text-sm text-white" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex items-start space-x-2">
              <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full">
                <FaRobot className="text-sm text-indigo-600" />
              </div>
              <div className="p-3 text-gray-800 bg-white rounded-bl-none shadow-sm rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-grow p-3 text-gray-800 transition-all border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              onClick={sendMessage}
              disabled={!userInput.trim()}
              className={`p-3 rounded-full transition-all ${
                userInput.trim() 
                  ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              aria-label="Send message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chatbot;
