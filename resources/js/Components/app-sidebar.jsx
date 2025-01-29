import * as React from "react"
import {
    GalleryVerticalEnd,
} from "lucide-react"

import {NavMain} from "@/components/nav-main"
import {NavUser} from "@/components/nav-user"
import {TeamSwitcher} from "@/components/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import {usePage} from "@inertiajs/react";


export function AppSidebar({...props}) {

    const user = usePage().props.auth.user;

    return (
        (<Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher/>
            </SidebarHeader>
            <SidebarContent>
                <NavMain/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user}/>
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>)
    );
}
