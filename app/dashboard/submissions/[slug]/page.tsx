"use client";
import { useParams, useRouter } from "next/navigation";
import { forms } from "../page";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Code2,
  Copy,
  Download,
  Globe,
  Inbox,
  Send,
  Settings,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeBlock from "@/components/ui/CodeBlock";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const submissions = [
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

const formStatus = [
  { label: "Active (Receiving Submissions)", value: "active" },
  { label: "Paused (Temporarily Rejecting)", value: "paused" },
  { label: "Archived", value: "archive" },
];

function FormDetailsPage() {
  const { slug } = useParams();
  const form = forms.find((f) => f.slug === slug)!;
  const router = useRouter();
  
  return (
    <div className="space-y-8 animate-in fade-in duration-200 p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex gap-3 items-center">
          <Button variant={"secondary"} onClick={() => router.back()}>
            <ArrowLeft />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-xl sm:text-2xl font-semibold text-zinc-950 tracking-light">
                {form.name}
              </h3>
              <Badge
                variant={
                  form.status === "active"
                    ? "success"
                    : form.status === "paused"
                      ? "default"
                      : "muted"
                }
              >
                {form.status}
              </Badge>
            </div>
            <p className="text-sm sm:text-sm text-zinc-500 mt-1">{form.slug}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant={"secondary"}>
            <Copy /> Create Endpoint
          </Button>
          <Button variant={"destructive"}>
            <Trash2 />
          </Button>
        </div>
      </div>

      <div className="border hover:shadow-sm transition-all p-5 rounded-xl bg-white flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <div className="bg-black text-white p-2 rounded-2xl">
            <Globe />
          </div>
          <div>
            <p className="text-xs text-black/60">PRODUCTION ENDPOINT URL</p>
            <p className="font-semibold tracking-wide">
              https://formlee.xyz/f/{form.slug}
            </p>
          </div>
        </div>

        <Button>
          <Copy /> Copy Endpoint
        </Button>
      </div>

      <Tabs>
        <TabsList variant={"line"}>
          <TabsTrigger value={"connect-setup"}>
            <Code2 /> Connect & Setup
          </TabsTrigger>
          <TabsTrigger value={"submission"}>
            <Inbox /> Submissions ({form._count.submissions})
          </TabsTrigger>
          <TabsTrigger value={"setting"}>
            <Settings /> Form Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value={"connect-setup"} className={"space-y-5"}>
          <Tabs className="border hover:shadow-sm transition-all p-5 rounded-xl bg-white">
            <div className="flex items-center justify-between  mb-2">
              <div>
                <h5 className="font-bold">Connect your code</h5>
                <p className="text-xs text-black/60">
                  Select your framework or language to view drop-in code
                  snippets.
                </p>
              </div>
              <TabsList>
                <TabsTrigger value={"html"}>HTML</TabsTrigger>
                <TabsTrigger value={"react"}>React</TabsTrigger>
                <TabsTrigger value={"nextjs"}>Nextjs</TabsTrigger>
                <TabsTrigger value={"curl"}>CURL</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value={"html"}>
              <CodeBlock
                language="html"
                filename="index.html"
                code={`<!-- 1. Add your Formlee endpoint to your form action -->
<form action="https://formlee.com/f/${form.slug}" method="POST">
  <!-- Honeypot for spam bots (optional) -->
  <input type="text" name="_gotcha" style="display:none" />

  <label for="name">Name</label>
  <input type="text" id="name" name="name" required />

  <label for="email">Email</label>
  <input type="email" id="email" name="email" required />

  <label for="message">Message</label>
  <textarea id="message" name="message" rows="4" required></textarea>

  <button type="submit">Send Message</button>
</form>`}
              />
            </TabsContent>
            <TabsContent value={"react"}>
              <CodeBlock
                language="jsx"
                filename="ContactForm.jsx"
                code={`import React, { useState } from 'react';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch('https://formlee.com/f/${form.slug}', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return <p className="text-emerald-600 font-medium">Thank you! Your message was received.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="email" name="email" placeholder="Your email" required />
      <textarea name="message" placeholder="Your inquiry..." required />
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}`}
              />
            </TabsContent>
            <TabsContent value={"nextjs"}>
              <CodeBlock
                language="tsx"
                filename="app/components/FormleeContact.tsx"
                code={`// app/components/FormleeContact.tsx
'use client';

import { useState } from 'react';

export default function FormleeContact() {
  const [sent, setSent] = useState(false);

  async function handleAction(formData: FormData) {
    const res = await fetch('https://formlee.com/f/${form.slug}', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) setSent(true);
  }

  return (
    <form action={handleAction}>
      <input type="text" name="name" placeholder="Name" required />
      <input type="email" name="email" placeholder="Email" required />
      <textarea name="message" placeholder="Message" required />
      <button type="submit">Submit to Formlee</button>
    </form>
  );
}`}
              />
            </TabsContent>
            <TabsContent value={"curl"}>
              <CodeBlock
                language="curl"
                filename="Terminal"
                code={`# Test submission via cURL
curl -X POST "https://formlee.com/f/${form.slug}" \

  -H "Accept: application/json" \

  -d "name=Test User" \

  -d "email=tester@domain.com" \

  -d "message=Hello from terminal!"`}
              />
            </TabsContent>
          </Tabs>
          <div className="border hover:shadow-sm transition-all p-5 rounded-xl bg-white space-y-3">
            <div>
              <h5 className="font-bold">
                Test submitting to this form right now
              </h5>
              <p className="text-xs text-black/60">
                Submit this sample form to verify your endpoint ans watch it
                appear immediately in your inbox.
              </p>
            </div>

            <form action="" className="md:w-[50%] space-y-3">
              <div className="flex gap-3 w-full">
                <div className="space-y-2 w-full">
                  <Label>Name</Label>
                  <Input type="text" value="John Doe" />
                </div>
                <div className="space-y-2 w-full">
                  <Label>Email</Label>
                  <Input type="email" value="test@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Textarea
                  value="HCabbagei! Testing my Formlee endpoint directly from the setup console."
                  className="min-h-20"
                />
              </div>

              <Button type="submit">
                <Send /> Send Test Submission
              </Button>
            </form>
          </div>
        </TabsContent>
        <TabsContent value={"submission"}>
          <div className="flex items-center justify-between  mb-2">
            <div>
              <p className="text-xs text-black/60">
                Showing {submissions.length} submissions for this form
              </p>
            </div>
            <Button variant={"secondary"}>
              <Download /> Export CSV
            </Button>
          </div>
          <div className="border rounded-xl bg-white divide-y">
            {submissions.map((submission) => (
              <div
                className="hover:bg-black/2 transition-all p-5 flex items-center justify-between cursor-pointer"
                key={submission.id}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h5 className="text-sm font-semibold">{submission.name}</h5>
                    <p className="text-xs text-black/60">{`<${submission.email}>`}</p>
                  </div>
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
        </TabsContent>
        <TabsContent value={"setting"}>
          <div className="border hover:shadow-sm transition-all p-5 rounded-xl bg-white space-y-5">
            <h5 className="font-bold">General Configuration</h5>

            <form action="" className="space-y-4 md:w-[50%]">
              <div className="space-y-2">
                <Label>FORM NAME</Label>
                <Input type="text" placeholder="Form Name" value={form.name} />
              </div>
              <div className="space-y-2">
                <Label>CUSTOM REDIRECT URL (OPTIONAL)</Label>
                <Input type="url" value={form.redirectLink || ""} />
                <p className="text-xs text-black/60">
                  Where users are redirected after standard HTML POST
                  submissions.
                </p>
              </div>
              <div className="space-y-2">
                <Label>TARGET NOTIFICATION EMAIL</Label>
                <Input type="email" value={form.targetEmail} />
              </div>

              <FieldLabel>
                <Field orientation="horizontal">
                  <Checkbox
                    id="toggle-checkbox-1"
                    name="toggle-checkbox-1"
                    checked={form.emailNotification}
                  />
                  <FieldContent>
                    <FieldTitle>Email Notification</FieldTitle>
                    <FieldDescription>
                      Send an instant notification when a submission is received
                    </FieldDescription>
                  </FieldContent>
                </Field>
              </FieldLabel>

              <div className="space-y-2">
                <Label>FORM STATUS</Label>
                <Select items={formStatus} defaultValue={"active"}>
                  <SelectTrigger className={"w-full"}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {formStatus.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button>Save Changes</Button>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default FormDetailsPage;
