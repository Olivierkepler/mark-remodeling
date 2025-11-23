"use client";

import {
  X,
  Mic,
  MicOff,
  RotateCcw,
  Sun,
  Trash,     // <-- ADD THIS
  Moon,
  Copy,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

import EstimatorPanel from "@/app/components/EstimatorPanel";

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
  const recognitionRef = useRef<any>(null);
  const typewriterTimeoutRef = useRef<number | null>(null);

  const isDark = theme === "dark";

  /* ---------- Helpers ---------- */

  const formatTime = (iso?: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const safeText = (str: string) => str.replace(/[\u0000-\u001F]+/g, " ");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /* ---------- NEW: Clear Chat ---------- */

  const clearChat = () => {
    const initialMessage: Message = {
      id: createId(),
      role: "assistant",
      content: "Hello! How can I assist you today? 😊",
      time: new Date().toISOString(),
    };

    window.localStorage.removeItem(STORAGE_KEY);
    setMessages([initialMessage]);
    clearTypewriter();
  };

  /* ---------- Load + save memory ---------- */

  useEffect(() => {
    if (typeof window === "undefined") return;
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
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  /* ---------- Auto-scroll ---------- */

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingText, loading]);

  /* ---------- Voice input ---------- */

  const initRecognition = () => {
    if (typeof window === "undefined") return null;
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return null;

    const rec = new SpeechRecognition();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
    };

    rec.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
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
    if (!rec) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    recognitionRef.current = rec;
    setIsRecording(true);
    rec.start();
  };

  /* ---------- Typewriter ---------- */

  const clearTypewriter = () => {
    if (typewriterTimeoutRef.current !== null) {
      window.clearTimeout(typewriterTimeoutRef.current);
      typewriterTimeoutRef.current = null;
    }
    setTypingText("");
  };

  const runTypewriter = (fullText: string, onDone: () => void) => {
    clearTypewriter();
    const text = safeText(fullText);
    let index = 0;

    const step = () => {
      setTypingText((prev) => prev + text.charAt(index));
      index += 1;

      if (index < text.length) {
        const prevChar = text.charAt(index - 1);
        let extra = 0;
        if (".!?".includes(prevChar)) extra = 120;
        else if (",;:".includes(prevChar)) extra = 50;

        typewriterTimeoutRef.current = window.setTimeout(
          step,
          20 + extra
        );
      } else {
        onDone();
      }
    };

    if (text.length === 0) onDone();
    else step();
  };

  useEffect(() => {
    return () => clearTypewriter();
  }, []);

  /* ---------- Fetch wrapper ---------- */

  const fetchReply = async (chatMessages: Message[]): Promise<string> => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: chatMessages }),
    });

    let data: any = null;
    try {
      data = await res.json();
    } catch {
      throw new Error("Invalid response from server.");
    }

    if (!res.ok) {
      throw new Error(data?.error || "Request failed.");
    }

    return typeof data.reply === "string"
      ? data.reply
      : "Im not sure how to respond to that.";
  };

  /* ---------- Send message ---------- */

  const sendMessage = async () => {
    if (!input.trim() || loading || typingText) return;

    let userContent = input.trim();

    if (/^\d+$/.test(userContent)) {
      userContent = `The room size is ${userContent} square feet.`;
    }

    const userMsg: Message = {
      id: createId(),
      role: "user",
      content: userContent,
      time: new Date().toISOString(),
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);
    clearTypewriter();

    try {
      const reply = await fetchReply(updated);

      runTypewriter(reply, () => {
        const assistantMsg: Message = {
          id: createId(),
          role: "assistant",
          content: reply,
          time: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
        setTypingText("");
        setLoading(false);
      });
    } catch {
      const errorMsg: Message = {
        id: createId(),
        role: "assistant",
        content: "Something went wrong. Please try again.",
        time: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
      setTypingText("");
      setLoading(false);
    }
  };

  /* ---------- Regenerate ---------- */

  const regenerateLast = async () => {
    if (loading || typingText) return;

    const lastAssistantIndex = [...messages]
      .map((m, idx) => ({ ...m, idx }))
      .filter((m) => m.role === "assistant")
      .slice(-1)[0]?.idx;

    if (lastAssistantIndex === undefined) return;

    const baseMessages = messages.filter((_, idx) => idx !== lastAssistantIndex);

    setMessages(baseMessages);
    setLoading(true);
    clearTypewriter();

    try {
      const reply = await fetchReply(baseMessages);

      runTypewriter(reply, () => {
        const assistantMsg: Message = {
          id: createId(),
          role: "assistant",
          content: reply,
          time: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
        setTypingText("");
        setLoading(false);
      });
    } catch {
      const errorMsg: Message = {
        id: createId(),
        role: "assistant",
        content: "Something went wrong while regenerating.",
        time: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
      setTypingText("");
      setLoading(false);
    }
  };

  /* ---------- Markdown ---------- */

  const copyToClipboard = (text: string) => {
    navigator?.clipboard?.writeText(text).catch(console.error);
  };

  const markdownComponents = {
    code({
      inline,
      className,
      children,
      ...props
    }: {
      inline?: boolean;
      className?: string;
      children: any;
    }) {
      const code = String(children).replace(/\n$/, "");

      if (inline) {
        return (
          <code
            className="px-1 py-0.5 rounded bg-black/10 text-xs font-mono"
            {...props}
          >
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
              opacity-0 group-hover:opacity-100 transition
              text-xs text-white
            "
          >
            <span className="inline-flex items-center gap-1">
              <Copy className="w-3 h-3" /> Copy
            </span>
          </button>
          <pre
            className="
              text-xs md:text-sm rounded-xl p-3 overflow-auto 
              bg-slate-900/95 text-slate-100
            "
          >
            <code className={className}>{code}</code>
          </pre>
        </div>
      );
    },
  };

  /* ---------- Estimator → Chat ---------- */

  const handleEstimatorSendToChat = (markdown: string) => {
    const assistantMsg: Message = {
      id: createId(),
      role: "assistant",
      content: markdown,
      time: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, assistantMsg]);
  };

  /* ---------- Render ---------- */

  return (
    <div className="relative">
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="
          fixed z-50 bottom-6 right-6 p-4 rounded-full shadow-2xl
          transition-all duration-300 cursor-pointer 
          bg-gradient-to-br from-orange-500 to-orange-600
          hover:scale-110 hover:shadow-[0_0_20px_rgba(255,140,0,0.6)]
          text-white flex items-center justify-center
        "
      >
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <Image
            src="/images/robot.png"
            alt="robot"
            width={75}
            height={75}
            className="rounded-full"
          />
        )}
      </button>

      {open && (
        <div
          className={`
            fixed bottom-24 right-4
            ${!estimatorOpen ? "w-[460px]" : "w-[1200px]"}
            max-w-[100vw] w-[650px]
            h-[150vh] max-h-[1200px]
            rounded-2xl p-4 z-40 shadow-2xl border
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

            <div className="flex items-center gap-2">

              


              {/* Estimation toggle button */}
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

              {/* ⭐ NEW: Clear Chat Button */}
              <button
  onClick={clearChat}
  className="
   inline-flex cursor-pointer items-center justify-center w-8 h-8 
                  rounded-full border border-white/40 bg-white/20
                  hover:bg-white/40 text-xs
  "
>
  <RotateCcw className="w-4 h-4 dark:bg-white " />
</button>

              {/* Theme toggle */}
              <button
                onClick={() =>
                  setTheme((prev) => (prev === "light" ? "dark" : "light"))
                }
                className="
                  inline-flex items-center justify-center w-8 h-8 
                  rounded-full border border-white/40 bg-white/20
                  hover:bg-white/40 text-xs
                "
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                className="
                  inline-flex items-center justify-center w-8 h-8 
                  rounded-full border border-white/40 bg-white/20
                  hover:bg-white/40 text-xs
                "
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body (Estimator | Chat) */}
          <div className="flex flex-1 gap-3 mt-2 overflow-hidden">
            <div
              className={`
                transition-all duration-300 ease-out
                ${estimatorOpen ? "w-[460px] md:w-[600px]" : "w-0"}
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

            {/* Chat */}
            <div className="flex flex-1 flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scroll">
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
                        message-animate relative max-w-[90%] md:max-w-[80%] px-4 py-3 
                        rounded-2xl text-sm shadow-sm
                        ${
                          isUser
                            ? "ml-auto bg-orange-100 text-gray-900"
                            : isDark
                            ? "bg-slate-802 text-slate-50 border border-slate-700"
                            : "bg-white/90 backdrop-blur-sm border border-white/60 text-gray-800"
                        }
                      `}
                    >
                      {isUser ? (
                        <div className="bubble-tail-right" />
                      ) : (
                        <div className="bubble-tail-left" />
                      )}

                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                        components={markdownComponents as any}
                      >
                        {m.content}
                      </ReactMarkdown>

                      <div className="mt-2 flex items-center justify-between gap-2 text-[10px] text-gray-500 dark:text-gray-400">
                        <span>{formatTime(m.time)}</span>

                        {isLastAssistant && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => copyToClipboard(m.content)}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/5 hover:bg-black/10"
                            >
                              <Copy className="w-3 h-3" />
                              Copy
                            </button>
                            <button
                              onClick={regenerateLast}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/5 hover:bg-black/10"
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

                {typingText && (
                  <div
                    className={`
                      message-animate relative max-w-[90%] md:max-w-[80%] px-4 py-3 
                      rounded-2xl text-sm shadow-sm
                      ${
                        isDark
                          ? "bg-slate-800/90 text-slate-50 border border-slate-700"
                          : "bg-white/90 backdrop-blur-sm border border-white/60 text-gray-800"
                      }
                    `}
                  >
                    <div className="bubble-tail-left" />
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                      components={markdownComponents as any}
                    >
                      {typingText}
                    </ReactMarkdown>
                  </div>
                )}

                {loading && !typingText && (
                  <div
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-2xl shadow-sm w-fit
                      ${
                        isDark
                          ? "bg-slate-800/90 border border-slate-700 text-slate-200"
                          : "bg-white/90 backdrop-blur-md border border-white/60 text-gray-600"
                      }
                    `}
                  >
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150" />
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300" />
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div
                className={`
                  p-3 rounded-xl mt-3 border
                  ${
                    isDark
                      ? "bg-slate-900/80 border-slate-700"
                      : "bg-white/70 backdrop-blur-xl border-white/60"
                  }
                `}
              >
                <div className="flex gap-2 items-center">
                  <button
                    type="button"
                    onClick={toggleRecording}
                    className={`
                      inline-flex items-center justify-center w-9 h-9 rounded-full border
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

                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder="Type a message..."
                    className={`
                      flex-1 px-3 py-2 rounded-full border text-sm 
                      focus:outline-none focus:ring-2 focus:ring-orange-400
                      ${
                        isDark
                          ? "bg-slate-800 border-slate-600 text-slate-50 placeholder:text-slate-400"
                          : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                      }
                    `}
                  />

                  <button
                    onClick={sendMessage}
                    disabled={loading || !!typingText}
                    className="rounded-full p-1 transition-all hover:scale-110 disabled:opacity-50"
                  >
                    <Image
                      src="/images/robot.png"
                      alt="robot"
                      width={45}
                      height={45}
                      className="
                        rounded-full
                        border border-transparent
                        hover:border-orange-400
                        hover:ring-4 hover:ring-orange-400/40
                        hover:shadow-lg hover:shadow-orange-300/50
                        hover:scale-[1.18]
                        transition-all duration-500
                      "
                    />
                  </button>
                </div>

                <div className="flex gap-2 flex-wrap mt-3">
                  {[
                    "Get a Quote (Room Size)",
                    "Kitchen Remodel",
                    "Bathroom Remodel",
                    "Flooring",
                    "Contact",
                    "Pricing",
                  ].map((text) => (
                    <button
                      key={text}
                      onClick={() => {
                        if (text.includes("Quote")) {
                          setInput("I want an estimate. My room is ___ square feet.");
                        } else {
                          setInput(text);
                        }
                      }}
                      className={`
                        text-xs px-3 py-1 rounded-full border 
                        ${
                          isDark
                            ? "bg-slate-800 border-slate-600 text-slate-100 hover:bg-slate-700"
                            : "bg-white/80 backdrop-blur-sm border-white/80 text-gray-700 hover:bg-orange-100"
                        }
                      `}
                    >
                      {text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
