import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Compass, Github, Home, Linkedin, Mail, Radio, ShieldAlert } from "lucide-react";

const recoveryLinks = [
  { label: "Home", href: "/", icon: Home, note: "Return to base" },
  { label: "Projects", href: "/#projects", icon: Compass, note: "Browse deployments" },
  { label: "Email", href: "mailto:fahadfaz0708@gmail.com", icon: Mail, note: "Open direct link" },
];

const signalStats = [
  ["ROUTE", "UNMAPPED"],
  ["PACKETS", "0 RECEIVED"],
  ["FALLBACK", "ONLINE"],
  ["OWNER", "FAHAD A"],
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#030504] text-slate-100">
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(45, 212, 191, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(45, 212, 191, 0.08) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(16,185,129,0.14), transparent 34%), linear-gradient(225deg, rgba(245,158,11,0.12), transparent 38%), linear-gradient(315deg, rgba(236,72,153,0.1), transparent 42%)",
        }}
      />
      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-300 to-amber-300" />

      <section className="relative z-10 min-h-screen flex items-center px-5 py-12 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/profile.png"
                alt="Fahad A"
                className="h-12 w-12 rounded-lg border border-emerald-300/40 object-cover"
              />
              <div>
                <p className="font-mono text-xs text-emerald-300">RECOVERY OPERATOR</p>
                <p className="text-sm text-slate-300">fahadfaz0708@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-amber-300/40 bg-amber-300/10 px-3 py-2 font-mono text-xs text-amber-200">
              <Radio className="h-4 w-4" />
              SIGNAL FALLBACK READY
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
            <div className="relative overflow-hidden rounded-lg border border-emerald-300/25 bg-black/70 p-6 shadow-[0_0_45px_rgba(16,185,129,0.12)] sm:p-8">
              <div className="mb-8 flex flex-wrap items-center gap-3 font-mono text-xs">
                <span className="rounded-md border border-rose-400/40 bg-rose-400/10 px-2 py-1 text-rose-200">
                  ERROR 404
                </span>
                <span className="rounded-md border border-cyan-300/30 bg-cyan-300/10 px-2 py-1 text-cyan-200">
                  LOST REQUEST
                </span>
                <span className="rounded-md border border-emerald-300/30 bg-emerald-300/10 px-2 py-1 text-emerald-200">
                  RECOVERY MODE
                </span>
              </div>

              <p className="mb-4 font-mono text-sm text-cyan-200">./route --trace-failed</p>
              <h1 className="mb-6 text-7xl font-black leading-none text-emerald-300 sm:text-8xl md:text-9xl">
                404
              </h1>
              <h2 className="mb-4 max-w-2xl text-3xl font-bold text-white sm:text-4xl">
                This route drifted outside the mapped network.
              </h2>
              <p className="max-w-2xl text-base leading-7 text-slate-300">
                The request reached the void, but the portfolio is still online. Choose a recovery vector or head back to the previous signal.
              </p>

              <div className="mt-8 border-l border-cyan-300/40 bg-white/[0.03] p-4 font-mono text-sm text-slate-300">
                <div className="mb-2 text-emerald-300">REQUEST_PATH</div>
                <div className="break-all text-cyan-100">{location.pathname}</div>
              </div>
            </div>

            <aside className="rounded-lg border border-cyan-300/25 bg-black/65 p-5 shadow-[0_0_38px_rgba(34,211,238,0.1)] sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <ShieldAlert className="h-6 w-6 text-amber-300" />
                <div>
                  <h3 className="font-mono text-lg text-cyan-200">Recovery Console</h3>
                  <p className="text-sm text-slate-400">Pick a clean route.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {signalStats.map(([label, value]) => (
                  <div key={label} className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                    <div className="font-mono text-[11px] text-slate-500">{label}</div>
                    <div className="mt-1 font-mono text-sm text-emerald-200">{value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                {recoveryLinks.map(({ label, href, icon: Icon, note }) => {
                  const isMail = href.startsWith("mailto:");
                  const content = (
                    <>
                      <Icon className="h-4 w-4 text-emerald-300" />
                      <span className="flex-1">
                        <span className="block font-mono text-sm text-white">{label}</span>
                        <span className="block text-xs text-slate-400">{note}</span>
                      </span>
                    </>
                  );

                  return isMail ? (
                    <a
                      key={label}
                      href={href}
                      className="flex items-center gap-3 rounded-lg border border-emerald-300/25 bg-emerald-300/5 px-4 py-3 transition hover:border-emerald-300/70 hover:bg-emerald-300/10"
                    >
                      {content}
                    </a>
                  ) : (
                    <Link
                      key={label}
                      to={href}
                      className="flex items-center gap-3 rounded-lg border border-emerald-300/25 bg-emerald-300/5 px-4 py-3 transition hover:border-emerald-300/70 hover:bg-emerald-300/10"
                    >
                      {content}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="inline-flex items-center gap-2 rounded-lg border border-amber-300/40 bg-amber-300/10 px-4 py-2 font-mono text-sm text-amber-100 transition hover:bg-amber-300/20"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Go Back
                </button>
                <a
                  href="https://github.com/Bot-37"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-400/30 px-4 py-2 font-mono text-sm text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-100"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/bot37/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/30 px-4 py-2 font-mono text-sm text-cyan-100 transition hover:border-cyan-300/70"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
