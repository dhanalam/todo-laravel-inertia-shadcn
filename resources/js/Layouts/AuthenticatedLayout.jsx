import {AppSidebar} from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/toaster"
import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {Separator} from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import {Link, usePage} from '@inertiajs/react';
import {Button} from "@/Components/ui/button.jsx";
import __has from "lodash/has";

export default function AuthenticatedLayout({breadcrumb, children}) {

    return (
        <SidebarProvider>
            <Toaster />
            <AppSidebar/>
            <SidebarInset>
                <header
                    className="flex justify-between h-16 shrink-0 items-center transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1"/>
                        <Separator orientation="vertical" className="mr-2 h-4"/>
                        {breadcrumb && (
                            <Breadcrumb>
                                <BreadcrumbList>
                                    {breadcrumb.links.map((link, index) => (
                                        <React.Fragment key={index}>
                                            <BreadcrumbItem className="hidden md:block">
                                                <BreadcrumbLink href={link.href}>
                                                    {link.text}
                                                </BreadcrumbLink>
                                            </BreadcrumbItem>
                                            {index < breadcrumb.links.length - 1 && (
                                                <BreadcrumbSeparator className="hidden md:block"/>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </BreadcrumbList>
                            </Breadcrumb>
                        )}
                    </div>
                    {__has(breadcrumb, 'action') && (
                        <div className="gap-2 px-4">
                            <Link href={breadcrumb.action.link}>
                                <Button>{breadcrumb.action.icon ? <breadcrumb.action.icon/>: ''} {breadcrumb.action.text}</Button>
                            </Link>
                        </div>
                    )}
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <main>{children}</main>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
