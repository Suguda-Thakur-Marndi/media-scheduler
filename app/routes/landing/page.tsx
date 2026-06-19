"use client";

import Link from "next/link";
import { useAuth, UserButton } from "@clerk/nextjs";
import {
  ArrowRight,
  Check,
  Sparkles,
  Calendar,
  Zap,
  BarChart3,
  Globe2,
  Pencil,
  Send,
} from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ChannelTypeEnum, getChannelIcon } from "@/constants/channels";

/* ─── Data ─────────────────────────────────────────────────────────── */

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Channels", href: "#channels" },
  { label: "Pricing",  href: "#pricing"  },
];

const platformBadges = [
  { type: ChannelTypeEnum.TWITTER,   color: "#000000", bg: "#e5e7eb", className: "left-[1%]  top-[10%]", delay: "0s" },
  { type: ChannelTypeEnum.LINKEDIN,  color: "#2867b2", bg: "#dbeafe", className: "left-[5%]  top-[36%]", delay: "0.4s" },
  { type: ChannelTypeEnum.YOUTUBE,   color: "#FF0000", bg: "#fee2e2", className: "left-[1%]  top-[62%]", delay: "0.8s" },
  { type: ChannelTypeEnum.BLUESKY,   color: "#1285fe", bg: "#dbeafe", className: "right-[1%] top-[10%]", delay: "0.2s" },
  { type: ChannelTypeEnum.INSTAGRAM, color: "#E4405F", bg: "#fce7f3", className: "right-[5%] top-[36%]", delay: "0.6s" },
  { type: ChannelTypeEnum.THREADS,   color: "#000000", bg: "#e5e7eb", className: "right-[1%] top-[62%]", delay: "1s" },
  { type: ChannelTypeEnum.FACEBOOK,  color: "#1877F2", bg: "#dbeafe", className: "right-[9%] top-[62%]", delay: "1.2s" },
];

const stats = [
  { value: "8+",   label: "Social Platforms",         icon: Globe2 },
  { value: "AI",   label: "Smart Content Drafting",   icon: Sparkles },
  { value: "1",    label: "Unified Workspace",         icon: Calendar },
];

const features = [
  {
    icon: Pencil,
    title: "Draft smarter with AI",
    description:
      "Generate compelling captions, hashtags, and variations for every platform in seconds — then fine-tune before you publish.",
    accent: "from-violet-500/20 to-purple-500/10",
    border: "border-violet-200 dark:border-violet-800/40",
    iconBg: "bg-violet-100 dark:bg-violet-900/40",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    icon: Calendar,
    title: "Plan your whole week at a glance",
    description:
      "Drag-and-drop scheduling across a visual calendar. See every draft, idea, and scheduled post without switching tabs.",
    accent: "from-sky-500/20 to-cyan-500/10",
    border: "border-sky-200 dark:border-sky-800/40",
    iconBg: "bg-sky-100 dark:bg-sky-900/40",
    iconColor: "text-sky-600 dark:text-sky-400",
  },
  {
    icon: Zap,
    title: "Customize per channel, publish everywhere",
    description:
      "Start with one draft and tailor it for Twitter's brevity, LinkedIn's tone, or Instagram's hashtags — all in one workflow.",
    accent: "from-amber-500/20 to-yellow-500/10",
    border: "border-amber-200 dark:border-amber-800/40",
    iconBg: "bg-amber-100 dark:bg-amber-900/40",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    icon: BarChart3,
    title: "Stay organized, not overwhelmed",
    description:
      "A clean idea board keeps inspiration captured. Move ideas to drafts, drafts to scheduled — no spreadsheet required.",
    accent: "from-emerald-500/20 to-green-500/10",
    border: "border-emerald-200 dark:border-emerald-800/40",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
];

const steps = [
  {
    step: "01",
    icon: Pencil,
    title: "Capture your idea",
    description: "Write a quick idea or let AI help you expand it into a full draft.",
  },
  {
    step: "02",
    icon: Zap,
    title: "Customize per platform",
    description: "Adapt tone, length, and hashtags for each channel from one central post.",
  },
  {
    step: "03",
    icon: Send,
    title: "Schedule & publish",
    description: "Pick the perfect time and let Lemon.ai handle the rest automatically.",
  },
];

/* ─── Component ──────────────────────────────────────────────────────── */

export default function LandingPage() {
  const { isSignedIn } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── Keyframes injected once ───────────────────────── */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.9); opacity: 0;   }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .float      { animation: float 4s ease-in-out infinite; }
        .fade-up    { animation: fade-up 0.7s ease both; }
        .shimmer-text {
          background: linear-gradient(
            90deg,
            var(--foreground) 0%,
            oklch(0.84 0.18 122) 40%,
            oklch(0.72 0.20 145) 60%,
            var(--foreground) 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .glow-orb {
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .badge-float { animation: float 4s ease-in-out infinite; }
        .pulse-ring {
          position: absolute;
          inset: -6px;
          border-radius: 1.25rem;
          border: 1.5px solid currentColor;
          animation: pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite;
        }
      `}</style>

      {/* ── Navbar ────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <Logo className="shrink-0" />

          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {!isSignedIn ? (
              <>
                <Button asChild variant="ghost" className="rounded-full px-5 text-sm font-medium">
                  <Link href="/sign-in">Log in</Link>
                </Button>
                <Button
                  asChild
                  className="rounded-full px-5 text-sm font-medium shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all"
                >
                  <Link href="/sign-up">Get started — it&apos;s free</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild className="rounded-full px-5 text-sm font-medium">
                  <Link href="/schedule">Open workspace</Link>
                </Button>
                <UserButton appearance={{ elements: { avatarBox: "h-9 w-9" } }} />
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          {/* Ambient glow orbs */}
          <div
            className="glow-orb absolute -top-32 left-1/4 h-[600px] w-[600px] opacity-25 dark:opacity-15"
            style={{ background: "oklch(0.84 0.18 122)" }}
          />
          <div
            className="glow-orb absolute -top-16 right-1/4 h-[400px] w-[400px] opacity-15 dark:opacity-10"
            style={{ background: "oklch(0.72 0.20 200)" }}
          />

          {/* Grid overlay */}
          <div className="pointer-events-none absolute inset-0 opacity-30 dark:opacity-10 [background-image:linear-gradient(to_right,rgba(15,23,42,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.07)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(248,250,252,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(248,250,252,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />

          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

          <div className="relative mx-auto flex min-h-[780px] max-w-7xl flex-col px-6 pb-20 pt-20">

            {/* Floating platform badges */}
            <div className="pointer-events-none absolute inset-0 hidden md:block">
              {platformBadges.map((platform) => {
                const icon = getChannelIcon(platform.type);
                return (
                  <div
                    key={platform.type}
                    className={`badge-float absolute ${platform.className} rounded-2xl border border-border/60 bg-card/90 p-3.5 shadow-xl backdrop-blur-sm`}
                    style={{ animationDelay: platform.delay }}
                  >
                    {/* Pulse ring */}
                    <span className="pulse-ring" style={{ color: platform.color, opacity: 0.35 }} />
                    {icon && (
                      <div
                        className="flex size-10 items-center justify-center rounded-xl text-white shadow-sm"
                        style={{ backgroundColor: platform.color }}
                      >
                        <HugeiconsIcon icon={icon} color="currentColor" className="size-5" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Hero copy */}
            <div className="z-10 mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center text-center">
              {/* Badge */}
              <div
                className="fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/90 px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur-sm"
                style={{ animationDelay: "0.1s" }}
              >
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span>AI-powered scheduling for every platform</span>
                <span className="ml-1 rounded-full bg-primary/15 px-2 py-0.5 text-xs font-semibold text-primary">NEW</span>
              </div>

              {/* Headline */}
              <h1
                className="fade-up max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
                style={{ animationDelay: "0.2s", lineHeight: "1.08" }}
              >
                <span className="shimmer-text">Your social media</span>
                <br />
                <span className="text-foreground">command centre</span>
              </h1>

              {/* Sub */}
              <p
                className="fade-up mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
                style={{ animationDelay: "0.3s" }}
              >
                Draft with AI, customize per channel, and schedule across 8 platforms — all from one beautifully simple workspace.
              </p>

              {/* CTAs */}
              <div
                className="fade-up mt-10 flex flex-wrap items-center justify-center gap-3"
                style={{ animationDelay: "0.4s" }}
              >
                {!isSignedIn ? (
                  <>
                    <Button
                      asChild
                      className="group h-12 rounded-full px-7 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 transition-all"
                    >
                      <Link href="/sign-up">
                        Start for free
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="h-12 rounded-full px-7 text-base font-medium border-border/70 hover:bg-muted/60 transition-all"
                    >
                      <Link href="/sign-in">Log in</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      asChild
                      className="group h-12 rounded-full px-7 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 transition-all"
                    >
                      <Link href="/schedule">
                        Open workspace
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="h-12 rounded-full px-7 text-base">
                      <Link href="/ideas">View ideas</Link>
                    </Button>
                  </>
                )}
              </div>

              <p className="fade-up mt-4 text-sm text-muted-foreground/70" style={{ animationDelay: "0.5s" }}>
                No credit card required · Free forever tier
              </p>
            </div>

            {/* Stats row */}
            <div className="fade-up z-10 mt-14 grid gap-4 sm:grid-cols-3" style={{ animationDelay: "0.55s" }}>
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/70 px-6 py-7 text-center backdrop-blur-sm transition-all hover:border-border hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Icon className="mx-auto mb-2 h-5 w-5 text-primary/70" />
                    <div className="text-4xl font-bold tracking-tight text-foreground">{stat.value}</div>
                    <div className="mt-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Features grid ─────────────────────────────────── */}
        <section id="features" className="mx-auto max-w-7xl px-6 pb-24 pt-8">
          <div className="mb-14 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Features</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Everything you need,<br />nothing you don&apos;t
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              We strip away the noise so you can focus on creating great content and building your audience.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className={`group relative overflow-hidden rounded-3xl border ${f.border} bg-gradient-to-br ${f.accent} p-7 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-card/60`}
                >
                  <div className={`mb-5 inline-flex rounded-2xl ${f.iconBg} p-3`}>
                    <Icon className={`h-5 w-5 ${f.iconColor}`} />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold leading-snug text-foreground">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── How it works ─────────────────────────────────── */}
        <section className="relative overflow-hidden border-y border-border/50 bg-muted/30 py-24 dark:bg-muted/10">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">How it works</p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                From idea to published<br />in three steps
              </h2>
            </div>

            <div className="relative grid gap-8 md:grid-cols-3">
              {/* connector line */}
              <div className="absolute top-10 left-[16.67%] right-[16.67%] hidden h-px bg-gradient-to-r from-border via-primary/40 to-border md:block" />

              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.step} className="relative flex flex-col items-center text-center">
                    <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-border/70 bg-card shadow-md">
                      <Icon className="h-7 w-7 text-primary" />
                      <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow">
                        {i + 1}
                      </span>
                    </div>
                    <div className="text-3xl font-black tracking-tight text-primary/20 mb-1">{s.step}</div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{s.title}</h3>
                    <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Platforms strip ───────────────────────────────── */}
        <section id="channels" className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Supported channels</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Publish everywhere<br />from one place
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              Connect your accounts and manage all your social profiles without ever leaving Lemon.ai.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { type: ChannelTypeEnum.TWITTER,   label: "Twitter / X",  color: "#000000" },
              { type: ChannelTypeEnum.LINKEDIN,  label: "LinkedIn",     color: "#2867b2" },
              { type: ChannelTypeEnum.INSTAGRAM, label: "Instagram",    color: "#E4405F" },
              { type: ChannelTypeEnum.FACEBOOK,  label: "Facebook",     color: "#1877F2" },
              { type: ChannelTypeEnum.BLUESKY,   label: "Bluesky",      color: "#1285fe" },
              { type: ChannelTypeEnum.THREADS,   label: "Threads",      color: "#000000" },
              { type: ChannelTypeEnum.YOUTUBE,   label: "YouTube",      color: "#FF0000" },
            ].map((p) => {
              const icon = getChannelIcon(p.type);
              return (
                <div
                  key={p.type}
                  className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-card px-5 py-3 shadow-sm transition-all hover:border-border hover:shadow-md hover:-translate-y-0.5"
                >
                  {icon && (
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-xl text-white"
                      style={{ backgroundColor: p.color }}
                    >
                      <HugeiconsIcon icon={icon} color="currentColor" className="size-4" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-foreground">{p.label}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── CTA Banner ────────────────────────────────────── */}
        {/* ── Pricing ──────────────────────────────────────── */}
        <section id="pricing" className="mx-auto max-w-7xl px-6 pb-24">
          <div className="mb-14 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Pricing</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Simple, honest pricing
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              Start free, upgrade when you&apos;re ready. No hidden fees.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Free */}
            <div className="flex flex-col rounded-3xl border border-border/60 bg-card p-8 transition-all hover:shadow-lg hover:-translate-y-0.5">
              <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Free</p>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-5xl font-bold tracking-tight text-foreground">$0</span>
                <span className="mb-1.5 text-muted-foreground">/mo</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">Perfect for getting started and exploring the platform.</p>
              <ul className="mt-8 flex flex-col gap-3 text-sm text-foreground flex-1">
                {["3 scheduled posts/month", "2 connected channels", "AI drafting (10 uses/mo)", "Idea board"].map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-primary" />{f}
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="mt-8 rounded-full">
                <Link href="/sign-up">Get started free</Link>
              </Button>
            </div>

            {/* Pro — highlighted */}
            <div className="relative flex flex-col rounded-3xl border-2 border-primary bg-gradient-to-b from-primary/10 to-primary/5 p-8 shadow-xl shadow-primary/15 transition-all hover:shadow-2xl hover:-translate-y-1">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow">
                Most popular
              </span>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Pro</p>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-5xl font-bold tracking-tight text-foreground">$12</span>
                <span className="mb-1.5 text-muted-foreground">/mo</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">For creators who publish consistently across platforms.</p>
              <ul className="mt-8 flex flex-col gap-3 text-sm text-foreground flex-1">
                {["Unlimited scheduled posts", "7 connected channels", "AI drafting (unlimited)", "Per-channel customization", "Priority support"].map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-primary" />{f}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-8 rounded-full shadow-md shadow-primary/20">
                <Link href="/sign-up">Start Pro trial</Link>
              </Button>
            </div>

            {/* Team */}
            <div className="flex flex-col rounded-3xl border border-border/60 bg-card p-8 transition-all hover:shadow-lg hover:-translate-y-0.5">
              <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Team</p>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-5xl font-bold tracking-tight text-foreground">$39</span>
                <span className="mb-1.5 text-muted-foreground">/mo</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">For small teams managing multiple brands and clients.</p>
              <ul className="mt-8 flex flex-col gap-3 text-sm text-foreground flex-1">
                {["Everything in Pro", "Up to 5 team members", "All 8 channels", "Shared workspace & drafts", "Analytics dashboard"].map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-primary" />{f}
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="mt-8 rounded-full">
                <Link href="/sign-up">Contact sales</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-28">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-[oklch(0.78_0.20_140)] to-[oklch(0.68_0.18_160)] px-8 py-20 text-center shadow-2xl shadow-primary/30">
            {/* decorative circles */}
            <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary-foreground/70">
              Ready to level up?
            </p>
            <h2 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl">
              Start scheduling smarter today
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-primary-foreground/80">
              Join creators who plan, draft, and publish without the chaos.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {!isSignedIn ? (
                <>
                  <Button
                    asChild
                    className="group h-12 rounded-full bg-white px-8 text-base font-semibold text-primary shadow-lg hover:bg-white/90 transition-all"
                  >
                    <Link href="/sign-up">
                      Get started for free
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-12 rounded-full border-white/40 bg-transparent px-8 text-base font-medium text-primary-foreground hover:bg-white/10 transition-all"
                  >
                    <Link href="/sign-in">Log in</Link>
                  </Button>
                </>
              ) : (
                <Button
                  asChild
                  className="group h-12 rounded-full bg-white px-8 text-base font-semibold text-primary shadow-lg hover:bg-white/90 transition-all"
                >
                  <Link href="/schedule">
                    Open workspace
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              )}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-primary-foreground/70">
              {["No credit card", "Free forever tier", "8 platforms included"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="border-t border-border/50 bg-muted/20 px-6 py-12 dark:bg-muted/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 md:flex-row md:justify-between">
          <Logo />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
