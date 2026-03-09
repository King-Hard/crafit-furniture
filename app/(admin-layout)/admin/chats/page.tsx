"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Send, Paperclip, X, ChevronDown, Image as ImageIcon, ShoppingBag, Zap } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

type MessageType = "text" | "image" | "order-ref";

interface Message {
  id: string;
  sender: "admin" | "customer";
  type: MessageType;
  content: string;
  orderRef?: { id: string; item: string; status: string };
  timestamp: string;
}

interface Conversation {
  id: string;
  customer: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
}

const quickReplies = [
  "Salamat sa inyong mensahe! Sandali lang po.",
  "Ang inyong order ay kasalukuyang pinoproseso.",
  "Puwede po bang ipaalam ang inyong order ID?",
  "Naipadala na po ang inyong order. Abangan na lang!",
  "Magkakausap po tayo tungkol sa inyong custom request.",
];

const initialConversations: Conversation[] = [
  {
    id: "CON-001", customer: "Maria Santos", lastMessage: "Kailan po darating yung order ko?", time: "10:32 AM", unread: 2,
    messages: [
      { id: "m1", sender: "customer", type: "text", content: "Hi! Gusto ko pong mag-inquire tungkol sa aking order.", timestamp: "10:20 AM" },
      { id: "m2", sender: "admin", type: "text", content: "Magandang araw po! Ano pong order number ninyo?", timestamp: "10:22 AM" },
      { id: "m3", sender: "customer", type: "order-ref", content: "Ito po yung order ko.", orderRef: { id: "ORD-001", item: "Mahogany Dining Table", status: "Shipped" }, timestamp: "10:25 AM" },
      { id: "m4", sender: "customer", type: "text", content: "Kailan po darating yung order ko?", timestamp: "10:32 AM" },
    ],
  },
  {
    id: "CON-002", customer: "Juan dela Cruz", lastMessage: "Pwede bang magpadala ng reference image?", time: "9:15 AM", unread: 1,
    messages: [
      { id: "m1", sender: "customer", type: "text", content: "Magandang umaga! May gusto akong i-customize na sofa.", timestamp: "9:10 AM" },
      { id: "m2", sender: "admin", type: "text", content: "Oo naman! Anong klase ng sofa ang gusto ninyo?", timestamp: "9:12 AM" },
      { id: "m3", sender: "customer", type: "text", content: "Pwede bang magpadala ng reference image?", timestamp: "9:15 AM" },
    ],
  },
  {
    id: "CON-003", customer: "Ana Reyes", lastMessage: "Okay po, salamat!", time: "Yesterday", unread: 0,
    messages: [
      { id: "m1", sender: "customer", type: "text", content: "May tanong po ako sa delivery.", timestamp: "Yesterday" },
      { id: "m2", sender: "admin", type: "text", content: "Opo, ano pong concern ninyo?", timestamp: "Yesterday" },
      { id: "m3", sender: "customer", type: "text", content: "Okay po, salamat!", timestamp: "Yesterday" },
    ],
  },
  {
    id: "CON-004", customer: "Carlo Bautista", lastMessage: "Delivered na po ba?", time: "Yesterday", unread: 0,
    messages: [
      { id: "m1", sender: "customer", type: "text", content: "Delivered na po ba?", timestamp: "Yesterday" },
      { id: "m2", sender: "admin", type: "order-ref", content: "Ito po ang status ng inyong order.", orderRef: { id: "ORD-004", item: "Queen Bed Frame", status: "Delivered" }, timestamp: "Yesterday" },
    ],
  },
  {
    id: "CON-005", customer: "Luz Gomez", lastMessage: "Sige po, maraming salamat!", time: "Mar 7", unread: 0,
    messages: [
      { id: "m1", sender: "customer", type: "text", content: "Gusto ko pong mag-cancel ng order.", timestamp: "Mar 7" },
      { id: "m2", sender: "admin", type: "text", content: "Naiintindihan po namin. Pinoproseso na namin ang inyong request.", timestamp: "Mar 7" },
      { id: "m3", sender: "customer", type: "text", content: "Sige po, maraming salamat!", timestamp: "Mar 7" },
    ],
  },
];

const orderStatusStyles: Record<string, string> = {
  Shipped: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Delivered: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Processing: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function Chats() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [selectedId, setSelectedId] = useState<string>("CON-001");
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [showAttach, setShowAttach] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selected = conversations.find((c) => c.id === selectedId)!;

  const filteredConvos = conversations.filter((c) =>
    c.customer.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selected?.messages]);

  function handleSelectConvo(id: string) {
    setSelectedId(id);
    setConversations((prev) =>
      prev.map((c) => c.id === id ? { ...c, unread: 0 } : c)
    );
  }

  function sendMessage(content: string, type: MessageType = "text", orderRef?: Message["orderRef"]) {
    if (!content.trim() && type === "text") return;
    const newMsg: Message = {
      id: `m${Date.now()}`,
      sender: "admin",
      type,
      content,
      orderRef,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? { ...c, messages: [...c.messages, newMsg], lastMessage: content }
          : c
      )
    );
    setInput("");
    setShowQuickReplies(false);
    setShowAttach(false);
  }

  function handleSend() {
    sendMessage(input);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] border bg-card rounded-xl overflow-hidden">

      {/* Sidebar — Conversation List */}
      <div className="w-72 border-r flex flex-col shrink-0">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-base mb-3">Messages</h2>
          <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConvos.map((convo) => (
            <button
              key={convo.id}
              onClick={() => handleSelectConvo(convo.id)}
              className={`w-full text-left px-4 py-3 border-b hover:bg-muted/50 transition-colors ${selectedId === convo.id ? "bg-muted/60" : ""}`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center shrink-0">
                    {convo.customer.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <p className="text-sm font-medium truncate max-w-[120px]">{convo.customer}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="text-xs text-muted-foreground">{convo.time}</p>
                  {convo.unread > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                      {convo.unread}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground truncate pl-10">{convo.lastMessage}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Window */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Chat Header */}
        <div className="px-5 py-3.5 border-b flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center shrink-0">
            {selected.customer.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div>
            <p className="font-medium text-sm">{selected.customer}</p>
            <p className="text-xs text-muted-foreground">Active now</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {selected.messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] space-y-1`}>
                {msg.type === "text" && (
                  <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === "admin"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted rounded-bl-sm"
                  }`}>
                    {msg.content}
                  </div>
                )}

                {msg.type === "order-ref" && msg.orderRef && (
                  <div className={`rounded-2xl border overflow-hidden text-sm ${
                    msg.sender === "admin" ? "rounded-br-sm" : "rounded-bl-sm"
                  }`}>
                    <div className="bg-muted/60 px-4 py-2 flex items-center gap-2 border-b">
                      <ShoppingBag size={13} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground font-medium">Order Reference</span>
                    </div>
                    <div className="px-4 py-3 bg-card">
                      <p className="font-medium text-sm">{msg.orderRef.id}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{msg.orderRef.item}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium mt-2 inline-block ${orderStatusStyles[msg.orderRef.status] ?? "bg-muted text-muted-foreground"}`}>
                        {msg.orderRef.status}
                      </span>
                      {msg.content && <p className="text-xs mt-2 text-muted-foreground">{msg.content}</p>}
                    </div>
                  </div>
                )}

                {msg.type === "image" && (
                <div className={`relative w-48 h-36 border overflow-hidden rounded-2xl shadow-sm
                  ${msg.sender === "admin" 
                    ? "rounded-br-sm border-primary/20" 
                    : "rounded-bl-sm border-border bg-muted/30"
                  }`}
                >
                  <Image
                    src={msg.content}
                    alt="Shared content"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 192px, 192px"
                  />
                </div>
              )}

                <p className={`text-xs text-muted-foreground ${msg.sender === "admin" ? "text-right" : "text-left"}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {showQuickReplies && (
          <div className="px-5 pb-2">
            <div className="border bg-card rounded-xl overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/40">
                <p className="text-xs font-medium text-muted-foreground">Quick Replies</p>
                <button onClick={() => setShowQuickReplies(false)} className="text-muted-foreground hover:text-foreground">
                  <X size={14} />
                </button>
              </div>
              {quickReplies.map((reply, i) => (
                <button
                  key={i}
                  onClick={() => { setInput(reply); setShowQuickReplies(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors border-b last:border-0"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Attach Options */}
        {showAttach && (
          <div className="px-5 pb-2">
            <div className="border bg-card rounded-xl overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/40">
                <p className="text-xs font-medium text-muted-foreground">Attach</p>
                <button onClick={() => setShowAttach(false)} className="text-muted-foreground hover:text-foreground">
                  <X size={14} />
                </button>
              </div>
              <button
                onClick={() => sendMessage("https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400", "image")}
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors border-b flex items-center gap-3"
              >
                <ImageIcon size={15} className="text-muted-foreground" />
                Share Image
              </button>
              <button
                onClick={() => sendMessage("Ito po ang status ng inyong order.", "order-ref", { id: "ORD-001", item: "Mahogany Dining Table", status: "Shipped" })}
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors flex items-center gap-3"
              >
                <ShoppingBag size={15} className="text-muted-foreground" />
                Attach Order Reference
              </button>
            </div>
          </div>
        )}

        
        {/* Input Bar */}
        <div className="px-5 py-3 border-t">
          <div className="flex items-center gap-2">
            {/* Quick Replies Button */}
            <Button
              variant={showQuickReplies ? "default" : "outline"}
              size="icon"
              className="h-9 w-9 shrink-0"
              onClick={() => {
                setShowQuickReplies(!showQuickReplies);
                setShowAttach(false);
              }}
              title="Quick Replies"
            >
              <Zap size={16} />
            </Button>

            {/* Attach Button */}
            <Button
              variant={showAttach ? "default" : "outline"}
              size="icon"
              className="h-9 w-9 shrink-0"
              onClick={() => {
                setShowAttach(!showAttach);
                setShowQuickReplies(false);
              }}
              title="Attach"
            >
              <Paperclip size={16} />
            </Button>

            {/* Message Input */}
            <Input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1" // Siguraduhin na kukuha siya ng space
            />

            {/* Send Button */}
            <Button
              size="icon"
              className="h-9 w-9 shrink-0"
              onClick={handleSend}
              disabled={!input.trim()}
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}