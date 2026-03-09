"use client";

import { useState } from "react";
import { Store, Clock, Truck, KeyRound, Palette, Plus, Trash2, Save } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { AdminThemeToggle } from "@/components/ui/admin-toggle";
import { Textarea } from "@/components/ui/textarea";

interface BusinessHour {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

interface DeliveryArea {
  id: number;
  area: string;
  fee: number;
}

const initialBusinessHours: BusinessHour[] = [
  { day: "Monday", open: "08:00", close: "17:00", closed: false },
  { day: "Tuesday", open: "08:00", close: "17:00", closed: false },
  { day: "Wednesday", open: "08:00", close: "17:00", closed: false },
  { day: "Thursday", open: "08:00", close: "17:00", closed: false },
  { day: "Friday", open: "08:00", close: "17:00", closed: false },
  { day: "Saturday", open: "08:00", close: "12:00", closed: false },
  { day: "Sunday", open: "", close: "", closed: true },
];

const initialDeliveryAreas: DeliveryArea[] = [
  { id: 1, area: "Baliuag", fee: 150 },
  { id: 2, area: "San Rafael", fee: 200 },
  { id: 3, area: "Bustos", fee: 200 },
  { id: 4, area: "Angeles, Pampanga", fee: 350 },
  { id: 5, area: "San Fernando, Pampanga", fee: 350 },
];

const sections = [
  { id: "store", label: "Store Info", icon: Store },
  { id: "hours", label: "Business Hours", icon: Clock },
  { id: "delivery", label: "Delivery Settings", icon: Truck },
  { id: "account", label: "Account & Password", icon: KeyRound },
  { id: "appearance", label: "Appearance", icon: Palette },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState("store");
  const [saved, setSaved] = useState(false);

  const [storeName, setStoreName] = useState("Craftit Furniture");
  const [storeAddress, setStoreAddress] = useState("123 Rizal St., Baliuag, Bulacan");
  const [storeEmail, setStoreEmail] = useState("admin@craftit.com");
  const [storePhone, setStorePhone] = useState("0917-123-4567");
  const [storeDesc, setStoreDesc] = useState("Quality handcrafted furniture made with passion.");

  const [businessHours, setBusinessHours] = useState<BusinessHour[]>(initialBusinessHours);

  const [deliveryAreas, setDeliveryAreas] = useState<DeliveryArea[]>(initialDeliveryAreas);
  const [newArea, setNewArea] = useState("");
  const [newFee, setNewFee] = useState("");

  const [name, setName] = useState("Kuya Pogi");
  const [email, setEmail] = useState("admin@craftit.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function updateHour(index: number, field: keyof BusinessHour, value: string | boolean) {
    setBusinessHours((prev) => prev.map((h, i) => i === index ? { ...h, [field]: value } : h));
  }

  function addDeliveryArea() {
    if (!newArea.trim() || !newFee) return;
    setDeliveryAreas((prev) => [...prev, { id: Date.now(), area: newArea.trim(), fee: parseFloat(newFee) }]);
    setNewArea("");
    setNewFee("");
  }

  function removeDeliveryArea(id: number) {
    setDeliveryAreas((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold">Settings</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Manage your store configuration</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Nav */}
        <div className="w-52 shrink-0 space-y-1">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeSection === id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 border bg-card rounded-xl p-6 space-y-6">

          {/* Store Info */}
          {activeSection === "store" && (
            <>
              <div>
                <h2 className="font-semibold text-base">Store Information</h2>
                <p className="text-muted-foreground text-xs mt-0.5">Basic details about your store</p>
              </div>
              <FieldGroup>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">Store Name</FieldLabel>
                    <Input value={storeName} onChange={(e) => setStoreName(e.target.value)} className="h-10" />
                  </Field>
                  <Field>
                    <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">Email</FieldLabel>
                    <Input type="email" value={storeEmail} onChange={(e) => setStoreEmail(e.target.value)} className="h-10" />
                  </Field>
                  <Field>
                    <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">Phone</FieldLabel>
                    <Input value={storePhone} onChange={(e) => setStorePhone(e.target.value)} className="h-10" />
                  </Field>
                  <Field>
                    <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">Address</FieldLabel>
                    <Input value={storeAddress} onChange={(e) => setStoreAddress(e.target.value)} className="h-10" />
                  </Field>
                </div>
                <Field>
                  <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">Store Description</FieldLabel>
                  <Textarea
                    value={storeDesc}
                    onChange={(e) => setStoreDesc(e.target.value)}
                    rows={3}
                  />
                </Field>
              </FieldGroup>
            </>
          )}

          {/* Business Hours */}
          {activeSection === "hours" && (
            <div className="space-y-6">
              <div>
                <h2 className="font-semibold text-base">Business Hours</h2>
                <p className="text-muted-foreground text-xs mt-0.5">Set your store's operating hours per day</p>
              </div>

              <div className="space-y-4 max-w-2xl">
                {businessHours.map((hour, i) => (
                  <div key={hour.day} className="flex items-center gap-6 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    {/* Day Label */}
                    <span className="text-sm w-24 shrink-0 font-medium">{hour.day}</span>

                    {/* Time Picker Container */}
                    <div className="flex items-center gap-3 flex-1">
                      {hour.closed ? (
                        <div className="h-10 flex items-center flex-1">
                          <span className="text-sm text-muted-foreground italic bg-muted px-3 py-1 rounded-md w-full border border-dashed text-center">
                            Closed for the day
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 flex-1">
                          <Input
                            type="time"
                            value={hour.open}
                            onChange={(e) => updateHour(i, "open", e.target.value)}
                            className="h-9 w-[130px] text-sm" // Fixed width para hindi lumaki
                          />
                          <span className="text-muted-foreground text-[10px] uppercase font-bold">to</span>
                          <Input
                            type="time"
                            value={hour.close}
                            onChange={(e) => updateHour(i, "close", e.target.value)}
                            className="h-9 w-[130px] text-sm" // Fixed width para hindi lumaki
                          />
                        </div>
                      )}
                    </div>

                    {/* Closed Toggle - Using shadcn Switch style if you have it, or a cleaner checkbox */}
                    <div className="flex items-center gap-2 shrink-0 border-l pl-6">
                      <input
                        type="checkbox"
                        id={`closed-${hour.day}`}
                        checked={hour.closed}
                        onChange={(e) => updateHour(i, "closed", e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor={`closed-${hour.day}`} className="text-xs font-medium cursor-pointer select-none">
                        Closed
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Delivery Settings */}
          {activeSection === "delivery" && (
            <>
              <div>
                <h2 className="font-semibold text-base">Delivery Settings</h2>
                <p className="text-muted-foreground text-xs mt-0.5">Manage delivery areas and fees</p>
              </div>
              <div className="space-y-2">
                <div className="grid grid-cols-[1fr_auto_auto] gap-3 pb-2 border-b">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Area</span>
                  <span className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground w-28 text-center">Fee</span>
                  <span className="w-8" />
                </div>
                {deliveryAreas.map((area) => (
                  <div key={area.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-3">
                    <Input
                      value={area.area}
                      onChange={(e) => setDeliveryAreas((prev) => prev.map((a) => a.id === area.id ? { ...a, area: e.target.value } : a))}
                      className="h-10"
                      placeholder="Area name"
                    />
                    <div className="relative w-28">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₱</span>
                      <Input
                        type="number"
                        value={area.fee}
                        onChange={(e) => setDeliveryAreas((prev) => prev.map((a) => a.id === area.id ? { ...a, fee: parseFloat(e.target.value) } : a))}
                        className="h-10 pl-7"
                        placeholder="Fee"
                      />
                    </div>
                    <button
                      onClick={() => removeDeliveryArea(area.id)}
                      className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 text-muted-foreground hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}

                {/* Add new area */}
                <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 pt-2 border-t">
                  <Input
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    className="h-10"
                    placeholder="New area..."
                  />
                  <div className="relative w-28">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₱</span>
                    <Input
                      type="number"
                      value={newFee}
                      onChange={(e) => setNewFee(e.target.value)}
                      className="h-11 pl-7"
                      placeholder="Fee"
                    />
                  </div>
                  <button
                    onClick={addDeliveryArea}
                    className="p-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Account & Password */}
          {activeSection === "account" && (
            <>
              <div>
                <h2 className="font-semibold text-base">Account & Password</h2>
                <p className="text-muted-foreground text-xs mt-0.5">Update your admin account details</p>
              </div>
              <FieldGroup>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">Full Name</FieldLabel>
                    <Input value={name} onChange={(e) => setName(e.target.value)} className="h-10"/>
                  </Field>
                  <Field>
                    <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">Email</FieldLabel>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-10"/>
                  </Field>
                </div>

                <div className="border-t pt-4 space-y-4">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Change Password</p>
                  <Field>
                    <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">Current Password</FieldLabel>
                    <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="h-10"placeholder="••••••••" />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">New Password</FieldLabel>
                      <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="h-10"placeholder="••••••••" />
                    </Field>
                    <Field>
                      <FieldLabel className="text-[11px] font-bold uppercase tracking-wide">Confirm Password</FieldLabel>
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
                  </div>
                </div>
              </FieldGroup>
            </>
          )}

          {/* Appearance */}
          {activeSection === "appearance" && (
            <>
              <div>
                <h2 className="font-semibold text-base">Appearance</h2>
                <p className="text-muted-foreground text-xs mt-0.5">Customize the look of your admin panel</p>
              </div>
              <div className="flex items-center justify-between py-4 border-b">
                <div>
                  <p className="text-sm font-medium">Dark Mode</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Toggle between light and dark theme</p>
                </div>
                <AdminThemeToggle />
              </div>
            </>
          )}

          {/* Save Button */}
          {activeSection !== "appearance" && (
            <div className="flex items-center justify-between pt-4 border-t">
              {saved
                ? <p className="text-xs text-green-600 dark:text-green-400">Changes saved!</p>
                : <span />
              }
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-primary text-primary-foreground text-sm px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                <Save size={15} />
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}