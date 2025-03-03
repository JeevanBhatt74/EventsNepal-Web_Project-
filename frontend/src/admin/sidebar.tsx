import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/blocks/sidebar";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

import { Home, LogOut, User } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

const items = [
  {
    title: "Events Request",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Profile",
    url: "/admin/profile",
    icon: User,
  },
];

export function SidebarComponent() {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <aside>
        <Sidebar>
          <SidebarContent className="w-[12rem]">
            <SidebarGroup>
              <SidebarGroupLabel>Menus</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild tooltip={item.title}>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <Button
              onClick={() => {
                Cookies.remove("adminToken");
                navigate("/admin/login");
              }}
              className="flex items-center gap-2"
            >
              Logout
              <LogOut className="size-4" />
            </Button>
          </SidebarFooter>
        </Sidebar>
      </aside>
      <main
        className="flex-1 ml-[14rem] pt-8"
        style={{
          width: "calc(100vw-var(--sidebar-width))",
        }}
      >
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
