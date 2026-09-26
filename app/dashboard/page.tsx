"use client";
import React, { useState } from "react";
import {
  FileText,
  Inbox,
  ArrowUpRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";

export default function OverviewView() {
  const [copiedID, setCopiedID] = useState<string | null>(null);
  const forms = [
    {
      id: 20,
      name: "Contact Form",
      endpointId: "https://formlee.com/f/form_8x29kd",
      status: "active",
    },
    {
      id: 10,
      name: "Newsletter Signup",
      endpointId: "https://formlee.com/f/form_3m91ka",
      status: "active",
    },
    {
      id: 121,
      name: "Beta Access Waitlist",
      endpointId: "https://formlee.com/f/form_5v72pq",
      status: "active",
    },
  ];

  const submissions = [
    {
      id: 1,
      sender: {
        name: "John Doe",
        email: "john@example.com",
      },
      form: "Contact Form",
      message: "Hey, I wanted to ask about your enterprise SLA options...",
      submittedAt: "12:29 PM",
      status: "Delivered",
    },
    {
      id: 2,
      sender: {
        name: "Sarah Jenkins",
        email: "sarah@example.com",
      },
      form: "Newsletter Signup",
      message: "Subscribed to weekly developer digests.",
      submittedAt: "12:13 PM",
      status: "Delivered",
    },
    {
      id: 3,
      sender: {
        name: "Michael Chen",
        email: "michael@example.com",
      },
      form: "Contact Form",
      message: "We are migrating 45 client marketing websites to Form...",
      submittedAt: "11:30 AM",
      status: "Delivered",
    },
    {
      id: 4,
      sender: {
        name: "Elena Rostova",
        email: "elena.rostova@techcorp.io",
      },
      form: "Beta Access Waitlist",
      message: "Excited for the Next.js App Router direct server actions...",
      submittedAt: "09:15 AM",
      status: "Delivered",
    },
    {
      id: 5,
      sender: {
        name: "David Kim",
        email: "david.kim@startup.co",
      },
      form: "Customer Feedback",
      message: "The spam filtering caught 100% of our bot traffic durin...",
      submittedAt: "08:40 PM",
      status: "Delivered",
    },
  ];
  const recentSubmissions = submissions.slice(0, 5);

  const handleCopyEnpoint = (endpointId: string) => {
    const url = `https://formlee.com/f/${endpointId}`;
    navigator.clipboard.writeText(url);
    setCopiedID(endpointId);
    // addToast(`Endpoint URL coiped to clipboard!`):
    setTimeout(() => setCopiedID(null), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200 p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-light">
            Good morning, User.
          </h1>
          <p className="text-sm sm:text-sm text-zinc-500 mt-1">
            Here&apos;s What&apos;s happening with your forms today.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button className="space-x-1.5 text-black bg-white hover:bg-zinc-50 border border-zinc-200/90 transition-colors rounded-2xl">
            <Link href={"/dashboard/froms"}>
              <span className="text-[12px]">All Forms</span>
            </Link>
          </Button>
          <Button className="">
            <Link href={"docs"}>
              <span className="text-[12px]">View Docs</span>
            </Link>
            <ExternalLink className="w-3.5,h-3.5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-zinc-200/80 shadows-xs">
          <div className="flex items-Center justify-between text-zinc-500 mb-2">
            <span className="text-xs">Total Submissions</span>
            <Inbox className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900 font-mono">
            23
          </div>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 inline-flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>+14% vs last week</span>
          </span>
          `
        </div>

        <div className="p-5 bg-white rounded-2xl border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-medium"></span>
            <FileText className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-semibold text-zinc-900 font-mono">
            {/* {activeforms} */}
            24
          </div>
          <span className="[11px] text-zinc-500 mt-1 block">
            12 total endpoints
          </span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-zinc-200/80 shadows-xs">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-medium">This Month</span>
            <Clock className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900 font-mono">
            12
          </div>
          <span className="text-[11px] text-zinc-500 mt-1 block">
            Limit: 34
          </span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-zinc-200/80 shadows-xs">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-medium">Spam Block Rate</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono">
            99.9%
          </div>
          <span className="text-[11px] text-zinc-500 mt-1 block">
            0 bots leaks reported
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border-zinc-200/80 p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-zinc-950">
              Active Endpoints
            </h2>
            <p className="text-xs text-zinc-500">
              Quickly grab endpoints URLs to embed in your websites.
            </p>
          </div>
          <button className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 flex items-center space-x-1">
            <Link href={"/dashboard/forms"}>
              <span>Manage All</span>
            </Link>
            <ArrowUpRight className="w-3 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {forms.slice(0, 3).map((form) => {
            const isCopied = copiedID === form.endpointId;

            return (
              <div
                key={form.id}
                className="p-4 rounded-xl bg-zinc-50/80 border border-zinc-200/70 hover:border-zinc-300 transition-all flex flex-col justify-between"
              >
                <div className="m-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-bold text-zinc-900 truncate">
                      {form.name}
                    </p>
                    <Badge
                      variant={form.status === "active" ? "success" : "muted"}
                      size="sm"
                    >
                      {form.status}
                    </Badge>
                  </div>
                  <p className="font-mono text-[11px] text-zinc-500 truncate">
                    {form.endpointId}
                  </p>
                  <hr className="text-zinc-500 mt-5" />
                  <div className="flex justify-between items-center">
                    <Button className="bg-white hover:bg-white inline-flex items-center space-x-1 text-[11px] font-medium text-zinc-600 hover:text-zinc-900m">
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600 font-semibold">
                            Copied
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </Button>
                    <Button className="text-zinc bg-white hover:bg-white text-[11px] font-semibold text-zinc-900 hover:underline">
                      Details →
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl border-zinc-200/80 p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="">
            <h2 className="text-base font-bold text-zinc-950">
              Recent Submissions
            </h2>
            <p className="text-xs text-zinc-500">
              Live incoming payloads from your active forms.
            </p>
          </div>
          <Button variant={"secondary"}>View all Submissions(6)</Button>
        </div>
        {recentSubmissions.length === 0 ? (
          <div className="p-10 text-center text-zinc-500 text-xs">
            No submissions recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50/70 border-b border-zinc-100 text-zinc-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-6 py-3">Sender & Email</th>
                  <th className="px-6 py-3">Form</th>
                  <th className="px-6 py-3">Message Summary</th>
                  <th className="px-6 py-3">Submitted</th>
                  <th className="px-6 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {recentSubmissions.map((sub) => (
                  <tr
                    key={sub.id}
                    className="hover:bg-zinc-50/80 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-3.5">
                      <div className="flex items-center space-x-2.5">
                        <div
                          className={`w-2 h-2 rounded-full ${!sub.status ? "bg-zinc-900" : "bg-transparent"}`}
                        />
                        <div>
                          <p className="font-bold text-zinc-900">
                            {sub.sender.name}
                          </p>
                          <p className="text-[11px] text-zinc-500 font-mono">
                            {sub.sender.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="font-medium text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded-md text-[11px]">
                        {sub.form}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 max-w-xs truncate text-zinc-600">
                      {sub.message}
                    </td>
                    <td className="px-6 py-3.5 text-zinc-500 font-mono text-[11px]">
                      {new Date(sub.submittedAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <Badge variant="success" size="sm">
                        Delivered
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
