/**
 * DashboardLoader — Premium 4-icon flip loading screen
 *
 * Shown when navigating landing → dashboard or when the dashboard
 * is waiting for Firebase auth to resolve.
 *
 * Design:
 *  - Deep #0D0E12 background with a soft violet ambient glow
 *  - 4 icon cards flip in a staggered wave (Y-axis 3-D flip)
 *  - Progress bar fills beneath
 *  - Cycling status messages match the auth flow phases
 */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Receipt,
  Sparkles,
} from "lucide-react";

const ICONS = [
  {
    Icon: LayoutDashboard,
    label: "Dashboard",
    color: "#5E6AD2",
    glow: "rgba(94,106,210,0.35)",
    bg: "rgba(94,106,210,0.12)",
  },
  {
    Icon: Users,
    label: "Clients",
    color: "#00C896",
    glow: "rgba(0,200,150,0.35)",
    bg: "rgba(0,200,150,0.10)",
  },
  {
    Icon: Receipt,
    label: "Invoices",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.35)",
    bg: "rgba(245,158,11,0.10)",
  },
  {
    Icon: Sparkles,
    label: "AI",
    color: "#EC4899",
    glow: "rgba(236,72,153,0.35)",
    bg: "rgba(236,72,153,0.10)",
  },
];

const PHASES = [
  "Verifying your session…",
  "Loading your workspace…",
  "Syncing client data…",
  "Almost there…",
];

interface DashboardLoaderProps {
  /** Optional phase text override (e.g., passed from login flow) */
  phase?: string;
}

export function DashboardLoader({ phase }: DashboardLoaderProps) {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  /* ── Phase cycling ── */
  useEffect(() => {
    if (phase) return; // parent controls the message
    const iv = setInterval(() => {
      setPhaseIdx((p) => (p + 1) % PHASES.length);
    }, 1400);
    return () => clearInterval(iv);
  }, [phase]);

  /* ── Smooth progress bar ── */
  useEffect(() => {
    // Ramp quickly to 85%, then stall — completes when component unmounts
    const targets = [20, 45, 68, 85];
    let step = 0;
    const iv = setInterval(() => {
      if (step < targets.length) {
        setProgress(targets[step]);
        step++;
      } else {
        clearInterval(iv);
      }
    }, 900);
    return () => clearInterval(iv);
  }, []);

  const displayText = phase ?? PHASES[phaseIdx];

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#0D0E12" }}
    >
      {/* ── Ambient glows ── */}
      <div
        className="absolute rounded-full blur-[140px] opacity-20 pointer-events-none"
        style={{
          width: 380,
          height: 380,
          background: "#5E6AD2",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      <div
        className="absolute rounded-full blur-[100px] opacity-10 pointer-events-none"
        style={{
          width: 260,
          height: 260,
          background: "#00C896",
          bottom: "18%",
          right: "20%",
        }}
      />

      {/* ── Wordmark ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-14 flex items-center gap-2.5 select-none"
      >
        <div
          className="h-9 w-9 rounded-[10px] flex items-center justify-center shadow-lg"
          style={{
            background: "linear-gradient(135deg,#5E6AD2,#808CF8)",
            boxShadow: "0 0 20px rgba(94,106,210,0.45)",
          }}
        >
          <span className="text-[15px] font-bold text-white tracking-wider">
            Me
          </span>
        </div>
        <span className="text-[22px] font-semibold tracking-tight text-[#F0F0F5]">
          Mer<span className="text-[#5E6AD2]">shal</span>
        </span>
      </motion.div>

      {/* ── 4 Flipping Icon Cards ── */}
      <div className="flex items-center gap-4 mb-14">
        {ICONS.map(({ Icon, label, color, glow, bg }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            transition={{
              delay: i * 0.13,
              duration: 0.55,
              type: "spring",
              stiffness: 180,
              damping: 16,
            }}
            style={{ perspective: 800 }}
          >
            {/* Continuous gentle float + flip loop */}
            <motion.div
              animate={{
                y: [0, -6, 0],
                rotateY: [0, 180, 360],
              }}
              transition={{
                y: {
                  repeat: Infinity,
                  duration: 2.4,
                  ease: "easeInOut",
                  delay: i * 0.35,
                },
                rotateY: {
                  repeat: Infinity,
                  duration: 3.2,
                  ease: "easeInOut",
                  delay: i * 0.45 + 0.8,
                },
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="w-[62px] h-[62px] rounded-2xl flex flex-col items-center justify-center gap-1.5 relative overflow-hidden cursor-default"
                style={{
                  background: bg,
                  border: `1px solid ${color}30`,
                  boxShadow: `0 0 18px ${glow}, inset 0 1px 0 ${color}18`,
                }}
              >
                {/* Inner shimmer line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-60"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${color}80, transparent)`,
                  }}
                />
                <Icon
                  size={22}
                  style={{ color }}
                  strokeWidth={1.6}
                />
                <span
                  className="text-[9px] font-semibold tracking-wider uppercase"
                  style={{ color: `${color}CC` }}
                >
                  {label}
                </span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* ── Status text ── */}
      <div className="h-5 mb-6 relative">
        <AnimatePresence mode="wait">
          <motion.p
            key={displayText}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28 }}
            className="text-[12px] text-[#5C5F73] font-medium tracking-wide text-center absolute inset-x-0"
          >
            {displayText}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* ── Progress bar ── */}
      <div
        className="w-[220px] h-[3px] rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.05)" }}
      >
        <motion.div
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background:
              "linear-gradient(90deg, #5E6AD2, #808CF8, #00C896)",
            boxShadow: "0 0 10px rgba(94,106,210,0.5)",
          }}
        />
      </div>

      {/* ── Sub-label ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mt-4 text-[10px] text-[#5C5F73] tracking-widest uppercase font-semibold"
      >
        Powered by Mershal
      </motion.p>
    </div>
  );
}
