"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Trash2, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming this utility exists, otherwise I'll use standard template literals

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Xin chào! Tôi là AI hỗ trợ tìm vé xe. Bạn muốn đi đâu vào ngày mai?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    // Create a placeholder for the bot's response
    setMessages((prev) => [...prev, { role: "bot", content: "" }]);

    try {
      const response = await fetch(
        `http://localhost:8082/chat?q=${encodeURIComponent(userMessage)}`
      );

      if (!response.body) {
        throw new Error("ReadableStream not supported.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        botResponse += chunk;

        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage.role === "bot") {
            lastMessage.content = botResponse;
          }
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Error fetching chat response:", error);
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage.role === "bot") {
          lastMessage.content +=
            "\n(Xin lỗi, tôi đang gặp sự cố kết nối. Vui lòng thử lại sau.)";
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: "bot",
        content:
          "Xin chào! Tôi là AI hỗ trợ tìm vé xe. Bạn muốn đi đâu vào ngày mai?",
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header */}
          <div className="bg-primary p-4 flex items-center justify-between border-b bg-orange-600 text-white">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Bot className="w-6 h-6" />
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border border-white"></span>
              </div>
              <div>
                <h3 className="font-bold text-sm">Trợ lý ảo Bus Ticket</h3>
                <p className="text-xs text-orange-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block"></span>
                  Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                title="Xóa lịch sử chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user" ? "bg-orange-100" : "bg-white border"}`}
                >
                  {msg.role === "user" ? (
                    <User className="w-5 h-5 text-orange-600" />
                  ) : (
                    <Bot className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-orange-600 text-white rounded-tr-none"
                      : "bg-white text-gray-800 border rounded-tl-none"
                  }`}
                >
                  {msg.content}
                  {msg.role === "bot" &&
                    isLoading &&
                    index === messages.length - 1 &&
                    msg.content === "" && (
                      <span className="animate-pulse">...</span>
                    )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Hỏi về chuyến xe, giá vé..."
                className="w-full pl-4 pr-12 py-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 disabled:opacity-50 disabled:hover:bg-orange-600 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-14 h-14 bg-orange-600 text-white rounded-full shadow-lg hover:bg-orange-700 hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute right-full mr-3 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Tư vấn tìm vé
          </span>
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>
      )}
    </div>
  );
}
