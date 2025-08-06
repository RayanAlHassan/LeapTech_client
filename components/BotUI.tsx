"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

interface ChatMessage {
  role: "user" | "bot";
  content: string;
}

const BotUI: React.FC = () => {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [chat, setChat] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setChat([
        {
          role: "bot",
          content: "💭 I’m your Leap Assistant, feel free to chat with me",
        },
      ]);
    }, 500); // half a second delay
  
    return () => clearTimeout(timer);
  }, []);
  
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: "user", content: input };
    setChat((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/chatbot/`,
        { message: input }
      );

      const botMessage: ChatMessage = {
        role: "bot",
        content: response.data.reply,
      };
      setChat((prev) => [...prev, botMessage]);
    } catch {
      setChat((prev) => [
        ...prev,
        { role: "bot", content: "Error contacting the chatbot." },
      ]);
    }

    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <>
      {/* Uiverse Floating Button */}
      <div
        className="tooltip-container"
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1050,
        }}
        onClick={() => setIsOpen(true)}
        role="button"
        aria-label="Toggle Chatbot"
      >
      

        <div className="text">
          <a className="icon" href="#" onClick={(e) => e.preventDefault()}>
          <div className={`layer ${isOpen ? "active" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span className="svg">
                <svg
                  fill="#fff"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                  width={30}
                  height={30}
                >
                  <path d="M80 0L32 96v352h128v64h64l64-64h96l128-128V0H80zm384 288l-64 64h-96l-64 64v-64H128V64h336v224zm-72-160h-32v96h32V128zm-80 0h-32v96h32V128z"></path>
                </svg>
              </span>
            </div>
          </a>
        </div>
      </div>

      {/* Chatbox Panel */}
      {isOpen && (
        <div
          className="container my-5 d-flex justify-content-center"
          style={{
            position: "fixed",
            bottom:  70,
            right: 20,
            width: 500,
            maxWidth: "90%",
            zIndex: 1050,
          }}
        >
          <div className="card shadow" style={{ width: "100%" }}>
            <div className="card-header d-flex justify-content-between align-items-center bg-white">
              <h5 className="mb-0">Chatbot Assistant</h5>
              <span
                className="badge bg-danger"
                style={{ cursor: "pointer" }}
                onClick={() => setIsOpen(false)}
              >
                X
              </span>
            </div>

            <div
              className="card-body overflow-auto d-flex flex-column gap-2"
              style={{ height: "400px", backgroundColor: "#f8f9fa" }}
            >
            {chat.map((msg, index) => (
  <div
    key={index}
    className={`d-inline-block px-3 py-2 rounded text-white text-sm ${
      msg.role === "user"
        ? "align-self-end"
        : "align-self-start bg-secondary"
    }`}
    style={{
      
      maxWidth: "75%",
      backgroundColor:
        msg.role === "user" ? "var(--navbar-bg)" : undefined,
    }}
  >
    {msg.role === "bot" ? (
  <span
  dangerouslySetInnerHTML={{
    __html: msg.content,
  }}
/>

    ) : (
      msg.content
    )}
  </div>
))}

              <div ref={bottomRef}></div>
            </div>

            <div className="card-footer bg-white">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  autoFocus
                />
                <button
                  className="btn"
                  onClick={sendMessage}
                  style={{
                    backgroundColor: "var(--navbar-bg)",
                    color: "#fff",
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
   
        </div>
      )}

    </>
  );
};

export default BotUI;
