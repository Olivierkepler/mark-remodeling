"use client";

import {
  X,
  Mic,
  MicOff,
  RotateCcw,
  Sun,
  Moon,
  Copy,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
const [showMore, setShowMore] = useState(false);


import EstimatorPanel from "@/app/components/EstimatorPanel";

/* ----------------------------------------------------
   Type Definitions
---------------------------------------------------- */

interface SpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface WindowWithSpeechRecognition extends Window {
  SpeechRecognition?: new () => SpeechRecognition;
  webkitSpeechRecognition?: new () => SpeechRecognition;
}

type Role = "user" | "assistant";

type Message = {
  id: string;
  role: Role;
  content: string;
  time: string;
};

const STORAGE_KEY = "chatbot-messages-v1";
const createId = () => Math.random().toString(36).slice(2);

export default function Chatbot() {
  /* ----------------------------------------------------
     Local State
  ---------------------------------------------------- */

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "assistant",
      content: "Hello! How can I assist you today? 😊",
      time: new Date().toISOString(),
    },
  ]);

  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [estimatorOpen, setEstimatorOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const typewriterTimeoutRef = useRef<number | null>(null);

  const isDark = theme === "dark";

  /* ----------------------------------------------------
     Helpers
  ---------------------------------------------------- */

  const formatTime = (iso?: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const safeText = (str: string) => str.replace(/[\u0000-\u001F]+/g, " ");

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  /* ----------------------------------------------------
     Clear Chat
  ---------------------------------------------------- */

  const clearChat = () => {
    setMessages([
      {
        id: createId(),
        role: "assistant",
        content: "Hello! How can I assist you today? 😊",
        time: new Date().toISOString(),
      },
    ]);
    window.localStorage.removeItem(STORAGE_KEY);
    clearTypewriter();
  };

  /* ----------------------------------------------------
     Load + Save Message History
  ---------------------------------------------------- */

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Message[];
        if (parsed.length) setMessages(parsed);
      } catch (e) {
        console.error("Failed to parse stored messages:", e);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(scrollToBottom, [messages, typingText, loading]);

  /* ----------------------------------------------------
     Voice Recognition
  ---------------------------------------------------- */

  const initRecognition = (): SpeechRecognition | null => {
    const SpeechRecognitionClass =
      (window as WindowWithSpeechRecognition).SpeechRecognition ||
      (window as WindowWithSpeechRecognition).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) return null;

    const rec = new SpeechRecognitionClass();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
    };

    rec.onerror = (e) => {
      console.error("Speech recognition error:", e.error);
      setIsRecording(false);
    };

    rec.onend = () => setIsRecording(false);

    return rec;
  };

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    const rec = initRecognition();
    if (!rec) return alert("Speech recognition unsupported");

    recognitionRef.current = rec;
    setIsRecording(true);
    rec.start();
  };

  /* ----------------------------------------------------
     Typewriter Effect
  ---------------------------------------------------- */

  const clearTypewriter = () => {
    if (typewriterTimeoutRef.current) {
      window.clearTimeout(typewriterTimeoutRef.current);
    }
    setTypingText("");
  };

  const runTypewriter = (text: string, onDone: () => void) => {
    clearTypewriter();
    const clean = safeText(text);
    let idx = 0;

    const step = () => {
      setTypingText((prev) => prev + clean.charAt(idx));
      idx++;

      if (idx < clean.length) {
        const prevChar = clean.charAt(idx - 1);
        const delay = prevChar === "." || prevChar === "!" ? 120 : 20;
        typewriterTimeoutRef.current = window.setTimeout(step, delay);
      } else onDone();
    };

    step();
  };

  /* ----------------------------------------------------
     Chat API
  ---------------------------------------------------- */

  type ChatApiResponse = {
    reply?: string;
    error?: string;
  };

  const fetchReply = async (chatMessages: Message[]): Promise<string> => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: chatMessages }),
    });

    const data = (await res.json()) as ChatApiResponse;

    if (!res.ok) throw new Error(data.error || "Request failed.");

    return data.reply ?? "I’m not sure how to respond to that.";
  };

  /* ----------------------------------------------------
     Send Message
  ---------------------------------------------------- */

  const sendMessage = async () => {
    if (!input.trim() || loading || typingText) return;

    const content = /^\d+$/.test(input.trim())
      ? `The room size is ${input.trim()} square feet.`
      : input.trim();

    const userMsg: Message = {
      id: createId(),
      role: "user",
      content,
      time: new Date().toISOString(),
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const reply = await fetchReply(updated);

      runTypewriter(reply, () => {
        setMessages((prev) => [
          ...prev,
          {
            id: createId(),
            role: "assistant",
            content: reply,
            time: new Date().toISOString(),
          },
        ]);
        setTypingText("");
        setLoading(false);
      });
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          content: "Something went wrong. Please try again.",
          time: new Date().toISOString(),
        },
      ]);
      setTypingText("");
      setLoading(false);
    }
  };

  /* ----------------------------------------------------
     Markdown Renderer
  ---------------------------------------------------- */

  const copyToClipboard = (text: string) =>
    navigator?.clipboard?.writeText(text);

  const markdownComponents: Partial<Components> = {
    code: (props: {
      inline?: boolean;
      className?: string;
      children?: React.ReactNode;
    }) => {
      const { inline, className, children } = props;
      const code = String(children ?? "").trim();
  
      if (inline) {
        return (
          <code className="px-1 py-0.5 rounded bg-black/10 text-xs font-mono">
            {children}
          </code>
        );
      }
  
      return (
        <div className="relative group my-2">
          <button
            onClick={() => copyToClipboard(code)}
            className="
              absolute top-2 right-2 text-[10px] px-2 py-1 
              rounded-full bg-black/20 hover:bg-black/30 
              opacity-0 group-hover:opacity-100 transition text-white
            "
          >
            <Copy className="w-3 h-3" />
          </button>
  
          <pre className="text-xs md:text-sm rounded-xl p-3 overflow-auto bg-slate-900/95 text-slate-100">
            <code className={className}>{code}</code>
          </pre>
        </div>
      );
    },
  };
  

  /* ----------------------------------------------------
     Estimator → Chat
  ---------------------------------------------------- */

  const handleEstimatorSendToChat = (markdown: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: createId(),
        role: "assistant",
        content: markdown,
        time: new Date().toISOString(),
      },
    ]);
  };

  /* ----------------------------------------------------
     UI Rendering
  ---------------------------------------------------- */

  return (
    <div className="relative">
    {/* Floating Chat Button (only when closed) */}
{!open && (
  <button
    onClick={() => setOpen(true)}
    className="
      fixed z-50 bottom-4 right-4 
      p-3 sm:p-4 rounded-full shadow-2xl
      transition-all duration-300 cursor-pointer 
      bg-gradient-to-br from-orange-500 to-orange-600
      hover:scale-110 hover:shadow-[0_0_20px_rgba(255,140,0,0.6)]
      text-white flex items-center justify-center
    "
  >
    <Image
      src="/images/robot.png"
      alt="robot"
      width={60}
      height={60}
      className="rounded-full sm:w-[75px] sm:h-[75px]"
    />
  </button>
)}


      {/* Chat Window */}
      {open && (
        <div
          className={`
            fixed 
            bottom-20 sm:bottom-24 
            right-2 sm:right-4
            w-[95vw] sm:w-[460px] md:w-[650px] 
            ${estimatorOpen ? "md:w-[90vw] xl:w-[1200px]" : ""}
            h-[80vh] sm:h-[85vh] md:h-[90vh]
            max-w-[95vw]
            rounded-2xl p-3 sm:p-4 
            z-40 shadow-2xl border
            animate-in slide-in-from-bottom fade-in duration-300
            flex flex-col
            ${
              isDark
                ? "backdrop-blur-xl bg-slate-900/90 border-slate-700 text-slate-50"
                : "backdrop-blur-xl bg-white/80 border-white/40 text-gray-900"
            }
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 p-2 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src="/images/robot.png"
                  alt="robot"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                {(loading || typingText) && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border border-white animate-pulse" />
                )}
              </div>

              <div>
                <div className="font-semibold">Customer Support</div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400">
                  {loading || typingText ? "AI is typing..." : "Online"}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Estimator toggle */}
              <button
                onClick={() => setEstimatorOpen((prev) => !prev)}
                className="
                  hidden sm:inline-flex items-center justify-center px-3 py-1.5
                  rounded-full border border-white/40 bg-white/20
                  hover:bg-white/40 text-[11px]
                "
              >
                {estimatorOpen ? "Hide Estimation" : "Estimation"}
              </button>

              {/* Clear Chat */}
              <button
                onClick={clearChat}
                className="
                  inline-flex items-center justify-center w-7 h-7 
                  rounded-full border border-white/40 bg-white/20 hover:bg-white/40
                "
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Theme */}
              <button
                onClick={() =>
                  setTheme((prev) => (prev === "light" ? "dark" : "light"))
                }
                className="
                  inline-flex items-center justify-center w-7 h-7 
                  rounded-full border border-white/40 bg-white/20 hover:bg-white/40
                "
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                className="
                  inline-flex items-center justify-center w-7 h-7 
                  rounded-full border border-white/40 bg-white/20 hover:bg-white/40
                "
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-1 gap-3 mt-2 overflow-hidden">
            {/* Estimator Panel */}
            <div
              className={`
                transition-all duration-300 ease-out
                ${
                  estimatorOpen
                    ? "w-full md:w-[420px] lg:w-[550px] xl:w-[600px]"
                    : "w-0"
                }
                overflow-hidden
              `}
            >
              <EstimatorPanel
                open={estimatorOpen}
                onClose={() => setEstimatorOpen(false)}
                onSendToChat={handleEstimatorSendToChat}
                isDark={isDark}
              />
            </div>

            {/* Chat Messages */}
            <div className="flex flex-1 flex-col">
              <div className="flex-1 overflow-y-auto px-3 py-2 sm:p-4 space-y-3 sm:space-y-4 custom-scroll">
                {messages.map((m) => {
                  const isUser = m.role === "user";
                  const isLastAssistant =
                    m.role === "assistant" &&
                    messages.filter((mm) => mm.role === "assistant").slice(-1)[0]
                      ?.id === m.id;

                  return (
                    <div
                      key={m.id}
                      className={`
                        relative max-w-[90%] md:max-w-[80%] px-4 py-3 
                        rounded-2xl text-sm shadow-sm
                        ${
                          isUser
                            ? "ml-auto bg-orange-100 text-gray-900"
                            : isDark
                            ? "bg-slate-800 text-slate-50 border border-slate-700"
                            : "bg-white border border-white/60 text-gray-800"
                        }
                      `}
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                        components={markdownComponents}
                      >
                        {m.content}
                      </ReactMarkdown>

                      {/* Footer */}
                      <div className="mt-2 flex items-center justify-between text-[10px] text-gray-500 dark:text-gray-400">
                        <span>{formatTime(m.time)}</span>

                        {isLastAssistant && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => copyToClipboard(m.content)}
                              className="
                                inline-flex items-center gap-1 px-2 py-1 
                                rounded-full bg-black/5 hover:bg-black/10
                              "
                            >
                              <Copy className="w-3 h-3" />
                              Copy
                            </button>

                            <button
                              onClick={sendMessage}
                              className="
                                inline-flex items-center gap-1 px-2 py-1 
                                rounded-full bg-black/5 hover:bg-black/10
                              "
                            >
                              <RotateCcw className="w-3 h-3" />
                              Regenerate
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Typing */}
                {typingText && (
                  <div
                    className={`
                      max-w-[90%] md:max-w-[80%] px-4 py-3 
                      rounded-2xl text-sm shadow-sm
                      ${
                        isDark
                          ? "bg-slate-800 text-slate-50 border border-slate-700"
                          : "bg-white border border-white/60 text-gray-800"
                      }
                    `}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                      components={markdownComponents}
                    >
                      {typingText}
                    </ReactMarkdown>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Bar */}
              <div
                className={`
                  p-2 sm:p-3 rounded-xl mt-2 sm:mt-3 border
                  ${
                    isDark
                      ? "bg-slate-900/80 border-slate-700"
                      : "bg-white/70 border-white/60 backdrop-blur-xl"
                  }
                `}
              >
                <div className="flex gap-2 items-center">
                  {/* Mic Button */}
                  <button
                    onClick={toggleRecording}
                    className={`
                      flex items-center justify-center w-9 h-9 rounded-full border
                      ${
                        isRecording
                          ? "bg-red-500 text-white border-red-600 animate-pulse"
                          : isDark
                          ? "bg-slate-800 text-slate-100 border-slate-600"
                          : "bg-white text-gray-700 border-gray-300"
                      }
                    `}
                  >
                    {isRecording ? (
                      <MicOff className="w-4 h-4" />
                    ) : (
                      <Mic className="w-4 h-4" />
                    )}
                  </button>

                  {/* Text Input */}
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    className={`
                      flex-1 px-3 py-2 rounded-full border text-sm 
                      focus:outline-none focus:ring-2 focus:ring-orange-400
                      ${
                        isDark
                          ? "bg-slate-800 text-slate-50 border-slate-600"
                          : "bg-white text-gray-900 border-gray-300"
                      }
                    `}
                  />

                  {/* Send */}
                  <button
                    onClick={sendMessage}
                    disabled={loading || !!typingText}
                    className="rounded-full p-1 hover:scale-110 disabled:opacity-50"
                  >
                    <Image
                      src="/images/robot.png"
                      alt="robot"
                      width={45}
                      height={45}
                      className="rounded-full border border-transparent hover:border-orange-400 hover:ring-4 hover:ring-orange-400/40 hover:scale-[1.15] transition"
                    />
                  </button>
                </div>

               {/* Quick Replies */}
<div className="flex gap-2 flex-wrap mt-3 overflow-x-auto pb-1">

{/* --- First 2 buttons --- */}
{["Get a Quote (Room Size)", "Kitchen Remodel"].map((label) => (
  <button
    key={label}
    onClick={() =>
      label.includes("Quote")
        ? setInput("I want an estimate. My room is ___ sq ft.")
        : setInput(label)
    }
    className={`
      text-xs px-3 py-1 rounded-full border 
      ${
        isDark
          ? "bg-slate-800 border-slate-600 text-slate-100 hover:bg-slate-700"
          : "bg-white border-gray-300 text-gray-700 hover:bg-orange-100"
      }
    `}
  >
    {label}
  </button>
))}

{/* --- Dropdown Menu --- */}
<div className="relative">
  <button
    onClick={() => setShowMore((prev) => !prev)}
    className={`
      text-xs px-3 py-1 rounded-full border 
      ${
        isDark
          ? "bg-slate-800 border-slate-600 text-slate-100 hover:bg-slate-700"
          : "bg-white border-gray-300 text-gray-700 hover:bg-orange-100"
      }
    `}
  >
    More ▼
  </button>

  {/* Menu content */}
  {showMore && (
    <div
      className={`
        absolute left-0 top-full mt-2 p-2 rounded-xl shadow-lg z-50
        min-w-[160px] flex flex-col gap-2
        ${
          isDark
            ? "bg-slate-900 border border-slate-700 text-slate-100"
            : "bg-white border border-gray-300 text-gray-700"
        }
      `}
    >
      {[
        "Bathroom Remodel",
        "Flooring",
        "Contact",
        "Pricing",
      ].map((label) => (
        <button
          key={label}
          onClick={() => {
            setShowMore(false);
            setInput(label);
          }}
          className={`
            text-xs px-3 py-1 rounded-full border w-full text-left
            ${
              isDark
                ? "bg-slate-800 border-slate-600 text-slate-100 hover:bg-slate-700"
                : "bg-white border-gray-300 text-gray-700 hover:bg-orange-100"
            }
          `}
        >
          {label}
        </button>
      ))}
    </div>
  )}
</div>
</div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
