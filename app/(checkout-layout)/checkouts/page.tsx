"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  LockKeyhole,
  ShieldCheck,
  Tag,
  Truck,
  Zap,
  CreditCard,
  Smartphone,
  Banknote,
  ChevronRight,
  MessageCircle,
  Box,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// ─── Data ─────────────────────────────────────────────────────────────────────

const cartItems = [
  { id: 1, name: "Velvet Lounge Chair", price: 450, qty: 1, image: "/chair1.png", color: "Forest Green" },
  { id: 2, name: "Velvet Lounge Chair", price: 450, qty: 1, image: "/cabinet1.png", color: "Forest Brown" },
  { id: 3, name: "Velvet Lounge Chair", price: 450, qty: 1, image: "/chair.jpg", color: "Forest Green" },
  { id: 4, name: "Velvet Lounge Chair", price: 450, qty: 1, image: "/chair.jpg", color: "Forest Green" },
];

const PREVIEW_COUNT = 2;

const shippingOptions = [
  {
    id: "standard",
    icon: Truck,
    label: "Standard Delivery",
    detail: "5–7 business days",
    priceLabel: "₱100",
  },
  {
    id: "express",
    icon: Zap,
    label: "Express Delivery",
    detail: "2–3 business days",
    priceLabel: "₱150",
  },
];

const paymentMethods = [
  { id: "paymongo", icon: Smartphone, label: "Online Payment", detail: "Pay via PayMongo" },
  { id: "cod",   icon: Banknote,   label: "Cash on Delivery", detail: "Pay when your order arrives" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Checkout() {
  const router = useRouter();

  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [selectedPayment, setSelectedPayment] = useState("gcash");
  const [showAllItems, setShowAllItems] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  const visibleItems = showAllItems ? cartItems : cartItems.slice(0, PREVIEW_COUNT);
  
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-12">
      <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12">

        {/* ── LEFT SIDE ──────────────────────────────────────────────────────── */}
        <div className="lg:col-span-6 space-y-6">


          {/* Section 2: Delivery */}
          <FieldGroup>
            <h2 className=" text-sm font-bold uppercase tracking-[0.15em]">Personal Information</h2>
            <div className="flex items-start gap-4">
              <Field className="flex-1">
                <FieldLabel htmlFor="firstName" className="text-[11px] font-bold uppercase tracking-wide">
                  First name
                </FieldLabel>
                <Input type="text" id="firstName" name="firstName" placeholder="John" required className="h-12 placeholder:text-base" />
              </Field>
              <Field className="flex-1">
                <FieldLabel htmlFor="lastName" className="text-[11px] font-bold uppercase tracking-wide">
                  Last name
                </FieldLabel>
                <Input type="text" id="lastName" name="lastName" placeholder="Doe" required className="h-12 placeholder:text-base" />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="phoneNumber" className="text-[11px] font-bold uppercase tracking-wide">
                Phone number
              </FieldLabel>
              <Input type="tel" id="phoneNumber" name="phoneNumber" placeholder="0917 123 4567" pattern="[0-9]{11}" required className="h-12 placeholder:text-base" />
            </Field>

            <Field>
              <FieldLabel htmlFor="regionAddress" className="text-[11px] font-bold uppercase tracking-wide">
                Region, Province, Municipality, Barangay
              </FieldLabel>
              <Input type="text" id="regionAddress" name="regionAddress" placeholder="e.g. Metro Manila, Bulacan, Baliuag City, Makinabang" required className="h-12 placeholder:text-base" />
            </Field>

            <div className="flex items-start gap-4">
              <Field className="flex-[2]">
                <FieldLabel htmlFor="streetAddress" className="text-[11px] font-bold uppercase tracking-wide">
                  House No, Street
                </FieldLabel>
                <Input type="text" id="streetAddress" name="streetAddress" placeholder="e.g. 0276, Jp Rizal Street" required className="h-12 placeholder:text-base" />
              </Field>
              <Field className="flex-1">
                <FieldLabel htmlFor="postalCode" className="text-[11px] font-bold uppercase tracking-wide">
                  Postal code
                </FieldLabel>
                <Input type="number" id="postalCode" name="postalCode" placeholder="3006" required className="h-12 placeholder:text-base" />
              </Field>
            </div>
          </FieldGroup>

          {/* Section 3: Shipping Option */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.15em] mb-4">Shipping Option</h2>
            <div className="space-y-2">
              {shippingOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedShipping === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedShipping(option.id)}
                    className={cn(
                      "w-full flex items-center gap-4 px-4 py-3.5 rounded-lg border text-left transition-all",
                      isSelected
                        ? "border-foreground bg-foreground/[0.03]"
                        : "border-border hover:border-foreground/40 hover:bg-accent/40"
                    )}
                  >
                    <span className={cn(
                      "h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                      isSelected ? "border-foreground" : "border-muted-foreground/40"
                    )}>
                      {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-foreground" />}
                    </span>
                    <Icon size={16} className={cn("shrink-0 transition-colors", isSelected ? "text-foreground" : "text-muted-foreground")} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wider">{option.label}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{option.detail}</p>
                    </div>
                    <span className="text-xs font-bold shrink-0">{option.priceLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4: Payment Method */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.15em] mb-4">Payment Method</h2>
            <div className="space-y-2">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                const isSelected = selectedPayment === method.id;
                return (
                  <div key={method.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedPayment(method.id)}
                      className={cn(
                        "w-full flex items-center gap-4 px-4 py-3.5 rounded-lg border text-left transition-all",
                        isSelected
                          ? "border-foreground bg-foreground/[0.03]"
                          : "border-border hover:border-foreground/40 hover:bg-accent/40",
                        isSelected && method.id === "card" ? "rounded-b-none border-b-0" : ""
                      )}
                    >
                      <span className={cn(
                        "h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                        isSelected ? "border-foreground" : "border-muted-foreground/40"
                      )}>
                        {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-foreground" />}
                      </span>
                      <Icon size={16} className={cn("shrink-0 transition-colors", isSelected ? "text-foreground" : "text-muted-foreground")} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wider">{method.label}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{method.detail}</p>
                      </div>
                      <ChevronRight size={14} className={cn("shrink-0 transition-all", isSelected ? "rotate-90 text-foreground" : "text-muted-foreground/40")} />
                    </button>

                    {/* Expandable card fields */}
                    {isSelected && method.id === "card" && (
                      <div className="border border-t-0 border-foreground rounded-b-lg px-4 pb-4 pt-3 space-y-3 bg-foreground/[0.02]">
                        <Field>
                          <FieldLabel htmlFor="cardNumber" className="text-[11px] font-bold uppercase tracking-wide">Card number</FieldLabel>
                          <Input
                            id="cardNumber" type="text" placeholder="1234 5678 9012 3456" maxLength={19}
                            value={cardNumber}
                            onChange={(e) => {
                              const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
                              setCardNumber(raw.replace(/(.{4})/g, "$1 ").trim());
                            }}
                            className="h-11 placeholder:text-sm font-mono"
                          />
                        </Field>
                        <div className="flex gap-3">
                          <Field className="flex-1">
                            <FieldLabel htmlFor="cardExpiry" className="text-[11px] font-bold uppercase tracking-wide">Expiry</FieldLabel>
                            <Input
                              id="cardExpiry" type="text" placeholder="MM / YY" maxLength={7}
                              value={cardExpiry}
                              onChange={(e) => {
                                const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
                                setCardExpiry(raw.length > 2 ? raw.slice(0, 2) + " / " + raw.slice(2) : raw);
                              }}
                              className="h-11 placeholder:text-sm font-mono"
                            />
                          </Field>
                          <Field className="flex-1">
                            <FieldLabel htmlFor="cardCvc" className="text-[11px] font-bold uppercase tracking-wide">CVC</FieldLabel>
                            <Input
                              id="cardCvc" type="text" placeholder="•••" maxLength={4}
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                              className="h-11 placeholder:text-sm font-mono"
                            />
                          </Field>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <Button variant="outline" className="w-full h-12 text-xs uppercase tracking-widest font-bold">
            Complete Purchase
          </Button>
        </div>

        {/* ── RIGHT SIDE: Order Summary ───────────────────────────────────────── */}
        <div className="lg:col-span-6">
          <Card className="sticky top-24 p-8">
            <h2 className="uppercase tracking-[0.2em] text-sm lg:text-base">Your Order</h2>

            {/* Product List */}
            <div className="space-y-1">
              {visibleItems.map((item) => (
                <div key={item.id} className="flex border-b border-border py-5 first:pt-0">
                  
                  {/* IMAGE CONTAINER - Updated with your custom background and Image component */}
                  <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden bg-[#f7f7f7] dark:bg-[#1a1a1a]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-center gap-1">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-[11px] text-muted-foreground italic">
                          {item.color}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-foreground">
                        ₱{item.price.toLocaleString()}
                      </p>
                    </div>
                    <p className="text-[10px] uppercase tracking-tighter text-muted-foreground">
                      Quantity: {item.qty}
                    </p>
                  </div>
                </div>
              ))}

              {/* View all / collapse toggle */}
              {cartItems.length > PREVIEW_COUNT && (
                <button
                  type="button"
                  onClick={() => setShowAllItems(!showAllItems)}
                  className="w-full flex items-center justify-between pt-4 group"
                >
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors font-bold">
                    {showAllItems ? "Show fewer items" : `View all ${cartItems.length} items`}
                  </span>
                  <ChevronRight
                    size={16}
                    className={cn(
                      "text-muted-foreground group-hover:text-foreground transition-all duration-300",
                      showAllItems ? "-rotate-90" : "rotate-90"
                    )}
                  />
                </button>
              )}
            </div>

            {/* Pricing Section */}
            <div className="space-y-3 border-t border-border pt-4">
              <div className="space-y-2">
                <div className="flex justify-between text-muted-foreground text-sm">
                  <span>Subtotal</span> 
                  <span className="text-foreground">₱1,800.00</span>
                </div>

                <div className="flex items-center justify-between text-muted-foreground text-sm">
                  <span className="flex items-center gap-2">
                    <Truck size={14} /> Shipping
                  </span>
                  <span className="text-foreground">₱100.00</span>
                </div>
              </div>
              
              <div className="border-t border-foreground/10 pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₱872.00</span>
              </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}