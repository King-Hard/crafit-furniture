"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { 
  Bell, 
  CircleHelp,
  CircleUser, 
  EllipsisVertical,
  Home,
  LayoutDashboard, 
  LogOut, 
  Megaphone,
  MessageCircle, 
  Package, 
  Settings, 
  ShoppingBag, 
  ShoppingCart,
  Store,
  Tag,
  UsersRound, 
  WandSparklesIcon,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { GiHandSaw } from "react-icons/gi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export default function AdminSidebar() {
  const [account, setAccount] = useState(false);
  const router = useRouter();
  const accountMenuRef = useRef<HTMLDivElement>(null);
  
  async function handleLogout() {
    router.push("/authentication");
  }
  
  return (
    <Sidebar className="border-r border-accent">
      <SidebarHeader className="py-4 px-4 border-b border-accent">
        <div className="flex items-center gap-2">
          <GiHandSaw size={24} className="text-primary" />
          <h1 className="tracking-[0.2em] font-bold uppercase font-sans text-lg">Craftit</h1>
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-0">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
            MAIN
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Dashboard">
                <Link href="/admin/dashboard" className="flex items-center gap-3">
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Store Management */}
        <SidebarGroup>
          <SidebarGroupLabel className=" text-xs font-medium text-muted-foreground">
            STORE MANAGEMENT
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Inventory">
                <Link href="/admin/inventory" className="flex items-center gap-3">
                  <Package size={18} />
                  <span>Inventory</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Orders">
                <Link href="/admin/orders" className="flex items-center gap-3">
                  <ShoppingBag size={18} />
                  <span>Orders</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Products">
                <Link href="/admin/products" className="flex items-center gap-3">
                  <Tag size={18} />
                  <span>Products</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Customers">
                <Link href="/admin/customers" className="flex  items-center gap-3">
                  <UsersRound size={18} />
                  <span>Customers</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Sales & Marketing */}
        <SidebarGroup>
          <SidebarGroupLabel className=" text-xs font-medium text-muted-foreground">
            SALES & MARKETING
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Promotions">
                <Link href="/admin/promotions" className="flex items-center gap-3">
                  <Megaphone size={18} />
                  <span>Promotions</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Customize Store">
                <Link href="/admin/customize-furniture" className="flex items-center gap-3">
                  <WandSparklesIcon size={18} />
                  <span>Customize Furniture</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Communication */}
        <SidebarGroup>
          <SidebarGroupLabel className=" text-xs font-medium text-muted-foreground">
            COMMUNICATION
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Chat">
                <Link href="/admin/chats" className="flex items-center gap-3">
                  <MessageCircle size={18} />
                  <span>Chat</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Notifications">
                <Link href="/admin/notifications" className="flex items-center gap-3">
                  <Bell size={18} />
                  <span>Notifications</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Support */}
        <SidebarGroup className="mt-auto">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Help Center">
                <Link href="/admin/help" className="flex items-center gap-3">
                  <CircleHelp size={18} />
                  <span>Help Center</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Settings">
                <Link href="/admin/settings" className="flex items-center gap-3">
                  <Settings size={18} />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with User Menu */}
      <SidebarFooter className="border-t border-accent  ">
        <div className="relative" ref={accountMenuRef}>
          <button
            onClick={() => setAccount(!account)}
            className={`w-full rounded-lg p-2 transition-colors ${
              account ? "bg-accent" : "hover:bg-accent"
            }`}
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  KP
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium truncate">Kuya Pogi</p>
                <p className="text-xs text-muted-foreground truncate">admin@craftit.com</p>
              </div>
              <EllipsisVertical size={18} className="text-muted-foreground flex-shrink-0" />
            </div>
          </button>

          {/* Account Dropdown Menu */}
          {account && (
            <div className="absolute bottom-full left-0 w-full mb-2 bg-popover border border-accent rounded-lg shadow-lg overflow-hidden">
              <div className="p-2 border-b border-accent">
                <div className="flex items-center gap-3 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      KP
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">Kuya Pogi</p>
                    <p className="text-xs text-muted-foreground truncate">admin@craftit.com</p>
                  </div>
                </div>
              </div>
              
              <div className="p-1">
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Profile">
                    <Link href="/profile" className="flex items-center gap-3">
                      <CircleUser size={18} />
                      <span>Profile</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="AccountSettings">
                    <Link href="/account-settings" className="flex items-center gap-3">
                      <Settings size={18} />
                      <span>Account Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </div>
              
              <div className="border-t border-accent p-1">
                <SidebarMenuItem>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      setAccount(false);
                      handleLogout();
                    }} 
                    className="w-full justify-start gap-3 px-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    <LogOut size={18} />
                    <span>Log out</span>
                  </Button>
                </SidebarMenuItem>
              </div>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}