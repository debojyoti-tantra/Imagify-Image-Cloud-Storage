import { Home, NotepadText, Images, FileQuestion, PhoneOutgoing } from "lucide-react"
import { Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
   {
      title: "Home",
      url: "/",
      icon: Home,
   },
   {
      title: "My Section",
      url: "/my-section",
      icon: NotepadText,
   },
   {
      title: "My Images",
      url: "/my-images",
      icon: Images,
   },
   {
      title: "About",
      url: "/about",
      icon: FileQuestion,
   },
   {
      title: "Contact",
      url: "/contact",
      icon: PhoneOutgoing,
   },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
        <div className="m-3 flex flex-col gap-4">
          <SidebarGroupLabel className="text-3xl">Imagify</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <p>{item.title}</p>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
