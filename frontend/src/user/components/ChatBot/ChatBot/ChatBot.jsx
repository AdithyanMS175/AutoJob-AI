import React, { useState, useEffect, useRef } from "react";
import { FaCommentDots, FaTimes, FaPaperPlane } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 🔧 EASY SIZE CONTROL
const CHAT_WIDTH = "w-[380px] md:w-[420px]";
const CHAT_HEIGHT = "h-[520px] md:h-[600px]";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    "How do I post a job as a recruiter?",
    "How does AutoJob match candidates using AI?",
    "Why is my job not getting applications?",
    "How can I shortlist or reject candidates?",
    "How do applicants upload their resume?",
    "How do I track the status of my job applications?",
    "What skills improve my chances of getting shortlisted?",
    "How does AutoJob prevent fake job postings?",
    "Can I edit or close a job after posting it?",
    "How does the AI score candidate resumes?"
  ];


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isOpen]);

  const callAIAPI = async (message) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });

      const data = await res.json();
      return data.response;
    } catch {
      return "AI service is currently unavailable. Please try again.";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, isBot: false }]);
    setInput("");
    setIsLoading(true);

    const aiReply = await callAIAPI(input);
    setMessages(prev => [...prev, { text: aiReply, isBot: true }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* CHAT WINDOW */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 md:right-6 z-50">
          <div
            className={`bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden
            ${CHAT_WIDTH} ${CHAT_HEIGHT}`}
          >
            {/* HEADER */}
            <div className="bg-purple-700 text-black px-4 py-3 flex justify-between items-center">
              <h3 className="font-semibold text-sm">
                No-Code AI Support Assistant
              </h3>
              <button onClick={() => setIsOpen(false)}>
                <FaTimes />
              </button>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-3">
              {/* Welcome */}
              <div className="bg-blue-100 p-3 rounded-lg text-sm text-slate-700">
                <p className="font-medium mb-1">I can help with:</p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Technical issues</li>
                  <li>Feature explanations</li>
                  <li>No-code guidance</li>
                  <Link to="/user/Complaint" className="text-purple-600 underline">
                    Report an issue
                  </Link>
                </ul>
              </div>

              {/* Suggested */}
              <div className="space-y-2">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(q)}
                    className="text-left text-xs px-3 text-black py-2 rounded-full border bg-white hover:bg-slate-100 w-full"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Chat messages */}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] p-3 rounded-xl text-sm mb-2 ${msg.isBot
                      ? "bg-white border border-slate-200 text-slate-800 self-start shadow-sm"
                      : "bg-purple-700 text-white self-end ml-auto"
                    }`}
                >
                  {msg.isBot ? (
                    <div className="prose prose-sm max-w-none prose-slate">
                      <ReactMarkdown
                        components={{
                          // Styling headers
                          h3: ({ node, ...props }) => <h3 className="font-bold text-base mt-2 mb-1" {...props} />,
                          // Styling lists
                          ul: ({ node, ...props }) => <ul className="list-disc ml-4 space-y-1" {...props} />,
                          ol: ({ node, ...props }) => <ol className="list-decimal ml-4 space-y-1" {...props} />,
                          // Styling bold text
                          strong: ({ node, ...props }) => <span className="font-semibold text-purple-900" {...props} />,
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="text-xs text-black text-center">
                  AI is thinking…
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* INPUT */}
            <div className="p-3 flex gap-2 border-t text-black bg-white">
              <input
                className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none"
                placeholder="Ask something…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-purple-700 text-black px-3 rounded-lg disabled:opacity-50"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6
        w-14 h-14 rounded-full bg-purple-700 text-black shadow-lg
        flex items-center justify-center z-50 hover:scale-110 transition"
      >
        {isOpen ? <FaTimes /> : <FaCommentDots size={22} />}
      </button>
    </>
  );
};

export default ChatBot;
