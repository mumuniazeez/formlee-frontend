"use client";
import React from "react";
import { Button } from "../ui/button";
import {
  BookOpen,
  CircleQuestionMark,
  FileText,
  LayoutDashboard,
  LogOut,
  Plus,
  Settings,
  Workflow,
} from "lucide-react";
import Image from "next/image";
import { useAuthContext } from "@/contexts/AuthProvider";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const { user } = useAuthContext();

  const navItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    {
      label: "Forms",
      href: "/dashboard/forms",
      icon: FileText,
      badge: "forms.length",
    },
    { label: "Submissions", href: "/dashboard/submissions", icon: Settings },
    { label: "Integrations", href: "/dashboard/integrations", icon: Workflow },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ];
  const secondaryNavItems = [
    { label: "Documentation", href: "/dashboard/integrations", icon: BookOpen },
    {
      label: "Visit Landing Page",
      href: "/dashboard/settings",
      icon: CircleQuestionMark,
    },
  ];
  return (
    <aside className="fixed top-0 left-0 z-50 w-64 h-screen">
      <div className="bg-white border-r border-zinc-200 h-full flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex gap-3 items-center border-b p-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white shadow-xs group-hover:bg-zinc-800 transition-colors">
              <svg
                className="w-4 h-4 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="4" />
                <path d="m8 12 3 3 5-5" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight text-zinc-900">
                Formlee
              </h3>
              <p className="text-xs text-black/60">Workspace</p>
            </div>
          </div>
          <div className="p-3 border-b space-y-4">
            <Button className={"w-full"}>
              <Plus /> Create form
            </Button>

            <div>
              <h5 className="text-xs text-black/60 mb-3">MENU</h5>

              <div className="space-y-3 flex flex-col">
                {navItems.map((navigation, idx) => (
                  <Button
                    key={idx}
                    variant={"ghost"}
                    className={"justify-start text-black/60"}
                    onClick={() => router.push(navigation.href)}
                  >
                    <navigation.icon />{" "}
                    <span className="text-sm">{navigation.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="p-3 border-b space-y-4">
            <div>
              <h5 className="text-xs text-black/60 mb-3"> RESOURCES</h5>

              <div className="space-y-3 flex flex-col">
                {secondaryNavItems.map((navigation, idx) => (
                  <Button
                    key={idx}
                    variant={"ghost"}
                    className={"justify-start text-black/60"}
                    onClick={() => router.push(navigation.href)}
                  >
                    <navigation.icon />{" "}
                    <span className="text-sm">{navigation.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center p-3 border-t cursor-pointer hover:bg-white">
          <div className="flex gap-3 items-center">
            <Image
              src="/profile_picture.png"
              alt="profile picture"
              width={40}
              height={40}
              className="rounded-full h-10"
            />
            <div>
              <h6 className="tex-sm font-semibold line-clamp-1">
                {user!.firstName} {user!.lastName}
              </h6>
              <p className="text-xs">PRO PLAN</p>
            </div>
          </div>
          <Button variant={"ghost"}>
            <LogOut />
          </Button>
        </div>
      </div>
    </aside>
  );
}
