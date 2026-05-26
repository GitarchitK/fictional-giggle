"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  FolderOpen,
  Users,
  Receipt,
  Globe,
  MessageCircle,
  X,
  Plus,
  Play,
  ArrowRight,
  TrendingUp,
  Shield,
  Star,
  Check,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useCreateLead } from "@/lib/api/hooks";
import { cn } from "@/lib/utils";
import * as Accordion from "@radix-ui/react-accordion";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { toast } from "react-hot-toast";
import { useAuth } from "@/lib/auth/context";
import DashboardLoader from "@/components/DashboardLoader";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function LandingPage() {
  const router = useRouter();
  const createLead = useCreateLead();
  const { user, logout } = useAuth();

  // Loading screen state
  const [showLoader, setShowLoader] = useState(false);
  const [loaderTarget, setLoaderTarget] = useState("/dashboard");

  const handleGoToDashboard = (target = "/dashboard") => {
    setLoaderTarget(target);
    setShowLoader(true);
  };

  // 1. Top Announcement Bar state
  const [showAnnounce, setShowAnnounce] = useState(true);

  // 2. Pricing billing toggles
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  // 3. Exit intent popup triggers
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [exitPopupDismissed, setExitPopupDismissed] = useState(false);
  const [exitEmail, setExitEmail] = useState("");

  // 4. Live Chat Widget states
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatEmail, setChatEmail] = useState("");
  const [chatSubmitted, setChatSubmitted] = useState(false);

  // 5. Scroll triggers for mobile sticky footer & header opacity
  const [scrolledPast, setScrolledPast] = useState(false);

  // 5.1 Smart Navbar visibility on scroll down
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navVisible, setNavVisible] = useState(true);

  // 6. Interactive Visuals State Enhancements
  const [showcaseMode, setShowcaseMode] = useState<"interactive" | "3d">("interactive");
  const [sliderPos, setSliderPos] = useState(50);
  const [seatsCount, setSeatsCount] = useState(5);
  const [calcTools, setCalcTools] = useState({
    clickup: true,
    notion: true,
    slack: true,
    hubspot: false,
    quickbooks: true,
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }
      
      setScrolledPast(currentScrollY > 600);
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // 6. Exit Intent Detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 50 && !exitPopupDismissed && !showExitPopup) {
        setShowExitPopup(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [exitPopupDismissed, showExitPopup]);

  const handleExitEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!exitEmail) return;

    createLead.mutate({
      email: exitEmail,
      message: "Exit-intent popup subscription - 1 month free request",
    });

    setExitPopupDismissed(true);
    setShowExitPopup(false);
    setExitEmail("");
    toast.success("Offer claimed! Check your inbox.");
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatEmail || !chatMessage) {
      toast.error("Please fill in email and message");
      return;
    }

    createLead.mutate({
      email: chatEmail,
      message: `Live chat inquiry: ${chatMessage}`,
    });

    setChatSubmitted(true);
    setChatMessage("");
  };

  // Pricing calculations
  const proPrice = billingCycle === "monthly" ? 19 : 15;

  return (
    <div className="bg-[#0A0C10] text-primary min-h-screen relative font-sans overflow-x-hidden">

      {/* Premium loading screen — shown when navigating to dashboard */}
      {showLoader && (
        <DashboardLoader onComplete={() => router.push(loaderTarget)} />
      )}

      
      {/* Background ambient light blooms */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] ambient-glow-blue pointer-events-none rounded-full" />
      <div className="absolute top-[25vh] right-1/4 w-[400px] h-[400px] ambient-glow-green pointer-events-none rounded-full" />
      <div className="absolute top-[120vh] left-1/3 w-[450px] h-[450px] ambient-glow-blue pointer-events-none rounded-full" />
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none h-[180vh]" />
      
      {/* 1. Announcement Bar */}
      {showAnnounce && (
        <div className="h-10 bg-blue/10 border-b border-blue/20 px-4 flex items-center justify-between z-50 sticky top-0">
          <div className="w-4" /> {/* Spacer */}
          <p className="text-xs text-blue text-center font-medium truncate flex-1">
            ⚡ Early access — first 50 users get Pro free for 3 months. <span className="font-semibold">[31 spots left]</span>
          </p>
          <button
            onClick={() => setShowAnnounce(false)}
            className="text-blue hover:opacity-80 p-1 bg-transparent border-none outline-none cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. Floating Animated Navbar */}
      <motion.header
        initial={{ y: -60, x: "-50%", opacity: 0 }}
        animate={{ 
          y: navVisible ? 0 : -100,
          x: "-50%", 
          opacity: navVisible ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed left-1/2 z-40 w-[calc(100%-2rem)] max-w-5xl h-14 rounded-full border border-white/[0.08] bg-[#0A0C10]/40 backdrop-blur-xl px-6 flex items-center justify-between shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300",
          showAnnounce ? "top-14" : "top-4",
          scrolledPast && "bg-[#0A0C10]/80 border-blue/20 shadow-[0_12px_40px_rgba(24,119,242,0.06)]"
        )}
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue rounded-md flex items-center justify-center shrink-0">
            <span className="text-[10px] font-medium text-white">Sw</span>
          </div>
          <span className="text-sm font-semibold tracking-tight text-white font-medium">
            Swi<span className="text-green font-medium">ya</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-[13px] text-text-secondary select-none font-medium">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#pain" className="hover:text-primary transition-colors">Why Swiya</a>
          <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/dashboard">
                <button className="h-9 px-5 text-xs font-semibold rounded-full bg-gradient-to-r from-[#1877F2] via-[#2b88ff] to-[#1DBF73] text-white shadow-[0_4px_14px_0_rgba(24,119,242,0.25)] hover:shadow-[0_6px_20px_rgba(29,191,115,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border-none cursor-pointer flex items-center justify-center">
                  Dashboard
                </button>
              </Link>
              <button
                onClick={logout}
                className="text-text-muted hover:text-white transition-all duration-200 text-xs font-semibold px-4 py-1.5 active:scale-95 bg-transparent border-none outline-none cursor-pointer"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/about">
                <button className="text-text-muted hover:text-white transition-all duration-200 text-xs font-semibold px-4 py-1.5 active:scale-95 bg-transparent border-none outline-none cursor-pointer">
                  About
                </button>
              </Link>
              <Link href="/login">
                <button className="text-text-muted hover:text-white transition-all duration-200 text-xs font-semibold px-4 py-1.5 active:scale-95 bg-transparent border-none outline-none cursor-pointer">
                  Log in
                </button>
              </Link>
              <button
                onClick={() => handleGoToDashboard("/signup")}
                className="h-9 px-5 text-xs font-semibold rounded-full bg-gradient-to-r from-[#1877F2] via-[#2b88ff] to-[#1DBF73] text-white shadow-[0_4px_14px_0_rgba(24,119,242,0.25)] hover:shadow-[0_6px_20px_rgba(29,191,115,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border-none cursor-pointer flex items-center justify-center"
              >
                Start free
              </button>
            </>
          )}
        </div>
      </motion.header>

      {/* 3. Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 pt-28 pb-20 max-w-5xl mx-auto space-y-8 select-none"
      >
        
        {/* Top pill badge */}
        <motion.div
          variants={itemVariants}
          className="bg-blue-dim border border-blue-border rounded-full px-3.5 py-1 text-xs text-blue font-medium flex items-center gap-1.5 animate-pulse"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI-powered agency workspace</span>
        </motion.div>

        {/* Headlines */}
        <motion.h1
          variants={itemVariants}
          className="text-[34px] md:text-[52px] leading-tight font-medium max-w-3xl tracking-tight text-primary"
        >
          Stop juggling 6 tools.<br />
          Run your entire agency in <span className="text-green">one place.</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          variants={itemVariants}
          className="text-text-secondary text-[15px] md:text-[17px] max-w-xl leading-relaxed"
        >
          Swiya replaces ClickUp, Notion, HubSpot, and your invoice spreadsheet with one clean workspace that has AI built into everything. Set up in 10 minutes. Cancel anytime.
        </motion.p>

        {/* CTA rows */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-3.5 pt-2"
        >
          {user ? (
            <Button onClick={() => handleGoToDashboard("/dashboard")} variant="primary" className="h-11 px-6 text-sm font-semibold bg-gradient-to-r from-[#1877F2] via-[#2b88ff] to-[#1DBF73] text-white border-none shadow-[0_4px_14px_0_rgba(24,119,242,0.25)] hover:shadow-[0_6px_20px_rgba(29,191,115,0.35)] transition-all">
              Go to Dashboard →
            </Button>
          ) : (
            <Button onClick={() => handleGoToDashboard("/signup")} variant="primary" className="h-11 px-6 text-sm font-semibold">
              Start free — no credit card →
            </Button>
          )}
          <a href="#features">
            <Button variant="ghost" className="h-11 px-6 text-sm">
              ▶ See how it works
            </Button>
          </a>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-2 pt-2"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={cn(
                  "w-7 h-7 rounded-full border border-[#0A0C10] flex items-center justify-center text-[10px] font-bold text-white shadow-md",
                  i === 1 && "bg-blue",
                  i === 2 && "bg-green",
                  i === 3 && "bg-[#F59E0B]",
                  i === 4 && "bg-[#38BDF8]"
                )}
              >
                {["AM", "SJ", "DC", "ER"][i - 1]}
              </div>
            ))}
          </div>
          <span className="text-xs text-text-muted">
            ★★★★★ Loved by 500+ freelancers & agencies
          </span>
        </motion.div>

        {/* 3.1 Interactive Dashboard Mockup Showcase */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-full pt-10"
        >
          <div className="bg-card border border-border-default rounded-2xl p-5 shadow-[0_32px_80px_rgba(0,0,0,0.65)] max-w-4xl mx-auto flex flex-col text-left">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3 mb-4 select-none">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-danger" />
                <div className="w-3 h-3 rounded-full bg-warning" />
                <div className="w-3 h-3 rounded-full bg-green" />
                <span className="text-[11px] text-text-muted ml-2 font-mono">https://mershal.in/dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-sidebar border border-border-subtle rounded-lg p-0.5 flex gap-1">
                  <button
                    onClick={() => setShowcaseMode("interactive")}
                    className={cn(
                      "px-2.5 py-1 text-[10px] font-semibold rounded transition-colors cursor-pointer border-none outline-none",
                      showcaseMode === "interactive" ? "bg-blue text-white" : "bg-transparent text-text-secondary hover:text-primary"
                    )}
                  >
                    Interactive
                  </button>
                  <button
                    onClick={() => setShowcaseMode("3d")}
                    className={cn(
                      "px-2.5 py-1 text-[10px] font-semibold rounded transition-colors cursor-pointer border-none outline-none",
                      showcaseMode === "3d" ? "bg-blue text-white" : "bg-transparent text-text-secondary hover:text-primary"
                    )}
                  >
                    3D View
                  </button>
                </div>

              </div>
            </div>
            
            {showcaseMode === "interactive" ? (
              <>
                {/* Mock stats widgets */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4 select-none">
                  <div className="bg-app border border-border-subtle p-3.5 rounded-lg space-y-1">
                    <span className="text-[10px] label-caps text-text-muted">Active Projects</span>
                    <div className="text-lg font-medium text-primary">3</div>
                  </div>
                  <div className="bg-app border border-border-subtle p-3.5 rounded-lg space-y-1">
                    <span className="text-[10px] label-caps text-text-muted">Billed Amount</span>
                    <div className="text-lg font-medium text-green">$17,300</div>
                  </div>
                  <div className="bg-app border border-border-subtle p-3.5 rounded-lg space-y-1">
                    <span className="text-[10px] label-caps text-text-muted">Pending Tasks</span>
                    <div className="text-lg font-medium text-warning">4</div>
                  </div>
                  <div className="bg-app border border-border-subtle p-3.5 rounded-lg space-y-1">
                    <span className="text-[10px] label-caps text-text-muted">Overdue Invoices</span>
                    <div className="text-lg font-medium text-danger">1</div>
                  </div>
                </div>

                {/* Mock Task Kanban Board visual */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 select-none">
                  <div className="bg-sidebar border border-border-subtle rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between border-b border-border-subtle pb-1.5 mb-2">
                      <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider">To Do</span>
                      <span className="w-4 h-4 rounded-full bg-active text-primary text-[9px] flex items-center justify-center">2</span>
                    </div>
                    <div className="bg-card border border-border-subtle p-3 rounded-lg text-xs space-y-1">
                      <div className="font-medium text-primary">Audit existing React Native layouts</div>
                      <div className="text-text-muted text-[10px]">Lumina Redesign</div>
                    </div>
                  </div>
                  <div className="bg-sidebar border border-border-subtle rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between border-b border-border-subtle pb-1.5 mb-2">
                      <span className="text-[11px] font-medium text-blue uppercase tracking-wider">In Progress</span>
                      <span className="w-4 h-4 rounded-full bg-blue-dim text-blue text-[9px] flex items-center justify-center">1</span>
                    </div>
                    <div className="bg-card border border-blue-border/40 p-3 rounded-lg text-xs space-y-1">
                      <div className="font-medium text-primary">Setup Stripe checkouts</div>
                      <div className="text-blue text-[10px]">Vertex SaaS</div>
                    </div>
                  </div>
                  <div className="bg-sidebar border border-border-subtle rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between border-b border-border-subtle pb-1.5 mb-2">
                      <span className="text-[11px] font-medium text-green uppercase tracking-wider">Done</span>
                      <span className="w-4 h-4 rounded-full bg-green-dim text-green text-[9px] flex items-center justify-center">1</span>
                    </div>
                    <div className="bg-card border border-border-subtle p-3 rounded-lg text-xs space-y-1 opacity-70">
                      <div className="font-medium text-primary line-through text-text-secondary">Setup auth credentials</div>
                      <div className="text-text-muted text-[10px]">Mershal Internal</div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="relative w-full rounded-xl border border-border-subtle overflow-hidden bg-app">
                <img 
                  src="/dashboard-hero.png" 
                  alt="Swiya 3D Command Center Dashboard Layout" 
                  className="w-full h-auto object-cover rounded-xl"
                />
              </div>
            )}
          </div>
        </motion.div>

      </motion.section>

      {/* 4. Logo strip */}
      <section className="bg-sidebar border-y border-border-subtle py-4 select-none">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[11px] uppercase tracking-widest text-text-muted font-medium">
            Replaces tools like:
          </span>
          <div className="flex flex-wrap items-center gap-6 md:gap-12 text-sm text-text-secondary font-medium font-mono">
            <span className="opacity-40">ClickUp</span>
            <span className="opacity-40">Notion</span>
            <span className="opacity-40">HubSpot</span>
            <span className="opacity-40">Slack</span>
            <span className="opacity-40">Excel Spreadsheet</span>
          </div>
        </div>
      </section>

      {/* 5. Problem & Solution Section */}
      <section id="pain" className="py-28 px-6 max-w-5xl mx-auto space-y-16 select-none relative">
        <div className="text-center space-y-3 relative z-10">
          <span className="text-[11px] label-caps text-blue block">Chaos vs Clarity</span>
          <h2 className="text-[28px] md:text-[36px] font-semibold tracking-tight text-primary">
            You're not bad at running your business.<br />
            Your systems are.
          </h2>
          <p className="text-xs md:text-sm text-text-secondary max-w-lg mx-auto">
            Traditional tool setups keep your team fragmented and your clients confused. Swiya consolidates operations into a single, clean workspace.
          </p>
        </div>

        <div className="space-y-6 relative z-10">
          {[
            {
              id: "fragmentation",
              title: "Scattered Tabs & Fragmented Client Data",
              problem: "Constantly copy-pasting client info across Slack threads, Google Drive, Notion project docs, and Excel trackers. Details get lost in transit.",
              solution: "Swiya consolidates client notes, secure portal links, billing status, and task lists into one centralized database. Zero duplicate work."
            },
            {
              id: "pricing",
              title: "Unfair Seat-Based Subscription Traps",
              problem: "Legacy platforms charge you per guest, user, and subcontractor. Inviting clients to check progress triggers massive billing surprises.",
              solution: "A single flat $19/mo workspace rate. Connect unlimited collaborators, team members, and clients without per-seat markup."
            },
            {
              id: "client-exp",
              title: "Messy, Clunky Client Collaboration",
              problem: "Chasing clients on email threads for assets, sending Stripe invoice links separately, and manually sharing spreadsheets looks amateur.",
              solution: "Give clients a private, passwordless Client Portal link. They can inspect live roadmaps, pay invoices via Stripe, and download assets."
            },
            {
              id: "admin-time",
              title: "Proposal Writing & Invoice Chasing",
              problem: "Spending hours writing design briefs, compiling task checklists, and manually emailing clients to remind them to settle invoices.",
              solution: "Press sparkles to auto-generate checklists and proposals via inline AI. Swiya automatically sends gentle chasers on overdue payments."
            }
          ].map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="glass-panel glass-panel-hover p-6 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center transition-all duration-300"
            >
              {/* Problem Panel */}
              <div className="space-y-3 border-b md:border-b-0 md:border-r border-border-subtle pb-6 md:pb-0 md:pr-8">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-danger/10 border border-danger/25 text-danger flex items-center justify-center text-[10px] font-bold shrink-0">
                    ✕
                  </div>
                  <h4 className="text-xs uppercase tracking-wider text-text-muted font-bold">The Legacy Pain</h4>
                </div>
                <h3 className="text-sm font-semibold text-primary">{item.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{item.problem}</p>
              </div>

              {/* Solution Panel */}
              <div className="space-y-3 md:pl-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-dim border border-green-border text-green flex items-center justify-center text-[10px] font-bold shrink-0">
                    ✓
                  </div>
                  <h4 className="text-xs uppercase tracking-wider text-green font-bold">The Swiya Solution</h4>
                </div>
                <h3 className="text-sm font-semibold text-green">Clarity & Control</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{item.solution}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Before vs After Slider Section */}
      <section className="py-24 px-6 max-w-5xl mx-auto space-y-12 select-none border-t border-border-subtle">
        <div className="text-center space-y-3">
          <span className="text-[11px] label-caps text-blue block">Visual Comparison</span>
          <h2 className="text-[28px] md:text-[34px] font-medium tracking-tight text-primary">
            Say goodbye to tool chaos
          </h2>
          <p className="text-xs md:text-sm text-text-secondary max-w-md mx-auto">
            Drag the slider below to see how Swiya replaces your scattered browser tabs with one unified command center.
          </p>
        </div>

        <div className="relative w-full max-w-4xl mx-auto aspect-[16/9] md:aspect-[21/9] rounded-2xl border border-border-default overflow-hidden bg-[#0A0C10] shadow-2xl shadow-blue-dim/10 hover:border-blue/30 transition-colors duration-300">
          {/* Before Side (Chaos) */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#160b0e] to-[#0A0C10] flex flex-col justify-center p-8 pr-16 md:p-16 select-none">
            <div className="max-w-md space-y-4">
              <span className="bg-danger/10 border border-danger/30 text-danger text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full w-fit block">
                Before Swiya: Chaos & Friction
              </span>
              <h3 className="text-xl md:text-2xl font-medium text-danger">Lost in browser tab hell</h3>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                Constantly switching between Slack messages, ClickUp task boards, HubSpot client tracking cards, Excel billing templates, and Stripe dashboard tabs. Your team stays out of sync and tasks slide past due.
              </p>
              <div className="grid grid-cols-2 gap-3 text-[11px] font-mono text-[#F87171] opacity-75">
                <div className="flex items-center gap-1.5">✕ Scattered client files</div>
                <div className="flex items-center gap-1.5">✕ Slack communications noise</div>
                <div className="flex items-center gap-1.5">✕ Manual invoice calculations</div>
                <div className="flex items-center gap-1.5">✕ Clunky client portal sharing</div>
              </div>
            </div>
          </div>

          {/* After Side (Unified Swiya) - Clipped container */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-[#070b13] to-[#0D1017] flex flex-col justify-center p-8 pl-16 md:p-16 select-none overflow-hidden"
            style={{ clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)` }}
          >
            <div className="max-w-md ml-auto space-y-4 text-right flex flex-col items-end">
              <span className="bg-green-dim border border-green-border text-green text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full w-fit block">
                After Swiya: Unified Clarity
              </span>
              <h3 className="text-xl md:text-2xl font-medium text-green">One clean operations hub</h3>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                Everything lives in a single end-to-end encrypted dashboard. Sync client contact profiles, set up gantt project roadmaps, invoice automatically with built-in Stripe integrations, and invite clients to secure token-based portals.
              </p>
              <div className="grid grid-cols-2 gap-3 text-[11px] font-mono text-[#4ADE80] opacity-85 text-left">
                <div className="flex items-center gap-1.5">✓ $19/mo flat workspace price</div>
                <div className="flex items-center gap-1.5">✓ Integrated secure Client Portals</div>
                <div className="flex items-center gap-1.5">✓ Inline GPT-4 check-lists helper</div>
                <div className="flex items-center gap-1.5">✓ Automated unpaid invoice pings</div>
              </div>
            </div>
          </div>

          {/* Slider Line Divider */}
          <div 
            className="absolute top-0 bottom-0 w-[1.5px] bg-blue/80 pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Slider Handle button */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-blue border-2 border-[#0A0C10] shadow-[0_4px_12px_rgba(0,0,0,0.5)] flex items-center justify-center pointer-events-none">
              <span className="text-[12px] text-white font-bold select-none">↔</span>
            </div>
          </div>

          {/* Invisible Range Input for Drag Control */}
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
          />
        </div>
      </section>

      {/* 6. Features Section */}
      <section id="features" className="py-24 bg-sidebar border-y border-border-subtle px-6">
        <div className="max-w-6xl mx-auto space-y-28">
          
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-[11px] label-caps text-blue block">Inside Swiya</span>
            <h2 className="text-[28px] md:text-[34px] font-medium tracking-tight text-primary">
              Run operations from project start to payments
            </h2>
          </div>

          {/* Feature Block 1: Projects */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row items-center gap-12"
          >
            <div className="flex-1 space-y-4">
              <div className="w-8 h-8 rounded-lg bg-blue-dim flex items-center justify-center">
                <FolderOpen className="w-4 h-4 text-blue" />
              </div>
              <h3 className="text-xl font-medium text-primary">See every project at a glance</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Swiya provides a drag-and-drop Kanban view, gantt timelines, and clear project detail layouts. Assign priorities, manage dates, and track exact budgets without complex overhead.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Kanban board", "Timeline", "Drag & drop", "Milestones"].map((t) => (
                  <Badge key={t} variant="in_progress" className="text-[10px]">{t}</Badge>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full bg-card border border-border-default rounded-xl p-5 shadow-lg select-none">
              {/* Mini project mockup card */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-primary">Project Roadmap</span>
                  <span className="text-[10px] text-text-muted">Due June 15</span>
                </div>
                <div className="w-full bg-app h-2 rounded-full overflow-hidden">
                  <div className="bg-blue h-full w-[60%]" />
                </div>
                <div className="text-[11px] text-text-secondary flex justify-between">
                  <span>60% complete</span>
                  <span>$8,000 budget</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature Block 2: CRM */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row-reverse items-center gap-12"
          >
            <div className="flex-1 space-y-4">
              <div className="w-8 h-8 rounded-lg bg-blue-dim flex items-center justify-center">
                <Users className="w-4 h-4 text-blue" />
              </div>
              <h3 className="text-xl font-medium text-primary">Never lose track of a client again</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                A streamlined client directory CRM. View company structures, copy secure client portal URLs, and run AI assistance to summarize client logs and drafts automatically.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Client profiles", "AI follow-ups", "Notes", "History"].map((t) => (
                  <Badge key={t} variant="in_progress" className="text-[10px]">{t}</Badge>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full bg-card border border-border-default rounded-xl p-5 shadow-lg select-none">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue flex items-center justify-center text-xs font-bold text-white">
                  SJ
                </div>
                <div>
                  <h4 className="text-xs font-medium text-primary">Sarah Jenkins</h4>
                  <p className="text-[10px] text-text-muted">Lumina Design • sarah@lumina.design</p>
                </div>
                <Badge variant="active" className="ml-auto scale-90">Active</Badge>
              </div>
            </div>
          </motion.div>

          {/* Feature Block 3: Invoices */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row items-center gap-12"
          >
            <div className="flex-1 space-y-4">
              <div className="w-8 h-8 rounded-lg bg-green-dim flex items-center justify-center">
                <Receipt className="w-4 h-4 text-green" />
              </div>
              <h3 className="text-xl font-medium text-primary">Get paid faster, automatically</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Connect Stripe to receive credit card and bank transfer payments immediately in client portals. Generate invoices in minutes, specify taxes, and toggle automatic recurring options.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Auto-reminders", "Stripe integration", "Recurring billing", "PDF invoices"].map((t) => (
                  <Badge key={t} variant="active" className="text-[10px]">{t}</Badge>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full bg-card border border-border-default rounded-xl p-5 shadow-lg select-none space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-border-subtle pb-2">
                <span className="font-mono text-text-muted">Invoice #1002</span>
                <span className="text-primary font-medium">$4,800.00 USD</span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-text-muted">Lumina Mobile redesign sprint</span>
                <Badge variant="in_progress">Sent</Badge>
              </div>
            </div>
          </motion.div>

          {/* Feature Block 4: AI Assistant */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row-reverse items-center gap-12"
          >
            <div className="flex-1 space-y-4">
              <div className="w-8 h-8 rounded-lg bg-blue-dim flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-blue" />
              </div>
              <h3 className="text-xl font-medium text-primary">Your smartest team member costs $19/mo</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                AI is built into every input field. Press the sparkles icon to expand project scopes, rewrite email drafts, generate subtask breakdown arrays in checklists, and construct customized templates.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Proposals", "Project plans", "Email drafts", "Summaries"].map((t) => (
                  <Badge key={t} variant="in_progress" className="text-[10px]">{t}</Badge>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full bg-card border border-border-default rounded-xl p-5 shadow-lg space-y-2.5">
              <div className="text-[11px] text-text-muted flex justify-between">
                <span>Swiya AI helper</span>
                <span className="font-mono">GPT-4 Enabled</span>
              </div>
              <p className="text-xs text-primary leading-relaxed bg-app border border-border-subtle p-3 rounded-lg italic">
                &ldquo;Here is your generated subtask list: 1. Setup repository structure, 2. Design wireframe flows, 3. Connect DB schema tables...&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Feature Block 5: Client Portal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row items-center gap-12"
          >
            <div className="flex-1 space-y-4">
              <div className="w-8 h-8 rounded-lg bg-green-dim flex items-center justify-center">
                <Globe className="w-4 h-4 text-green" />
              </div>
              <h3 className="text-xl font-medium text-primary">Impress clients without lifting a finger</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Provide secure, passwordless client portals. Clients can check project progress, download files, chat with you in real-time, and pay open invoices in one browser portal.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Progress tracking", "Approvals", "File sharing", "Payments"].map((t) => (
                  <Badge key={t} variant="active" className="text-[10px]">{t}</Badge>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full bg-card border border-border-default rounded-xl p-5 shadow-lg space-y-2.5 select-none">
              <div className="text-xs font-semibold text-white">Vertex Client Hub</div>
              <div className="w-full bg-app border border-border-subtle p-3 rounded-lg text-[11px] flex justify-between items-center">
                <span>Vertex Web Engineering Portal</span>
                <span className="text-green font-medium">Secure Link</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="py-24 px-6 max-w-6xl mx-auto space-y-12 select-none">
        <div className="text-center space-y-2">
          <span className="text-[11px] label-caps text-green block">Success stories</span>
          <h2 className="text-[28px] md:text-[34px] font-medium tracking-tight text-primary">
            Loved by independent professionals
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "Swiya replaced three separate monthly tool subscriptions for me. The integrated client portal is simple, elegant, and my clients love paying directly inside the browser.",
              name: "Marcus Aurelius",
              role: "Freelance Full-Stack Developer",
              border: "border-l-2 border-l-blue",
              plan: "Pro Plan Member"
            },
            {
              quote: "The AI subtasks generator alone saves me hours when onboarding new design client projects. Outstanding flat design and zero clutter make it my daily command center.",
              name: "Clara Oswald",
              role: "Brand Identity Designer",
              border: "border-l-2 border-l-green",
              plan: "Pro Plan Member"
            },
            {
              quote: "Invoices get paid 4 days faster now since I started sending Swiya portals. Having client communication, file assets, and payment triggers in one portal is a total gamechanger.",
              name: "Devon Keats",
              role: "Founder, Keats Marketing Agency",
              border: "border-l-2 border-l-blue",
              plan: "Agency Client"
            }
          ].map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="h-full"
            >
              <Card className={cn("bg-card border border-border-subtle p-6 space-y-4 h-full", t.border)}>
                <div className="flex gap-0.5 text-[#F59E0B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-text-secondary leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex justify-between items-end pt-2">
                  <div>
                    <h4 className="text-xs font-semibold text-primary leading-none">{t.name}</h4>
                    <span className="text-[10px] text-text-muted mt-1 block">{t.role}</span>
                  </div>
                  <Badge variant="in_progress" className="scale-90">{t.plan}</Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SaaS Savings Calculator Section */}
      <section className="py-24 px-6 max-w-5xl mx-auto space-y-12 select-none border-t border-border-subtle">
        <div className="text-center space-y-3">
          <span className="text-[11px] label-caps text-green block">Savings ROI Calculator</span>
          <h2 className="text-[28px] md:text-[34px] font-medium tracking-tight text-primary">
            Calculate your monthly SaaS savings
          </h2>
          <p className="text-xs md:text-sm text-text-secondary max-w-md mx-auto">
            Traditional tools charge you per user, per month. Swiya charges a simple flat workspace rate. Slide to compare.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-4xl mx-auto">
          {/* Inputs Panel (Left) */}
          <Card className="lg:col-span-7 bg-[#111520]/50 border border-border-subtle p-6 space-y-6 flex flex-col justify-between glass-panel glass-panel-hover transition-all duration-300">
            <div className="space-y-5">
              {/* Seats slider */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-primary">Team Size (Seats)</span>
                  <span className="text-xs font-bold text-blue bg-blue-dim border border-blue-border/40 px-2.5 py-0.5 rounded-full">
                    {seatsCount} {seatsCount === 1 ? 'user' : 'users'}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  value={seatsCount} 
                  onChange={(e) => setSeatsCount(Number(e.target.value))}
                  className="w-full h-1.5 bg-sidebar rounded-full appearance-none cursor-pointer accent-blue"
                />
                <div className="flex justify-between text-[10px] text-text-muted font-mono">
                  <span>1 Seat</span>
                  <span>15 Seats</span>
                  <span>30 Seats</span>
                </div>
              </div>

              {/* Tools selection */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-primary block">Select your current tool stack:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: "clickup", name: "ClickUp ($12/user/mo)" },
                    { id: "notion", name: "Notion ($10/user/mo)" },
                    { id: "slack", name: "Slack ($8/user/mo)" },
                    { id: "hubspot", name: "HubSpot ($50/user/mo)" },
                    { id: "quickbooks", name: "QuickBooks ($30/mo flat)" }
                  ].map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => setCalcTools({
                        ...calcTools,
                        [tool.id as keyof typeof calcTools]: !calcTools[tool.id as keyof typeof calcTools]
                      })}
                      className={cn(
                        "flex items-center gap-2.5 px-3 py-2 border rounded-xl text-left text-xs transition-all cursor-pointer font-medium select-none outline-none",
                        calcTools[tool.id as keyof typeof calcTools]
                          ? "bg-blue-dim border-blue text-white"
                          : "bg-sidebar border-border-subtle text-text-secondary hover:border-border-default"
                      )}
                    >
                      <div className={cn(
                        "w-4 h-4 rounded flex items-center justify-center border transition-all",
                        calcTools[tool.id as keyof typeof calcTools]
                          ? "bg-blue border-blue text-white"
                          : "border-border-default bg-transparent"
                      )}>
                        {calcTools[tool.id as keyof typeof calcTools] && (
                          <span className="text-[10px] font-bold">✓</span>
                        )}
                      </div>
                      <span>{tool.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-[10px] text-text-secondary leading-relaxed bg-sidebar/50 border border-border-subtle p-3 rounded-lg mt-2">
              💡 *Calculations are based on industry standards for business/pro tiers. Swiya replaces all these systems for a single flat fee.*
            </div>
          </Card>

          {/* Results Panel (Right) */}
          <Card className="lg:col-span-5 bg-gradient-to-b from-[#181d2a] to-[#111520] border-2 border-blue/60 p-6 flex flex-col justify-between text-center relative overflow-hidden shadow-[0_0_30px_rgba(24,119,242,0.12)]">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue via-green to-blue" />
            
            <div className="space-y-4 pt-2">
              <span className="text-[10px] label-caps text-green tracking-widest block font-bold">
                ESTIMATED ROI SAVINGS
              </span>
              
              <div className="space-y-1">
                <span className="text-4xl md:text-5xl font-bold text-green tracking-tight">
                  ${((Math.max(0, ((calcTools.clickup ? seatsCount * 12 : 0) + (calcTools.notion ? seatsCount * 10 : 0) + (calcTools.slack ? seatsCount * 8 : 0) + (calcTools.hubspot ? seatsCount * 50 : 0) + (calcTools.quickbooks ? 30 : 0)) - proPrice)) * 12).toLocaleString()}
                </span>
                <span className="text-xs text-text-secondary block font-medium">saved per year</span>
              </div>

              <div className="h-[0.5px] bg-border-subtle w-full my-4" />

              <div className="space-y-2.5 text-xs text-left">
                <div className="flex justify-between items-center text-text-secondary">
                  <span>Current stack cost:</span>
                  <span className="font-semibold text-primary font-mono">${(calcTools.clickup ? seatsCount * 12 : 0) + (calcTools.notion ? seatsCount * 10 : 0) + (calcTools.slack ? seatsCount * 8 : 0) + (calcTools.hubspot ? seatsCount * 50 : 0) + (calcTools.quickbooks ? 30 : 0)}/mo</span>
                </div>
                <div className="flex justify-between items-center text-text-secondary">
                  <span>Swiya workspace:</span>
                  <span className="font-semibold text-blue font-mono">${proPrice}/mo</span>
                </div>
                <div className="flex justify-between items-center text-green font-semibold pt-1 border-t border-border-subtle/50 mt-1">
                  <span>Monthly savings:</span>
                  <span className="font-bold font-mono">${Math.max(0, ((calcTools.clickup ? seatsCount * 12 : 0) + (calcTools.notion ? seatsCount * 10 : 0) + (calcTools.slack ? seatsCount * 8 : 0) + (calcTools.hubspot ? seatsCount * 50 : 0) + (calcTools.quickbooks ? 30 : 0)) - proPrice)}/mo</span>
                </div>
              </div>
            </div>

            <div className="space-y-3.5 pt-6">
              <Link href="/signup" className="w-full block">
                <Button variant="primary" className="w-full h-11 text-xs font-semibold rounded-full shadow-lg shadow-blue/20">
                  Claim your savings now →
                </Button>
              </Link>
              <span className="text-[10px] text-text-muted block">
                No credit card required · Cancel anytime
              </span>
            </div>
          </Card>
        </div>
      </section>

      {/* 8. Pricing Section */}
      <section id="pricing" className="py-24 bg-sidebar border-y border-border-subtle px-6 select-none">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[11px] label-caps text-blue block">Simple Pricing</span>
            <h2 className="text-[28px] md:text-[34px] font-medium tracking-tight text-primary">
              Simple pricing. No per-seat surprises.
            </h2>
            <p className="text-[13px] text-text-secondary max-w-md mx-auto">
              Most agencies pay $120+/month across 6 different tools. Connect your team without billing shocks.
            </p>

            {/* Toggle Monthly / Yearly */}
            <div className="flex items-center justify-center gap-3 pt-4">
              <span className={cn("text-xs font-medium", billingCycle === "monthly" ? "text-primary" : "text-text-muted")}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                className="w-10 h-6 bg-elevated rounded-full p-0.5 flex items-center relative transition-colors outline-none border border-border-subtle cursor-pointer"
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded-full bg-blue transition-transform duration-200",
                    billingCycle === "yearly" ? "translate-x-4" : "translate-x-0"
                  )}
                />
              </button>
              <span className={cn("text-xs font-medium flex items-center gap-1.5", billingCycle === "yearly" ? "text-primary" : "text-text-muted")}>
                Yearly <span className="text-[9px] bg-green-dim text-green px-1.5 py-0.5 rounded-full font-bold">Save 2 Months</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            
            {/* Free Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="h-full"
            >
              <Card className="bg-card border border-border-subtle p-8 flex flex-col justify-between space-y-8 h-full">
                <div className="space-y-4">
                  <span className="text-xs label-caps text-text-muted">Free Tier</span>
                  <div className="space-y-1">
                    <h3 className="text-3xl font-medium text-primary">$0</h3>
                    <p className="text-[11px] text-text-muted">Forever free client tracker</p>
                  </div>
                  <div className="h-[0.5px] bg-border-subtle" />
                  <ul className="space-y-2.5 text-xs text-text-secondary">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-green shrink-0" />
                      <span>Up to 2 Clients</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-green shrink-0" />
                      <span>Up to 3 Active Projects</span>
                    </li>
                    <li className="flex items-center gap-2 opacity-40">
                      <X className="w-3.5 h-3.5 text-danger shrink-0" />
                      <span>No AI Inline assistant</span>
                    </li>
                    <li className="flex items-center gap-2 opacity-40">
                      <X className="w-3.5 h-3.5 text-danger shrink-0" />
                      <span>No secure client portal page</span>
                    </li>
                  </ul>
                </div>
                <Link href="/signup" className="w-full block">
                  <Button variant="ghost" className="w-full h-10 text-xs">
                    Start for free
                  </Button>
                </Link>
              </Card>
            </motion.div>

            {/* Pro Card (Featured) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
              whileHover={{ y: -6 }}
              className="h-full relative"
            >
              <Card className="bg-card border-2 border-blue p-8 flex flex-col justify-between space-y-8 relative h-full">
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-blue text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Most popular
                </div>
                <div className="space-y-4">
                  <span className="text-xs label-caps text-blue">Pro Plan</span>
                  <div className="space-y-1">
                    <h3 className="text-3xl font-medium text-primary">
                      ${proPrice}
                      <span className="text-xs text-text-muted font-normal">/month</span>
                    </h3>
                    <p className="text-[11px] text-blue font-medium">Less than one billable hour</p>
                  </div>
                  <div className="h-[0.5px] bg-border-subtle" />
                  <ul className="space-y-2.5 text-xs text-text-secondary">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-green shrink-0" />
                      <span>Unlimited Active Clients</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-green shrink-0" />
                      <span>Unlimited Active Projects</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-green shrink-0" />
                      <span>GPT-4 AI Assistant built-in</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-green shrink-0" />
                      <span>Secure Client Portal Pages</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-green shrink-0" />
                      <span>Stripe Payment Processing</span>
                    </li>
                  </ul>
                </div>
                <Link href="/signup" className="w-full block">
                  <Button variant="primary" className="w-full h-10 text-xs">
                    Start free trial
                  </Button>
                </Link>
              </Card>
            </motion.div>

          </div>

          <div className="text-center text-xs text-text-muted pt-2 select-none">
            14-day trial · No credit card required · Cancel anytime
          </div>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section id="faq" className="py-24 px-6 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-2 select-none">
          <span className="text-[11px] label-caps text-green block">Questions</span>
          <h2 className="text-[28px] md:text-[34px] font-medium tracking-tight text-primary">
            Frequently Asked Questions
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <Accordion.Root type="single" collapsible className="w-full space-y-3">
            {[
              {
                q: "How does the client portal work? Do clients need accounts?",
                a: "No. Clients access their portal via a secure, passwordless magic link token (e.g. /portal/{token}). They don't need to configure accounts or memorize passwords. They can see status updates, upload files, text you, and pay invoices instantly."
              },
              {
                q: "Can I use my own domain for client portals?",
                a: "Yes. Pro users can easily connect their custom subdomains (e.g. portal.yourdomain.com) directly from the settings page, fully SSL-encrypted out of the box."
              },
              {
                q: "Is there a limit to how many clients I can invite?",
                a: "On the Free plan, you can add up to 2 clients. The Pro plan allows unlimited active clients, portals, projects, and invoices with no per-seat billing."
              },
              {
                q: "How are credit card payments processed?",
                a: "Swiya integrates with Stripe. When clients pay invoices in their portals, funds are directly processed via Stripe Elements and wired into your connected bank account. Swiya takes 0% commission fees."
              },
              {
                q: "What does the AI assistant do exactly?",
                a: "AI handles subtask array checklists creation, improves project description layouts, drafts client onboarding message templates, and can converse with you to outline project plans."
              },
              {
                q: "Can I download invoices and proposals as PDFs?",
                a: "Yes. All invoices and proposals have direct client-facing print layouts. You or your clients can download clean formatted PDF files with a single click."
              }
            ].map((item, idx) => (
              <Accordion.Item
                key={idx}
                value={`item-${idx}`}
                className="bg-sidebar border border-border-subtle rounded-xl overflow-hidden"
              >
                <Accordion.Trigger className="w-full flex items-center justify-between px-5 py-4 text-xs md:text-sm font-medium text-primary hover:bg-elevated transition-all text-left outline-none border-none cursor-pointer">
                  <span>{item.q}</span>
                  <ChevronDown className="w-4 h-4 text-text-muted transition-transform duration-200 ease-out" />
                </Accordion.Trigger>
                <Accordion.Content className="px-5 pb-4 pt-1 text-xs text-text-secondary leading-relaxed border-t border-border-subtle bg-card">
                  {item.a}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>
      </section>

      {/* 10. Final CTA */}
      <section className="py-24 px-6 text-center select-none bg-blue-dim border-t border-blue-border">
        <div className="max-w-xl mx-auto space-y-6">
          <h2 className="text-[28px] md:text-[34px] font-medium tracking-tight text-primary">
            Every week without Swiya is a week of admin you didn&apos;t have to do.
          </h2>
          <Link href="/signup" className="inline-block">
            <Button variant="primary" className="h-11 px-8 text-sm font-semibold">
              Get Started for Free
            </Button>
          </Link>
          <div className="flex justify-center gap-4 text-[11px] text-text-secondary pt-2">
            <span>🔒 No credit card required</span>
            <span>⚡ 10 min setup</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="py-16 bg-sidebar border-t border-border-subtle px-6 md:px-12 select-none">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue rounded-md flex items-center justify-center">
                <span className="text-[10px] font-medium text-white">Sw</span>
              </div>
              <span className="text-xs font-semibold text-white">Swiya</span>
            </div>
            <p className="text-[11px] text-text-muted leading-relaxed">
              AI-powered operating system for freelancers & digital agencies.
            </p>
          </div>
          <div>
            <h4 className="text-[11px] label-caps text-text-secondary mb-4">Product</h4>
            <ul className="space-y-2 text-xs text-text-muted">
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><Link href="/login">Client Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] label-caps text-text-secondary mb-4">Company</h4>
            <ul className="space-y-2 text-xs text-text-muted">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Security compliance</a></li>
              <li><a href="#">Contact Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] label-caps text-text-secondary mb-4">Legal</h4>
            <ul className="space-y-2 text-xs text-text-muted">
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">GDPR Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto border-t border-border-subtle pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-text-muted gap-4">
          <span>© 2025 Swiya • mershal.in</span>
          <span>Powered by Swiya OS client systems</span>
        </div>
      </footer>

      {/* 12. Sticky Mobile CTA Bar */}
      {scrolledPast && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-15 bg-[#0A0C10]/95 backdrop-blur border-t border-border-subtle px-4 flex items-center z-45">
          <Link href="/signup" className="w-full">
            <Button variant="primary" className="w-full h-10 text-xs font-semibold">
              Start free trial →
            </Button>
          </Link>
        </div>
      )}

      {/* 13. Exit Intent Popup Modal */}
      <AnimatePresence>
        {showExitPopup && (
          <div className="fixed inset-0 z-55 flex items-center justify-center px-4 select-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowExitPopup(false);
                setExitPopupDismissed(true);
              }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-[440px] bg-card border border-border-default rounded-xl p-8 shadow-2xl space-y-5 text-center z-10"
            >
              <button
                onClick={() => {
                  setShowExitPopup(false);
                  setExitPopupDismissed(true);
                }}
                className="absolute top-4 right-4 text-text-muted hover:text-primary p-1 bg-transparent border-none outline-none cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 bg-blue-dim rounded-full flex items-center justify-center mx-auto text-blue text-xl font-bold">
                🎁
              </div>

              <div className="space-y-1.5">
                <h3 className="text-[18px] font-medium text-primary">Wait — get 1 month free</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Don&apos;t leave empty-handed! Claim your early-access invitation and get your first month of Swiya Pro completely free.
                </p>
              </div>

              <form onSubmit={handleExitEmailSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your work email"
                  value={exitEmail}
                  onChange={(e) => setExitEmail(e.target.value)}
                  className="h-10 text-center"
                  required
                />
                <Button type="submit" variant="primary" className="w-full h-10 text-xs">
                  Claim offer →
                </Button>
              </form>

              <span className="text-[10px] text-text-muted block select-none">
                No credit card required. Cancel anytime.
              </span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 14. Live Chat Widget */}
      <div className="fixed bottom-6 right-6 z-45 select-none hidden md:block">
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-13 h-13 rounded-full bg-blue hover:bg-blue-hover text-white shadow-xl flex items-center justify-center border-none outline-none cursor-pointer active:scale-95 transition-all"
        >
          {chatOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
        </button>

        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="absolute bottom-16 right-0 w-[340px] bg-card border border-border-default rounded-xl shadow-2xl p-5 space-y-4 text-left"
            >
              <div className="flex items-center gap-2 border-b border-border-subtle pb-3 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                <span className="text-xs font-semibold text-primary">Chat with Swiya Agent</span>
              </div>

              {chatSubmitted ? (
                <div className="text-center py-6 space-y-2">
                  <div className="text-green text-2xl font-bold">✓</div>
                  <h4 className="text-xs font-semibold text-primary">Inquiry Sent!</h4>
                  <p className="text-[11px] text-text-secondary leading-relaxed">
                    We have received your message. An agent will contact you at your email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleChatSubmit} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] label-caps text-text-secondary">Your Email</label>
                    <Input
                      type="email"
                      placeholder="alex@company.com"
                      value={chatEmail}
                      onChange={(e) => setChatEmail(e.target.value)}
                      className="h-8.5 text-xs"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] label-caps text-text-secondary">Message</label>
                    <textarea
                      placeholder="How can we help you run your business?"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="w-full min-h-[70px] max-h-[140px] bg-app border-[0.5px] border-border-subtle rounded-lg px-3 py-2 text-xs text-primary placeholder-text-muted outline-none focus:border-blue transition-all"
                      required
                    />
                  </div>
                  <Button type="submit" variant="primary" className="w-full h-8.5 text-xs">
                    Send message
                  </Button>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
