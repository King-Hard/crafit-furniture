"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  User, ShoppingBag, KeyRound, Camera,
  ChevronDown, X, MapPin,
  Package, Truck, CheckCircle, XCircle,
  MessageCircle, Send, Image as ImageIcon,
  WandSparkles, 
} from "lucide-react";
import Link from "next/link";

type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
type DeliveryStatus = "Preparing" | "Out for Delivery" | "Delivered" | "Rescheduled" | "Failed Delivery";
type RequestStatus = "Pending Review" | "Quoted" | "Approved" | "In Production" | "Completed" | "Rejected";

interface OrderItem { name: string; qty: number; price: number; image: string; }
interface Order {
  id: string; date: string; total: number;
  orderStatus: OrderStatus; deliveryStatus: DeliveryStatus;
  address: string; driver: string | null; scheduledDate: string;
  items: OrderItem[];
}

interface CustomRequest {
  id: string;
  date: string;
  item: string;
  budget: string;
  status: RequestStatus;
  quote: string | null;
  materials: string[];
  dimensions: { width: string; depth: string; height: string } | null;
  message: string;
  image: string | null;
}

interface Message {
  id: string;
  sender: "customer" | "admin";
  text?: string;
  image?: string;
  time: string;
  orderRef?: { id: string; total: number; status: OrderStatus };
}

// --- Data ---
const orders: Order[] = [
  {
    id: "ORD-001", date: "Mar 9, 2026", total: 23500,
    orderStatus: "Shipped", deliveryStatus: "Out for Delivery",
    address: "123 Rizal St., Baliuag, Bulacan",
    driver: "Dodong Reyes", scheduledDate: "Mar 10, 2026",
    items: [
      { name: "Mahogany Dining Table", qty: 1, price: 18500, image: "/t1.jpg" },
      { name: "Wooden Bookshelf", qty: 1, price: 5000, image: "/cab1.jpg" },
    ],
  },
  {
    id: "ORD-002", date: "Mar 7, 2026", total: 12000,
    orderStatus: "Delivered", deliveryStatus: "Delivered",
    address: "123 Rizal St., Baliuag, Bulacan",
    driver: "Manny Cruz", scheduledDate: "Mar 8, 2026",
    items: [{ name: "Queen Bed Frame", qty: 1, price: 12000, image: "/bed1.jpg" }],
  },
  {
    id: "ORD-003", date: "Mar 5, 2026", total: 4500,
    orderStatus: "Cancelled", deliveryStatus: "Preparing",
    address: "123 Rizal St., Baliuag, Bulacan",
    driver: null, scheduledDate: "Mar 6, 2026",
    items: [{ name: "Office Chair", qty: 1, price: 4500, image: "/chair1.jpg" }],
  },
];

const customRequests: CustomRequest[] = [
  {
    id: "REQ-001",
    date: "Mar 8, 2026",
    item: "L-Shape Sofa",
    budget: "₱25,000 – ₱50,000",
    status: "Quoted",
    quote: "₱38,500",
    materials: ["Fabric Upholstery", "Metal Frame"],
    dimensions: { width: '96"', depth: '60"', height: '32"' },
    message: "I want a gray L-shape sofa with wooden legs and removable covers.",
    image: null,
  },
  {
    id: "REQ-002",
    date: "Mar 5, 2026",
    item: "Study Desk with Shelves",
    budget: "₱10,000 – ₱25,000",
    status: "In Production",
    quote: "₱18,000",
    materials: ["Plywood / Laminate"],
    dimensions: { width: '48"', depth: '24"', height: '30"' },
    message: "White laminated desk with overhead shelves for books and PC setup.",
    image: null,
  },
  {
    id: "REQ-003",
    date: "Feb 28, 2026",
    item: "Narra Wood Cabinet",
    budget: "₱50,000 – ₱100,000",
    status: "Completed",
    quote: "₱72,000",
    materials: ["Narra Wood"],
    dimensions: { width: '60"', depth: '20"', height: '84"' },
    message: "Full-height narra wood display cabinet with glass panel doors.",
    image: null,
  },
];

const requestStatusStyles: Record<RequestStatus, string> = {
  "Pending Review": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  "Quoted": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Approved": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "In Production": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  "Completed": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Rejected": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const requestSteps: RequestStatus[] = ["Pending Review", "Quoted", "Approved", "In Production", "Completed"];

function getRequestStepIndex(status: RequestStatus) {
  if (status === "Rejected") return -1;
  return requestSteps.indexOf(status);
}

const initialMessages: Message[] = [
  { id: "1", sender: "admin", text: "Hello! Welcome to Craftit. How can we help you today?", time: "Mar 9, 9:00 AM" },
  { id: "2", sender: "customer", text: "Hi! I wanted to ask about my order.", time: "Mar 9, 9:02 AM", orderRef: { id: "ORD-001", total: 23500, status: "Shipped" } },
  { id: "3", sender: "admin", text: "Of course! Your order ORD-001 is currently out for delivery and should arrive by Mar 10. Is there anything else you need?", time: "Mar 9, 9:05 AM" },
];

const quickReplies = [
  "Where is my order?",
  "I want to cancel my order.",
  "Can I change my delivery address?",
  "I have a question about my custom request.",
  "I'd like to follow up on my quote.",
];

const orderStatusStyles: Record<OrderStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Processing: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Shipped: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Delivered: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const deliverySteps: DeliveryStatus[] = ["Preparing", "Out for Delivery", "Delivered"];
function getStepIndex(status: DeliveryStatus) {
  if (status === "Failed Delivery" || status === "Rescheduled") return -1;
  return deliverySteps.indexOf(status);
}

const tabs = [
  { id: "orders", label: "My Orders", icon: ShoppingBag },
  { id: "requests", label: "My Requests", icon: WandSparkles },
  { id: "messages", label: "Messages", icon: MessageCircle },
  { id: "profile", label: "Profile Info", icon: User },
  { id: "security", label: "Security", icon: KeyRound },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("orders");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [expandedRequest, setExpandedRequest] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatFileRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const [firstName, setFirstName] = useState("Maria");
  const [lastName, setLastName] = useState("Santos");
  const [email, setEmail] = useState("maria@email.com");
  const [phone, setPhone] = useState("0917-123-4567");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("123 Rizal St., Baliuag, Bulacan");
  const [facebook, setFacebook] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [showOrderPicker, setShowOrderPicker] = useState(false);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, activeTab]);

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function sendMessage(text?: string, orderRef?: Message["orderRef"], image?: string) {
    const msg: Message = {
      id: Date.now().toString(),
      sender: "customer",
      text, image, orderRef,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, msg]);
    setInputText("");
    setShowQuickReplies(false);
    setShowOrderPicker(false);
    setTimeout(() => {
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: "admin",
        text: "Thank you for your message! Our team will get back to you shortly.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }]);
    }, 1200);
  }

  function handleChatImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    sendMessage(undefined, undefined, URL.createObjectURL(file));
  }

  return (
    <div className="mx-auto px-6 lg:px-12 py-12 max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Header */}
      <div className="flex items-center gap-5 mb-10">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-accent overflow-hidden relative">
            {avatarPreview ? (
              <Image src={avatarPreview} alt="Avatar" fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xl font-semibold text-muted-foreground">MS</div>
            )}
          </div>
          <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 w-6 h-6 bg-foreground text-background rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
            <Camera size={11} />
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
        </div>
        <div>
          <h1 className="font-serif text-2xl lg:text-3xl tracking-tight">{firstName} {lastName}</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{email}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b mb-8 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-3 text-xs uppercase tracking-widest font-medium border-b-2 transition-colors -mb-px shrink-0 ${
              activeTab === id ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon size={14} className="hidden sm:block" />
            {label}
          </button>
        ))}
      </div>

      {/* MY ORDERS TAB */}
      {activeTab === "orders" && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <ShoppingBag size={40} className="text-muted-foreground/30" strokeWidth={1.5} />
              <p className="text-muted-foreground text-sm">No orders yet.</p>
              <Button variant="outline" className="w-full sm:w-auto text-xs uppercase tracking-widest h-10 px-6">Start Shopping</Button>
            </div>
          ) : (
            orders.map((order) => {
              const isExpanded = expandedOrder === order.id;
              const stepIndex = getStepIndex(order.deliveryStatus);
              const isCancelled = order.orderStatus === "Cancelled";
              const isFailed = order.deliveryStatus === "Failed Delivery" || order.deliveryStatus === "Rescheduled";

              return (
                <div key={order.id} className="border rounded-xl overflow-hidden bg-card">
                  <button onClick={() => setExpandedOrder(isExpanded ? null : order.id)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors text-left">
                    <div>
                      <p className="text-sm font-medium">{order.id}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{order.date} · ₱{order.total.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${orderStatusStyles[order.orderStatus]}`}>{order.orderStatus}</span>
                      <ChevronDown size={15} className={`text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t px-5 py-5 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                      {/* Items List */}
                      <div className="space-y-3">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-4">
                            <div className="relative w-14 h-14 bg-accent shrink-0 overflow-hidden rounded-md">
                              <Image src={item.image} alt={item.name} fill className="object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium uppercase tracking-wider truncate">{item.name}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">Qty: {item.qty}</p>
                            </div>
                            <p className="text-sm font-medium shrink-0">₱{item.price.toLocaleString()}</p>
                          </div>
                        ))}
                      </div>

                      {/* Delivery Info */}
                      <div className="border-t pt-4 space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin size={14} className="text-muted-foreground mt-0.5 shrink-0" />
                          <p className="text-xs text-muted-foreground">{order.address}</p>
                        </div>
                        {order.driver && (
                          <div className="flex items-center gap-2">
                            <Truck size={14} className="text-muted-foreground shrink-0" />
                            <p className="text-xs text-muted-foreground">Driver: {order.driver} · Scheduled {order.scheduledDate}</p>
                          </div>
                        )}
                      </div>

                      {/* Delivery Status Tracker */}
                      {!isCancelled && (
                        <div className="border-t pt-4">
                          <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-4">Delivery Status</p>
                          {isFailed ? (
                            <div className="flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-950/20 p-3 rounded-lg">
                              <XCircle size={16} />
                              <p className="text-sm font-medium">{order.deliveryStatus}</p>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              {deliverySteps.map((step, i) => {
                                const isCompleted = i <= stepIndex;
                                const isActive = i === stepIndex;
                                const icons = [Package, Truck, CheckCircle];
                                const StepIcon = icons[i];
                                return (
                                  <div key={step} className="flex items-center flex-1 last:flex-none">
                                    <div className="flex flex-col items-center gap-1.5">
                                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isCompleted ? "bg-foreground text-background" : "bg-muted text-muted-foreground"} ${isActive ? "ring-2 ring-offset-2 ring-foreground" : ""}`}>
                                        <StepIcon size={14} />
                                      </div>
                                      <p className={`text-[9px] uppercase tracking-wide text-center ${isCompleted ? "text-foreground font-bold" : "text-muted-foreground"}`}>{step}</p>
                                    </div>
                                    {i < deliverySteps.length - 1 && (
                                      <div className={`flex-1 h-[1px] mb-5 mx-2 ${i < stepIndex ? "bg-foreground" : "bg-border"}`} />
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* MY REQUESTS TAB */}
      {activeTab === "requests" && (
        <div className="space-y-4">
          {customRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <WandSparkles size={40} className="text-muted-foreground/30" strokeWidth={1.5} />
              <p className="text-muted-foreground text-sm">No custom requests yet.</p>
              <Button variant="outline" className="w-full sm:w-auto text-xs uppercase tracking-widest h-10 px-6">Make a Request</Button>
            </div>
          ) : (
            customRequests.map((req) => {
              const isExpanded = expandedRequest === req.id;
              const stepIndex = getRequestStepIndex(req.status);
              const isRejected = req.status === "Rejected";
              const isCompleted = req.status === "Completed";

              return (
                <div key={req.id} className="border rounded-xl overflow-hidden">
                  {/* Request Header */}
                  <button onClick={() => setExpandedRequest(isExpanded ? null : req.id)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors text-left">
                    <div>
                      <p className="text-sm font-medium">{req.item}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{req.id} · {req.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${requestStatusStyles[req.status]}`}>{req.status}</span>
                      <ChevronDown size={15} className={`text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </div>
                  </button>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t px-5 py-5 space-y-6">

                      {/* Quote Banner — show if quoted */}
                      {req.quote && !isRejected && (
                        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg px-4 py-3 flex items-center justify-between">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-green-600 dark:text-green-400 font-medium">Quote from Craftit</p>
                            <p className="text-xl font-semibold text-green-700 dark:text-green-300 mt-0.5">{req.quote}</p>
                          </div>
                          {req.status === "Quoted" && (
                            <Link href="/checkout-customize">
                              <Button className="h-9 px-5 text-xs uppercase tracking-widest">Proceed to Checkout</Button>
                            </Link>
                          )}
                        </div>
                      )}

                      {/* Rejected Banner */}
                      {isRejected && (
                        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg px-4 py-3 flex items-center gap-3">
                          <XCircle size={16} className="text-red-500 shrink-0" />
                          <p className="text-xs text-red-600 dark:text-red-400">This request was not accepted. Feel free to submit a new one.</p>
                        </div>
                      )}

                      {/* Request Tracker */}
                      {!isRejected && (
                        <div>
                          <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-4">Request Progress</p>
                          <div className="flex items-center">
                            {requestSteps.map((step, i) => {
                              const isStepCompleted = i <= stepIndex;
                              const isStepActive = i === stepIndex;
                              return (
                                <div key={step} className="flex items-center flex-1 last:flex-none">
                                  <div className="flex flex-col items-center gap-1.5">
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${isStepCompleted ? "bg-foreground text-background" : "bg-muted text-muted-foreground"} ${isStepActive ? "ring-2 ring-offset-2 ring-foreground" : ""}`}>
                                      {i + 1}
                                    </div>
                                    <p className={`text-[9px] uppercase tracking-wide text-center leading-tight max-w-[52px] ${isStepCompleted ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                                      {step === "Pending Review" ? "Review" : step === "In Production" ? "Production" : step}
                                    </p>
                                  </div>
                                  {i < requestSteps.length - 1 && (
                                    <div className={`flex-1 h-[1px] mb-5 mx-1 ${i < stepIndex ? "bg-foreground" : "bg-border"}`} />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Request Details */}
                      <div className="border-t pt-4 grid grid-cols-2 gap-x-6 gap-y-3">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Budget</p>
                          <p className="text-sm font-medium mt-0.5">{req.budget}</p>
                        </div>
                        {req.dimensions && (
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Dimensions</p>
                            <p className="text-sm font-medium mt-0.5">{req.dimensions.width} × {req.dimensions.depth} × {req.dimensions.height}</p>
                          </div>
                        )}
                        <div className="col-span-2">
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Materials</p>
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {req.materials.map((m) => (
                              <span key={m} className="text-[10px] px-2 py-0.5 border rounded-sm">{m}</span>
                            ))}
                          </div>
                        </div>
                        {req.message && (
                          <div className="col-span-2">
                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Details</p>
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{req.message}</p>
                          </div>
                        )}
                      </div>

                      {/* Reference Image */}
                      {req.image && (
                        <div className="border-t pt-4">
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Reference Image</p>
                          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-accent">
                            <Image src={req.image} alt="Reference" fill className="object-cover" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* MESSAGES TAB */}
      {activeTab === "messages" && (
        <div className="border rounded-xl overflow-hidden flex flex-col" style={{ height: "560px" }}>
          <div className="flex items-center gap-3 px-5 py-4 border-b bg-card shrink-0">
            <div className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center shrink-0">
              <span className="text-background text-xs font-bold">C</span>
            </div>
            <div>
              <p className="text-sm font-medium">Craftit Support</p>
              <p className="text-xs text-muted-foreground">Typically replies within a few hours</p>
            </div>
          </div>

          <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {messages.map((msg) => {
              const isCustomer = msg.sender === "customer";
              return (
                <div key={msg.id} className={`flex ${isCustomer ? "justify-end" : "justify-start"}`}>
                  <div className="max-w-[75%] space-y-1">
                    {msg.orderRef && (
                      <div className={`border rounded-lg px-3 py-2.5 mb-1 text-xs ${isCustomer ? "bg-primary/10 border-primary/20" : "bg-muted border-border"}`}>
                        <p className="font-medium uppercase tracking-wide">{msg.orderRef.id}</p>
                        <p className="text-muted-foreground mt-0.5">₱{msg.orderRef.total.toLocaleString()}</p>
                        <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-medium ${orderStatusStyles[msg.orderRef.status]}`}>{msg.orderRef.status}</span>
                      </div>
                    )}
                    {msg.image && (
                      <div className="relative w-48 h-48 rounded-lg overflow-hidden">
                        <Image src={msg.image} alt="attachment" fill className="object-cover" />
                      </div>
                    )}
                    {msg.text && (
                      <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${isCustomer ? "bg-foreground text-background rounded-br-sm" : "bg-muted text-foreground rounded-bl-sm"}`}>
                        {msg.text}
                      </div>
                    )}
                    <p className={`text-[10px] text-muted-foreground px-1 ${isCustomer ? "text-right" : "text-left"}`}>{msg.time}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {showQuickReplies && (
            <div className="border-t px-4 py-3 bg-muted/30 flex flex-wrap gap-2 shrink-0">
              {quickReplies.map((reply) => (
                <button key={reply} onClick={() => sendMessage(reply)} className="text-xs px-3 py-1.5 border rounded-full hover:bg-accent transition-colors">{reply}</button>
              ))}
            </div>
          )}

          {showOrderPicker && (
            <div className="border-t px-4 py-3 bg-muted/30 space-y-2 shrink-0">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Select an order to reference</p>
              {orders.map((order) => (
                <button key={order.id} onClick={() => sendMessage(`Hi, I have a question about ${order.id}.`, { id: order.id, total: order.total, status: order.orderStatus })} className="w-full flex items-center justify-between px-3 py-2.5 border rounded-lg hover:bg-accent transition-colors text-left">
                  <div>
                    <p className="text-xs font-medium">{order.id}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{order.date} · ₱{order.total.toLocaleString()}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${orderStatusStyles[order.orderStatus]}`}>{order.orderStatus}</span>
                </button>
              ))}
            </div>
          )}

          <div className="border-t px-4 py-3 flex items-center gap-2 bg-card shrink-0">
            <button onClick={() => { setShowQuickReplies((v) => !v); setShowOrderPicker(false); }} className={`p-2 rounded-lg transition-colors ${showQuickReplies ? "bg-foreground text-background" : "hover:bg-muted text-muted-foreground"}`}>
              <MessageCircle size={16} />
            </button>
            <button onClick={() => { setShowOrderPicker((v) => !v); setShowQuickReplies(false); }} className={`p-2 rounded-lg transition-colors ${showOrderPicker ? "bg-foreground text-background" : "hover:bg-muted text-muted-foreground"}`}>
              <ShoppingBag size={16} />
            </button>
            <button onClick={() => chatFileRef.current?.click()} className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
              <ImageIcon size={16} />
            </button>
            <input ref={chatFileRef} type="file" accept="image/*" onChange={handleChatImage} className="hidden" />
            <Input value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && inputText.trim()) sendMessage(inputText.trim()); }} placeholder="Type a message..." />
            <button onClick={() => { if (inputText.trim()) sendMessage(inputText.trim()); }} disabled={!inputText.trim()} className="p-2 rounded-lg bg-foreground text-background disabled:opacity-30 hover:opacity-80 transition-opacity">
              <Send size={15} />
            </button>
          </div>
        </div>
      )}

      {/* PROFILE INFO TAB */}
      {activeTab === "profile" && (
        <div className="max-w-2xl text-left"> 
          <FieldGroup> 
            {/* Personal Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">First Name</FieldLabel>
                <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="h-12" />
              </Field>
              <Field>
                <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">Last Name</FieldLabel>
                <Input value={lastName} onChange={(e) => setLastName(e.target.value)} className="h-12" />
              </Field>
              <Field>
                <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">Email</FieldLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12" />
              </Field>

              <Field>
                <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">Phone Number</FieldLabel>
                <Input 
                  type="tel" 
                  inputMode="numeric" 
                  value={phone} 
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); 
                    setPhone(value);
                  }} 
                  className="h-12" 
                  placeholder="09171234567" 
                  maxLength={11}
                />
              </Field>

              <Field>
                <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">Date of Birth</FieldLabel>
                <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="h-12" />
              </Field>
              <Field>
                <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">Gender</FieldLabel>
                <div className="relative">
                  <select 
                    value={gender} 
                    onChange={(e) => setGender(e.target.value)} 
                    className="w-full h-12 px-3 pr-10 text-sm border bg-background rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="" disabled>Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
              </Field>
            </div>

            {/* Delivery Address */}
            <Field>
              <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">Delivery Address</FieldLabel>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} className="h-12" placeholder="House No., Street, Barangay, City, Province" />
            </Field>
          </FieldGroup>

          {/* Action Section */}
          <div className="flex flex-col pt-6"> {/* items-start aligns button/text to the left */}
            <Button 
              onClick={handleSave} 
              className="w-full h-12 text-xs uppercase tracking-widest font-bold"
            >
              Save Changes
            </Button>
            
            <div className="h-5"> {/* Removed text-center */}
              {saved && (
                <p className="text-xs text-green-600 dark:text-green-400 font-medium animate-in fade-in slide-in-from-left-2 duration-300">
                  Changes saved!
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SECURITY TAB */}
      {activeTab === "security" && (
        <div className="max-w-md space-y-6">
          <FieldGroup>
            <Field>
              <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">Current Password</FieldLabel>
              <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="h-12" placeholder="••••••••" />
            </Field>
            <Field>
              <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">New Password</FieldLabel>
              <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="h-12" placeholder="••••••••" />
            </Field>
            <Field>
              <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">Confirm New Password</FieldLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`h-12 ${confirmPassword && newPassword !== confirmPassword ? "border-red-400 focus-visible:ring-red-400" : ""}`}
                placeholder="••••••••"
              />
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-xs text-red-500 mt-1">Passwords do not match.</p>
              )}
            </Field>
          </FieldGroup>
          <Button disabled={!currentPassword || !newPassword || newPassword !== confirmPassword} className="w-full sm:w-auto h-11 px-8 text-xs uppercase tracking-widest">
            Update Password
          </Button>
        </div>
      )}
    </div>
  );
}