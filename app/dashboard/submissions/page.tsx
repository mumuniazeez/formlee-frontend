"use client";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { CheckCircle, Download, Plus, Search, Trash2, X } from "lucide-react";
import * as api from "@/lib/api";
import FormCard from "@/components/FormCard";
import { Badge } from "@/components/ui/Badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { forms } from "@/app/dashboard/forms/page";
import { useState } from "react";

interface Submission {
  id: string;
  formId: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const submissions: Submission[] = [
  {
    id: "sub_01J8X9QK3M4N5P6Q7R8S9T0U1V",
    formId: "frm_a1b2c3d4e5f6",
    name: "Jane Smith",
    email: "jane@example.com",
    message: "Hi! Testing my Formlee endpoint directly from the setup console.",
    read: true,
    createdAt: "2026-09-25T09:12:00Z",
  },
  {
    id: "sub_02K9Y0RL4N5O6P7Q8R9S0T1U2W",
    formId: "frm_a1b2c3d4e5f6",
    name: "John Doe",
    email: "john@example.com",
    message:
      "Hey, I wanted to ask about your enterprise SLA options and custom webhook support. Do you have documentation I could review?",
    read: false,
    createdAt: "2026-08-26T14:30:00Z",
  },
  {
    id: "sub_03L0Z1SM5O6P7Q8R9S0T1U2V3X",
    formId: "frm_a1b2c3d4e5f6",
    name: "Michael Chen",
    email: "michael@example.com",
    message:
      "We are migrating 45 client marketing websites to Formlee. Do you offer bulk export or an agency plan with team seats?",
    read: true,
    createdAt: "2026-08-26T10:05:00Z",
  },
];

function FormsPage() {
  const [selectedSubmission, setSubmittedSubmission] =
    useState<Submission | null>(null);
  const formSelectionItems = [
    {
      label: `All Forms (${forms.length})`,
      value: "all",
    },
    ...forms.map((form) => ({ label: form.name, value: form.id })),
  ];
  return (
    <div className="space-y-8 animate-in fade-in duration-200 p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-light">
            Submissions
          </h1>
          <p className="text-sm sm:text-sm text-zinc-500 mt-1">
            Global inbox for all incoming form submissions across your accounts
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant={"secondary"}>
            <CheckCircle /> Mark all read
          </Button>
          <Button variant={"secondary"}>
            <Download /> CSV
          </Button>
          <Button variant={"secondary"}>
            <Download /> JSON
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between border p-3 rounded-xl bg-white shadow-sm">
        <InputGroup className="w-[25%]">
          <InputGroupInput placeholder="Search email, name keywords..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>

        <div className="flex items-center gap-3 ">
          <Select items={formSelectionItems} defaultValue={"all"}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {formSelectionItems.map((item) => (
                <SelectItem value={item.value} key={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size={"sm"}>All</Button>
          <Button size={"sm"} variant={"secondary"}>
            Active
          </Button>
          <Button size={"sm"} variant={"secondary"}>
            Paused
          </Button>
        </div>
      </div>

      <div className={`flex ${selectedSubmission && "gap-8"}`}>
        <div className="border rounded-xl bg-white divide-y w-full">
          {submissions.map((submission) => (
            <div
              className={`hover:bg-black/2 transition-all p-5 flex items-center justify-between cursor-pointer ${selectedSubmission?.id === submission.id && `border-l-3 border-l-black`}`}
              key={submission.id}
              id={submission.id}
              onClick={() => setSubmittedSubmission(submission)}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h5 className="text-sm font-semibold">{submission.name}</h5>
                  <p className="text-xs text-black/60">{`<${submission.email}>`}</p>
                </div>
                <Badge variant={"default"}>{submission.formId}</Badge>
                <p className="text-sm">{submission.message}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-xs text-black/60">
                  {new Date(submission.createdAt).getDate()}/
                  {new Date(submission.createdAt).getMonth()}/
                  {new Date(submission.createdAt).getFullYear()}
                </p>
                <Button variant={"destructive"}>
                  <Trash2 />
                </Button>
              </div>
            </div>
          ))}
        </div>
        {selectedSubmission && (
          <div className="border rounded-xl bg-white w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="tex-sm font-semibold">
                    {selectedSubmission.name}
                  </h3>
                  <Badge variant="success">Delivered</Badge>
                </div>
                <p className="text-xs text-black/60">
                  {selectedSubmission.email}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant={"destructive"}>
                  <Trash2 />
                </Button>
                <Button
                  variant={"ghost"}
                  onClick={() => setSubmittedSubmission(null)}
                >
                  <X />
                </Button>
              </div>
            </div>

            <div className="bg-secondary p-3 rounded-lg grid grid-cols-2 gap-3">
              <div>
                <h6 className="text-xs font-semibold text-black/60">
                  FORM ENDPOINT
                </h6>
                <p className="text-sm font-semibold">
                  {selectedSubmission.formId}
                </p>
              </div>
              <div>
                <h6 className="text-xs font-semibold text-black/60">
                  DATE RECEIVED
                </h6>
                <p className="text-sm font-semibold">
                  {new Date(selectedSubmission.createdAt).getDate()}/
                  {new Date(selectedSubmission.createdAt).getMonth()}/
                  {new Date(selectedSubmission.createdAt).getFullYear()}
                </p>
              </div>
              <div>
                <h6 className="text-xs font-semibold text-black/60">
                  CLIENT IP
                </h6>
                <p className="text-sm font-semibold">192.168.434.0.1</p>
              </div>
              <div>
                <h6 className="text-xs font-semibold text-black/60">COUNTRY</h6>
                <p className="text-sm font-semibold">Nigeria</p>
              </div>
            </div>

            <div>
              <h5>PARSED FORM FIELDS </h5>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FormsPage;
