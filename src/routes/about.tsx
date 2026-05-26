/**
 * About Page — Premium SaaS quality
 *
 * Sections:
 *  1. Hero — mission statement with ambient glows
 *  2. Origin story — the "why we built this"
 *  3. Values — 3 core pillars
 *  4. Team — Archit Karmakar (Founder) + Suman Ghosh (Co-Founder & Marketing)
 *  5. Stats strip
 *  6. CTA banner
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import {
  Sparkles,
  Flame,
  Shield,
  Zap,
  ArrowRight,
  Globe,
  Twitter,
  Linkedin,
  Github,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Mershal" },
      {
        name: "description",
        content:
          "Meet the team behind Mershal — the AI-powered OS for freelancers & agencies. Built by Archit Karmakar and Suman Ghosh to eliminate tool fatigue forever.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "About — Mershal" },
      {
        property: "og:description",
        content: "Meet the people building Mershal.",
      },
    ],
  }),
  component: AboutPage,
});

/* ─── Animation helpers ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ─── Data ─── */
const VALUES = [
  {
    Icon: Zap,
    color: "#5E6AD2",
    glow: "rgba(94,106,210,0.2)",
    title: "Speed is a feature",
    body: "Every millisecond of latency is a tax on your focus. Mershal loads instantly, syncs in real-time, and never makes you wait.",
  },
  {
    Icon: Shield,
    color: "#00C896",
    glow: "rgba(0,200,150,0.18)",
    title: "Privacy by design",
    body: "Your client data, invoices, and business numbers are encrypted end-to-end. We will never sell your data or show you ads.",
  },
  {
    Icon: Sparkles,
    color: "#EC4899",
    glow: "rgba(236,72,153,0.18)",
    title: "AI that actually helps",
    body: "Not gimmicks — Mershal AI drafts proposals, writes follow-up emails, and surfaces overdue tasks so you act, not dig.",
  },
];

const STATS = [
  { value: "10+", label: "Tools replaced" },
  { value: "15 days", label: "Free trial, no card" },
  { value: "< 10 min", label: "Setup time" },
  { value: "∞", label: "Client portals" },
];

const TEAM = [
  {
    name: "Archit Karmakar",
    role: "Founder & CEO",
    bio: "Archit spent years building products at the intersection of design and engineering. Frustrated by the chaos of managing freelance clients across dozens of disconnected tools, he set out to build the operating system he always wished existed — one that makes running an independent business feel as polished as working at a tech company.",
    avatar: "AK",
    gradientFrom: "#5E6AD2",
    gradientTo: "#808CF8",
    glow: "rgba(94,106,210,0.4)",
    socials: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com/GitarchitK",
    },
    tags: ["Product", "Engineering", "Vision"],
  },
  {
    name: "Suman Ghosh",
    role: "Co-Founder & Marketing Executive",
    bio: "Suman is the force behind Mershal's brand voice and growth engine. With a deep background in performance marketing and community-led growth, she understands what makes freelancers and agency owners tick — and how to reach them with stories that actually resonate.",
    avatar: "SG",
    gradientFrom: "#EC4899",
    gradientTo: "#F472B6",
    glow: "rgba(236,72,153,0.4)",
    socials: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
    tags: ["Marketing", "Brand", "Growth"],
  },
];

/* ─── Page ─── */
function AboutPage() {
  return (
    <div
      className="min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#0D0E12", color: "#F0F0F5" }}
    >
      <Navbar />

      {/* ════════════════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════════════════ */}
      <section className="relative flex flex-col items-center text-center px-6 pt-28 pb-24 overflow-hidden">
        {/* Ambient glows */}
        <div
          className="absolute rounded-full blur-[160px] pointer-events-none"
          style={{
            width: 500,
            height: 500,
            background: "#5E6AD2",
            opacity: 0.12,
            top: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        <div
          className="absolute rounded-full blur-[120px] pointer-events-none"
          style={{
            width: 300,
            height: 300,
            background: "#EC4899",
            opacity: 0.07,
            top: "30%",
            right: "10%",
          }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <motion.div {...fadeUp(0)} className="relative z-10">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[12px] font-semibold tracking-wider uppercase mb-8"
            style={{
              borderColor: "rgba(94,106,210,0.3)",
              background: "rgba(94,106,210,0.08)",
              color: "#808CF8",
            }}
          >
            <Flame className="w-3.5 h-3.5" />
            Our Story
          </span>

          <h1
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6 max-w-4xl mx-auto"
            style={{
              background:
                "linear-gradient(135deg, #F0F0F5 0%, #8B8FA8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Built by freelancers,{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #5E6AD2 0%, #EC4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              for freelancers.
            </span>
          </h1>

          <p
            className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: "#8B8FA8" }}
          >
            Mershal was born from a single frustration — too many tools, too
            little time. We replaced the chaos of 10+ subscriptions with one
            unified operating system that makes running your business feel
            effortless.
          </p>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════
          2. STATS STRIP
      ════════════════════════════════════════════════════ */}
      <section
        className="relative border-y"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(({ value, label }, i) => (
            <motion.div
              key={label}
              {...fadeUp(i * 0.08)}
              className="flex flex-col items-center text-center gap-1"
            >
              <span
                className="text-3xl md:text-4xl font-extrabold tracking-tight"
                style={{
                  background:
                    "linear-gradient(135deg, #5E6AD2, #808CF8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {value}
              </span>
              <span className="text-[12px] font-semibold tracking-wide uppercase" style={{ color: "#5C5F73" }}>
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          3. ORIGIN STORY
      ════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp(0)}>
            <span
              className="text-[11px] font-bold tracking-widest uppercase mb-4 block"
              style={{ color: "#5E6AD2" }}
            >
              Why we built this
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 leading-tight">
              The frustration of{" "}
              <span style={{ color: "#5E6AD2" }}>6 tools</span> to manage 1
              client
            </h2>
            <p className="leading-relaxed mb-4" style={{ color: "#8B8FA8" }}>
              Proposals in Notion. Invoices in Wave. Tasks in ClickUp. Client
              comms in Slack. Contracts in DocuSign. Time tracking in
              Toggl. Sound familiar?
            </p>
            <p className="leading-relaxed" style={{ color: "#8B8FA8" }}>
              We got tired of the context-switching tax. So we built Mershal
              — a single command centre that handles proposals, projects,
              clients, invoices, AI drafting, and client portals under one
              beautifully crafted roof.
            </p>
          </motion.div>

          {/* Visual quote card */}
          <motion.div {...fadeUp(0.15)}>
            <div
              className="relative rounded-2xl p-8 overflow-hidden"
              style={{
                background: "#111318",
                border: "1px solid rgba(94,106,210,0.2)",
                boxShadow: "0 0 60px rgba(94,106,210,0.08)",
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                style={{
                  background:
                    "linear-gradient(90deg, #5E6AD2, #EC4899)",
                }}
              />
              <div
                className="text-6xl font-serif leading-none mb-4 select-none"
                style={{ color: "#5E6AD2" }}
              >
                "
              </div>
              <p
                className="text-[17px] font-medium leading-relaxed mb-6"
                style={{ color: "#D0D2E0" }}
              >
                The best tool is the one that gets out of your way. Mershal is
                designed to be invisible — powerful when you need it, silent
                when you don't.
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="h-9 w-9 rounded-full flex items-center justify-center text-white text-[13px] font-bold shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #5E6AD2, #808CF8)",
                    boxShadow: "0 0 16px rgba(94,106,210,0.5)",
                  }}
                >
                  AK
                </div>
                <div>
                  <p className="text-[13px] font-semibold" style={{ color: "#F0F0F5" }}>
                    Archit Karmakar
                  </p>
                  <p className="text-[11px]" style={{ color: "#5C5F73" }}>
                    Founder, Mershal
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          4. VALUES
      ════════════════════════════════════════════════════ */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...fadeUp(0)} className="text-center mb-14">
            <span
              className="text-[11px] font-bold tracking-widest uppercase mb-3 block"
              style={{ color: "#5E6AD2" }}
            >
              What we believe
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Our core values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {VALUES.map(({ Icon, color, glow, title, body }, i) => (
              <motion.div
                key={title}
                {...fadeUp(i * 0.1)}
                className="group relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "#111318",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                whileHover={{
                  boxShadow: `0 0 40px ${glow}`,
                  borderColor: `${color}30`,
                }}
              >
                <div
                  className="h-11 w-11 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: `${color}14`,
                    border: `1px solid ${color}25`,
                    boxShadow: `0 0 16px ${glow}`,
                  }}
                >
                  <Icon size={20} style={{ color }} strokeWidth={1.7} />
                </div>
                <h3
                  className="text-[16px] font-bold mb-2"
                  style={{ color: "#F0F0F5" }}
                >
                  {title}
                </h3>
                <p
                  className="text-[13.5px] leading-relaxed"
                  style={{ color: "#8B8FA8" }}
                >
                  {body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          5. TEAM
      ════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span
            className="text-[11px] font-bold tracking-widest uppercase mb-3 block"
            style={{ color: "#5E6AD2" }}
          >
            The people behind Mershal
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            Meet the founders
          </h2>
          <p className="text-[15px] max-w-xl mx-auto" style={{ color: "#8B8FA8" }}>
            A small, focused team obsessed with building the world's best
            workspace OS for independent professionals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {TEAM.map(
            (
              { name, role, bio, avatar, gradientFrom, gradientTo, glow, socials, tags },
              i
            ) => (
              <motion.div
                key={name}
                {...fadeUp(i * 0.12)}
                className="relative rounded-2xl overflow-hidden group"
                style={{
                  background: "#111318",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                whileHover={{ boxShadow: `0 0 60px ${glow}`, borderColor: `${gradientFrom}25` }}
                transition={{ duration: 0.3 }}
              >
                {/* Top gradient bar */}
                <div
                  className="h-[3px] w-full"
                  style={{
                    background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})`,
                  }}
                />

                <div className="p-8">
                  {/* Avatar + name row */}
                  <div className="flex items-start gap-5 mb-6">
                    <div className="relative shrink-0">
                      {/* Glow ring */}
                      <div
                        className="absolute -inset-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `conic-gradient(${gradientFrom}, ${gradientTo}, ${gradientFrom})`,
                          filter: "blur(6px)",
                        }}
                      />
                      <div
                        className="relative h-[68px] w-[68px] rounded-full flex items-center justify-center text-white text-[20px] font-extrabold tracking-wide select-none"
                        style={{
                          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
                          boxShadow: `0 0 24px ${glow}`,
                        }}
                      >
                        {avatar}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-[20px] font-extrabold tracking-tight mb-1"
                        style={{ color: "#F0F0F5" }}
                      >
                        {name}
                      </h3>
                      <p
                        className="text-[13px] font-semibold"
                        style={{ color: gradientFrom }}
                      >
                        {role}
                      </p>

                      {/* Tag chips */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase"
                            style={{
                              background: `${gradientFrom}14`,
                              border: `1px solid ${gradientFrom}25`,
                              color: gradientFrom,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p
                    className="text-[13.5px] leading-[1.8] mb-6"
                    style={{ color: "#8B8FA8" }}
                  >
                    {bio}
                  </p>

                  {/* Divider */}
                  <div
                    className="h-px mb-5"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  />

                  {/* Social links */}
                  <div className="flex items-center gap-3">
                    {socials.twitter && (
                      <a
                        href={socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/icon h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-200"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.07)",
                        }}
                        aria-label={`${name} on Twitter`}
                      >
                        <Twitter
                          size={14}
                          style={{ color: "#8B8FA8" }}
                          className="group-hover/icon:text-white transition-colors"
                        />
                      </a>
                    )}
                    {socials.linkedin && (
                      <a
                        href={socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/icon h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-200"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.07)",
                        }}
                        aria-label={`${name} on LinkedIn`}
                      >
                        <Linkedin
                          size={14}
                          style={{ color: "#8B8FA8" }}
                          className="group-hover/icon:text-white transition-colors"
                        />
                      </a>
                    )}
                    {socials.github && (
                      <a
                        href={socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/icon h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-200"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.07)",
                        }}
                        aria-label={`${name} on GitHub`}
                      >
                        <Github
                          size={14}
                          style={{ color: "#8B8FA8" }}
                          className="group-hover/icon:text-white transition-colors"
                        />
                      </a>
                    )}
                    <span
                      className="ml-auto text-[11px] font-semibold"
                      style={{ color: "#3A3D4A" }}
                    >
                      mershal.in
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          6. HIRING STRIP
      ════════════════════════════════════════════════════ */}
      <motion.section
        {...fadeUp(0)}
        className="max-w-5xl mx-auto px-6 pb-10"
      >
        <div
          className="rounded-2xl p-6 flex items-center gap-4"
          style={{
            background: "rgba(94,106,210,0.06)",
            border: "1px solid rgba(94,106,210,0.15)",
          }}
        >
          <div
            className="h-10 w-10 rounded-xl shrink-0 flex items-center justify-center"
            style={{
              background: "rgba(94,106,210,0.12)",
              border: "1px solid rgba(94,106,210,0.2)",
            }}
          >
            <Globe size={18} style={{ color: "#5E6AD2" }} />
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="text-[14px] font-semibold"
              style={{ color: "#F0F0F5" }}
            >
              We're a small team with big ambitions — and we're growing.
            </p>
            <p className="text-[12px]" style={{ color: "#5C5F73" }}>
              If you're obsessed with great products and clean code, we'd love
              to hear from you.
            </p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 inline-flex items-center gap-1.5 h-9 px-4 rounded-lg text-[13px] font-semibold transition-all"
            style={{
              background: "#5E6AD2",
              color: "#fff",
              boxShadow: "0 0 16px rgba(94,106,210,0.3)",
            }}
          >
            Say hi <ArrowRight size={14} />
          </Link>
        </div>
      </motion.section>

      {/* ════════════════════════════════════════════════════
          7. CTA BANNER
      ════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 py-10 pb-24">
        <motion.div
          {...fadeUp(0)}
          className="relative rounded-3xl overflow-hidden text-center p-12 md:p-16"
          style={{
            background:
              "linear-gradient(135deg, rgba(94,106,210,0.15) 0%, rgba(236,72,153,0.08) 100%)",
            border: "1px solid rgba(94,106,210,0.2)",
          }}
        >
          {/* Glow */}
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-[100px] pointer-events-none"
            style={{ background: "#5E6AD2", opacity: 0.15 }}
          />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Ready to run your business smarter?
            </h2>
            <p
              className="text-[15px] mb-8 max-w-lg mx-auto"
              style={{ color: "#8B8FA8" }}
            >
              Set up your workspace in under 10 minutes. No credit card
              required. No tool sprawl. Just clarity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-xl text-[15px] font-bold transition-all"
                style={{
                  background:
                    "linear-gradient(135deg, #5E6AD2, #808CF8)",
                  color: "#fff",
                  boxShadow: "0 0 30px rgba(94,106,210,0.4)",
                }}
              >
                Start free — 15 day trial <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-xl text-[15px] font-semibold border transition-all"
                style={{
                  borderColor: "rgba(255,255,255,0.1)",
                  color: "#8B8FA8",
                }}
              >
                Talk to us
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
