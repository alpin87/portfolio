import { Link, useLocation } from "wouter";
import {
  BookOpen,
  Briefcase,
  FolderKanban,
  GitPullRequest,
  Github,
  LayoutDashboard,
  Layers,
  Mail,
  Terminal,
} from "lucide-react";
import { portfolioData } from "@/lib/data";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const NAV = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/opensource", label: "Open Source", icon: GitPullRequest },
  { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/skills", label: "Skills", icon: Layers },
];

export default function AppSidebar() {
  const [location] = useLocation();
  const { name, title, contact, projects, openSource } = portfolioData;

  const counts: Record<string, number> = {
    "/projects": projects.length,
    "/opensource": openSource.length,
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Terminal className="size-4" />
                </div>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate font-semibold">{name}</span>
                  <span className="text-muted-foreground truncate text-xs">{title}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV.map(item => {
                const active =
                  item.href === "/"
                    ? location === "/"
                    : location.startsWith(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={active} tooltip={item.label}>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                    {counts[item.href] !== undefined && (
                      <SidebarMenuBadge>{counts[item.href]}</SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>외부 링크</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="GitHub">
                  <a href={`https://${contact.github}`} target="_blank" rel="noreferrer">
                    <Github />
                    <span>GitHub</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="블로그">
                  <a href={`https://${contact.blog}`} target="_blank" rel="noreferrer">
                    <BookOpen />
                    <span>블로그</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="메일 보내기">
                  <a href={`mailto:${contact.email}`}>
                    <Mail />
                    <span>메일 보내기</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild tooltip={contact.email}>
              <a href={`mailto:${contact.email}`}>
                <div className="bg-muted text-muted-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Mail className="size-4" />
                </div>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate text-xs font-medium">채용 · 협업 문의</span>
                  <span className="text-muted-foreground truncate text-xs">{contact.email}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
