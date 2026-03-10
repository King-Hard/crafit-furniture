"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  User, ShoppingBag, KeyRound, Camera,
  ChevronDown, X, MapPin,
  Package, Truck, CheckCircle, XCircle,
} from "lucide-react";

type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
type DeliveryStatus = "Preparing" | "Out for Delivery" | "Delivered" | "Rescheduled" | "Failed Delivery";

interface OrderItem {
  name: string;
  qty: number;
  price: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  orderStatus: OrderStatus;
  deliveryStatus: DeliveryStatus;
  address: string;
  driver: string | null;
  scheduledDate: string;
  items: OrderItem[];
}

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
    items: [
      { name: "Queen Bed Frame", qty: 1, price: 12000, image: "/bed1.jpg" },
    ],
  },
  {
    id: "ORD-003", date: "Mar 5, 2026", total: 4500,
    orderStatus: "Cancelled", deliveryStatus: "Preparing",
    address: "123 Rizal St., Baliuag, Bulacan",
    driver: null, scheduledDate: "Mar 6, 2026",
    items: [
      { name: "Office Chair", qty: 1, price: 4500, image: "/chair1.jpg" },
    ],
  },
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
  { id: "profile", label: "Profile Info", icon: User },
  { id: "security", label: "Security", icon: KeyRound },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("orders");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
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
              <div className="w-full h-full flex items-center justify-center text-xl font-semibold text-muted-foreground">
                MS
              </div>
            )}
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 w-6 h-6 bg-foreground text-background rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
          >
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
      <div className="flex gap-1 border-b mb-8">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-3 text-xs uppercase tracking-widest font-medium border-b-2 transition-colors -mb-px ${
              activeTab === id
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
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
              <Button variant="outline" className="w-full sm:w-auto text-xs uppercase tracking-widest h-10 px-6">
                Start Shopping
              </Button>
            </div>
          ) : (
            orders.map((order) => {
              const isExpanded = expandedOrder === order.id;
              const stepIndex = getStepIndex(order.deliveryStatus);
              const isCancelled = order.orderStatus === "Cancelled";
              const isFailed = order.deliveryStatus === "Failed Delivery" || order.deliveryStatus === "Rescheduled";

              return (
                <div key={order.id} className="border rounded-xl overflow-hidden">
                  {/* Order Header */}
                  <button
                    onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors text-left"
                  >
                    <div>
                      <p className="text-sm font-medium">{order.id}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{order.date} · ₱{order.total.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${orderStatusStyles[order.orderStatus]}`}>
                        {order.orderStatus}
                      </span>
                      <ChevronDown size={15} className={`text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </div>
                  </button>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t px-5 py-5 space-y-6">

                      {/* Items */}
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

                      {/* Delivery Tracker */}
                      {!isCancelled && (
                        <div className="border-t pt-6">
                          <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-6">
                            Delivery Status
                          </p>

                          {isFailed ? (
                            <div className="flex items-center gap-2 text-red-500">
                              <XCircle size={16} />
                              <p className="text-sm font-medium">{order.deliveryStatus}</p>
                            </div>
                          ) : (
                            <div className="relative flex justify-between items-center">

                              {/* line */}
                              <div className="absolute top-4 left-0 w-full h-[2px] bg-border" />

                              {deliverySteps.map((step, i) => {
                                const isCompleted = i <= stepIndex;
                                const isActive = i === stepIndex;

                                const icons = [Package, Truck, CheckCircle];
                                const StepIcon = icons[i];

                                return (
                                  <div key={step} className="relative z-10 flex flex-col items-center text-center w-full">

                                    {/* circle */}
                                    <div
                                      className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all
                                      ${
                                        isCompleted
                                          ? "bg-foreground text-background border-foreground"
                                          : "bg-background text-muted-foreground border-border"
                                      }
                                      ${isActive ? "ring-2 ring-foreground ring-offset-2" : ""}
                                      `}
                                    >
                                      <StepIcon size={15} />
                                    </div>

                                    {/* label */}
                                    <p
                                      className={`text-[10px] mt-2 uppercase tracking-wide
                                      ${
                                        isCompleted
                                          ? "text-foreground font-medium"
                                          : "text-muted-foreground"
                                      }
                                      `}
                                    >
                                      {step}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Cancel Button */}
                      {!isCancelled && order.orderStatus !== "Delivered" && (
                        <div className="border-t pt-4">
                          <Button
                            variant="outline"
                            className="w-full sm:w-auto text-xs uppercase tracking-widest h-9 px-5 text-red-500 border-red-200 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600"
                          >
                            <X size={13} className="mr-2" />
                            Cancel Order
                          </Button>
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

      {/* PROFILE INFO TAB */}
      {activeTab === "profile" && (
        <div className="max-w-2xl space-y-6">
          <FieldGroup>
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
                <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">Phone</FieldLabel>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="h-12" placeholder="0917 123 4567" />
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
            <Field>
              <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">Delivery Address</FieldLabel>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} className="h-12" placeholder="House No., Street, Barangay, City, Province" />
            </Field>
            <Field>
              <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">Facebook / Messenger</FieldLabel>
              <Input value={facebook} onChange={(e) => setFacebook(e.target.value)} className="h-12" placeholder="facebook.com/yourprofile" />
            </Field>
          </FieldGroup>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
            {saved && <p className="text-xs text-green-600 dark:text-green-400">Changes saved!</p>}
            {!saved && <span />}
            <Button onClick={handleSave} className="w-full sm:w-auto h-11 px-8 text-xs uppercase tracking-widest">
              Save Changes
            </Button>
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

          <Button
            disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
            className="w-full sm:w-auto h-11 px-8 text-xs uppercase tracking-widest"
          >
            Update Password
          </Button>
        </div>
      )}
    </div>
  );
}