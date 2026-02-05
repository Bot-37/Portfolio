// NotFound.tsx
import React, { useEffect, useRef, useState } from "react";
import { Home, Rocket, User, ArrowLeft } from "lucide-react";

// The shape of a single log line
type LogLine = string;

// Interface for the command object, to be more specific if needed
interface Command {
  base: string;
  rest: string[];
}

const NotFound: React.FC = () => {
  // ===== UI States =====
  const [terminalText, setTerminalText] = useState<string>("");
  const [showCursor, setShowCursor] = useState<boolean>(true);
  const [glitchActive, setGlitchActive] = useState<boolean>(false);
  const [scanlinePosition, setScanlinePosition] = useState<number>(0);
  const [uptime, setUptime] = useState<string>(() =>
    new Date().toLocaleTimeString("en-GB", { hour12: false })
  );

  // ===== Terminal (SYSTEM_LOG.txt) States =====
  const [log, setLog] = useState<LogLine[]>(() => [
    `[${new Date().toLocaleTimeString("en-GB", { hour12: false })}] Initializing recovery protocol...`,
    `[${new Date().toLocaleTimeString("en-GB", { hour12: false })}] Navigation options loaded successfully`,
    `[${new Date().toLocaleTimeString("en-GB", { hour12: false })}] User interface ready`,
    `[${new Date().toLocaleTimeString("en-GB", { hour12: false })}] Type 'help' to list commands`,
  ]);
  const [input, setInput] = useState<string>("");
  const logEndRef = useRef<HTMLDivElement>(null);
  const terminalClickRef = useRef<HTMLInputElement>(null);
  const [inputFocused, setInputFocused] = useState<boolean>(false);

  const fullText: string = "ERROR: FILE_NOT_FOUND > INITIATING_RECOVERY_PROTOCOL...";

  // ===== Always start at the very top of the page =====
  useEffect(() => {
    window.history.replaceState({}, document.title, window.location.pathname);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  // ===== Console error for dev visibility =====
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route");
  }, []);

  // ===== Typewriter effect for headline line =====
  useEffect(() => {
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < fullText.length) {
        setTerminalText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);
    return () => clearInterval(typeInterval);
  }, []);

  // ===== Cursor blink =====
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // ===== Glitch pulse =====
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(glitchInterval);
  }, []);

  // ===== Scanline sweep =====
  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanlinePosition((prev) => (prev + 2) % 100);
    }, 50);
    return () => clearInterval(scanInterval);
  }, []);

  // ===== Uptime clock (24h) =====
  useEffect(() => {
    const t = setInterval(() => {
      setUptime(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  // ===== Auto-scroll SYSTEM_LOG to bottom on updates =====
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [log]);

  // ===== Terminal command handler =====
  const append = (line: string | number | null | undefined): void =>
    setLog((prev) => [
      ...prev,
      typeof line === "string" ? line : String(line ?? ""),
    ]);

  const stamp = (msg: string): string =>
    `[${new Date().toLocaleTimeString("en-GB", { hour12: false })}] ${msg}`;

  const handleCommand = (raw: string): void => {
    const cmd = raw.trim();
    if (!cmd) return;

    append(`guest@portfolio:~$ ${cmd}`);

    const [base, ...rest] = cmd.split(" ");
    const argStr = rest.join(" ");

    switch (base.toLowerCase()) {
      case "help":
        append(
          [
            "Available commands:",
            "  help              - show this help",
            "  home              - go to homepage",
            "  projects          - open projects",
            "  about             - open about",
            "  back              - browser back",
            "  clear             - clear terminal",
            "  echo <text>       - print text",
            "  time              - show current time",
            "  whoami            - identify user",
          ].join("\n")
        );
        break;

      case "home":
        append(stamp("Routing to HOME..."));
        window.location.href = "/";
        break;

      case "projects":
        append(stamp("Routing to PROJECTS..."));
        window.location.href = "/#projects";
        break;

      case "about":
        append(stamp("Routing to ABOUT..."));
        window.location.href = "/#about";
        break;

      case "back":
        append(stamp("Going back..."));
        window.history.back();
        break;

      case "clear":
        setLog([]);
        break;

      case "echo":
        append(argStr || "");
        break;

      case "time":
        append(stamp("System time query acknowledged."));
        append(new Date().toLocaleString("en-GB", { hour12: false }));
        break;

      case "whoami":
        append("guest (privileges: read-only)");
        break;

      default:
        append(`Unknown command: ${base} (type 'help')`);
    }
  };

  return (
    <div className="min-h-screen relative bg-black overflow-hidden">
      {/* Data stream + grid + vignette */}
      <div className="data-stream pointer-events-none"></div>
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute inset-0 pointer-events-none vignette"></div>

      {/* Scanning line */}
      <div
        className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-30 transition-all duration-75"
        style={{ top: `${scanlinePosition}%`, boxShadow: "0 0 20px #22c55e" }}
      />

      {/* Main container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* Terminal headline window */}
          <div className="terminal-window mb-8">
            <div className="terminal-header">
              <div className="terminal-buttons">
                <div className="terminal-button terminal-red"></div>
                <div className="terminal-button terminal-yellow"></div>
                <div className="terminal-button terminal-green"></div>
              </div>
              <div className="ml-4 text-green-500 text-sm">
                SYSTEM_DIAGNOSTICS.exe
              </div>
            </div>
            <div className="terminal-content">
              <div className="text-green-500 mb-2">
                <span className="terminal-prompt">root@portfolio:~$</span>
                <span className="text-white">{terminalText}</span>
                <span
                  className={`typing-cursor ${showCursor ? "" : "opacity-0"}`}
                >
                  █
                </span>
              </div>
            </div>
          </div>

          {/* 404 Hologram */}
          <div className="holographic-display mb-8 relative">
            <div className="text-center">
              <div className="relative mb-6">
                <h1
                  className={`text-8xl md:text-9xl font-bold text-green-500 glow-text ${
                    glitchActive ? "glitch" : ""
                  }`}
                  style={{
                    fontFamily: "'Courier New', monospace",
                    textShadow: glitchActive
                      ? "0 0 10px #22c55e, 2px 0 0 #ff0000, -2px 0 0 #00ffff"
                      : "0 0 20px #22c55e, 0 0 40px #22c55e",
                  }}
                >
                  404
                </h1>
                {glitchActive && (
                  <>
                    <h1
                      className="absolute inset-0 text-8xl md:text-9xl font-bold text-red-500 opacity-70"
                      style={{
                        fontFamily: "'Courier New', monospace",
                        transform: "translate(2px, 0)",
                        clipPath:
                          "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
                      }}
                    >
                      404
                    </h1>
                    <h1
                      className="absolute inset-0 text-8xl md:text-9xl font-bold text-blue-500 opacity-70"
                      style={{
                        fontFamily: "'Courier New', monospace",
                        transform: "translate(-2px, 0)",
                        clipPath:
                          "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
                      }}
                    >
                      404
                    </h1>
                  </>
                )}
              </div>

              {/* Status lines */}
              <div className="space-y-2 text-left font-mono text-sm md:text-base">
                <div className="text-red-400">
                  <span className="text-green-500">[ERROR]</span>{" "}
                  RESOURCE_NOT_FOUND
                </div>
                <div className="text-yellow-400">
                  <span className="text-green-500">[WARN]</span>{" "}
                  CONNECTION_TO_REQUESTED_PAGE_LOST
                </div>
                <div className="text-blue-400">
                  <span className="text-green-500">[INFO]</span>{" "}
                  ATTEMPTING_ALTERNATIVE_ROUTES...
                </div>
                <div className="text-green-400">
                  <span className="text-green-500">[SUCCESS]</span>{" "}
                  RECOVERY_OPTIONS_AVAILABLE
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Console */}
          <div className="war-table">
            <div className="war-table-content">
              <div className="text-center mb-6">
                <h2
                  className="text-2xl font-bold text-green-500 glow-text mb-2"
                  style={{ fontFamily: "'Courier New', monospace" }}
                >
                  NAVIGATION_CONSOLE
                </h2>
                <p className="text-gray-300 text-sm">
                  SELECT_RECOVERY_ACTION_FROM_AVAILABLE_OPTIONS
                </p>
              </div>

              <div className="weapon-grid">
                <div
                  className="weapon-slot selected cursor-pointer group"
                  onClick={() => (window.location.href = "/")}
                >
                  <div className="weapon-icon">
                    <Home className="w-6 h-6" />
                  </div>
                  <div className="weapon-name">HOME_BASE</div>
                  <div className="weapon-level">LVL_1</div>
                </div>

                <div
                  className="weapon-slot cursor-pointer group"
                  onClick={() => window.history.back()}
                >
                  <div className="weapon-icon">
                    <ArrowLeft className="w-6 h-6" />
                  </div>
                  <div className="weapon-name">GO_BACK</div>
                  <div className="weapon-level">LVL_2</div>
                </div>

                <div
                  className="weapon-slot cursor-pointer group"
                  onClick={() => (window.location.href = "/projects")}
                >
                  <div className="weapon-icon">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <div className="weapon-name">PROJECTS</div>
                  <div className="weapon-level">LVL_3</div>
                </div>

                <div
                  className="weapon-slot cursor-pointer group"
                  onClick={() => (window.location.href = "/about")}
                >
                  <div className="weapon-icon">
                    <User className="w-6 h-6" />
                  </div>
                  <div className="weapon-name">ABOUT</div>
                  <div className="weapon-level">LVL_4</div>
                </div>
              </div>

              {/* System status */}
              <div className="holographic-display mt-6">
                <div className="flex items-center justify-between text-sm font-mono">
                  <div className="flex items-center space-x-2">
                    <div className="loading-spinner"></div>
                    <span className="text-green-500">SYSTEM_STATUS:</span>
                    <span className="text-green-400">OPERATIONAL</span>
                  </div>
                  <div className="text-gray-400">UPTIME: {uptime}</div>
                </div>
              </div>
            </div>
          </div>

          {/* SYSTEM_LOG.txt (Interactive Terminal) */}
          <div
            className="terminal-window"
            onClick={() => {
              // focus only when user clicks (prevents page auto-scrolling on load)
              setInputFocused(true);
              setTimeout(() => terminalClickRef.current?.focus(), 0);
            }}
          >
            <div className="terminal-header">
              <div className="terminal-buttons">
                <div className="terminal-button terminal-red"></div>
                <div className="terminal-button terminal-yellow"></div>
                <div className="terminal-button terminal-green"></div>
              </div>
              <div className="ml-4 text-green-500 text-sm">
                SYSTEM_LOG.txt
              </div>
            </div>

            <div className="terminal-content custom-scrollbar font-mono text-green-400">
              {log.flatMap((line, i) =>
                String(line)
                  .split("\n")
                  .map((sub, j) => (
                    <div key={`${i}-${j}`} className="text-xs md:text-sm">
                      {sub}
                    </div>
                  ))
              )}
              <div className="flex items-center mt-1">
                <span className="terminal-prompt">guest@portfolio:~$</span>
                <input
                  ref={terminalClickRef}
                  className="bg-transparent outline-none ml-2 flex-1 caret-green-400"
                  value={input}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                      handleCommand(input);
                      setInput("");
                    }
                  }}
                  // no autoFocus here to avoid page jumping
                  placeholder={inputFocused ? "" : " click to type..."}
                />
              </div>
              <div ref={logEndRef} />
            </div>
          </div>
        </div>
      </div>

      {/* Holographic corners */}
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-green-500 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-green-500 opacity-30"></div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-60"></div>
      <div className="absolute bottom-1/3 right-20 w-3 h-3 bg-blue-500 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-2/3 left-1/4 w-1 h-1 bg-green-400 rounded-full animate-bounce opacity-60"></div>

      {/* Local styles for custom classes (works with CRA, Vite, Next) */}
      <style>{`
        .vignette {
          background: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.6) 100%);
        }
        .data-stream {
          position: absolute;
          inset: 0;
          background:
            repeating-linear-gradient(
              to bottom,
              rgba(34, 197, 94, 0.05),
              rgba(34, 197, 94, 0.05) 2px,
              transparent 2px,
              transparent 4px
            );
          mask-image: radial-gradient(circle at center, black 40%, transparent 70%);
          animation: flicker 8s infinite linear;
        }
        @keyframes flicker {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.5; }
        }

        .terminal-window {
          background: rgba(0, 0, 0, 0.75);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: 1rem;
          box-shadow: 0 0 30px rgba(34, 197, 94, 0.15);
          overflow: hidden;
        }
        .terminal-header {
          display: flex;
          align-items: center;
          height: 40px;
          padding: 0 12px;
          background: linear-gradient(180deg, rgba(34, 197, 94, 0.15), rgba(0,0,0,0.5));
          border-bottom: 1px solid rgba(34, 197, 94, 0.25);
          backdrop-filter: blur(6px);
        }
        .terminal-buttons { display: flex; gap: 8px; }
        .terminal-button {
          width: 12px; height: 12px; border-radius: 9999px; opacity: 0.8;
          box-shadow: 0 0 10px currentColor;
        }
        .terminal-red { background: #ef4444; color: #ef4444; }
        .terminal-yellow { background: #eab308; color: #eab308; }
        .terminal-green { background: #22c55e; color: #22c55e; }

        .terminal-content {
          padding: 16px;
          color: #a7f3d0;
          text-shadow: 0 0 5px #22c55e;
          max-height: 260px;
          overflow: auto;
        }
        .terminal-prompt {
          color: #22c55e; margin-right: 8px;
        }
        .typing-cursor {
          margin-left: 2px; display: inline-block; width: 0.6ch;
        }

        .holographic-display {
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: 1rem;
          padding: 16px;
          background: radial-gradient(120% 60% at 50% 0%, rgba(34, 197, 94, 0.08), rgba(0,0,0,0.4));
          box-shadow: inset 0 0 20px rgba(34, 197, 94, 0.15), 0 0 30px rgba(34, 197, 94, 0.08);
        }
        .glow-text {
          animation: glow 2.2s ease-in-out infinite alternate;
        }
        @keyframes glow {
          from { text-shadow: 0 0 12px #22c55e; }
          to  { text-shadow: 0 0 24px #22c55e, 0 0 48px #22c55e; }
        }
        .glitch { filter: contrast(110%) saturate(120%); }

        .war-table {
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: 1rem;
          padding: 16px;
          margin-bottom: 24px;
          background: linear-gradient(180deg, rgba(34, 197, 94, 0.06), rgba(0,0,0,0.4));
        }
        .war-table-content { }

        .weapon-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }
        @media (min-width: 640px) {
          .weapon-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        }
        .weapon-slot {
          border: 1px solid rgba(34, 197, 94, 0.25);
          border-radius: 1rem;
          padding: 14px;
          background: rgba(0, 0, 0, 0.6);
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
        }
        .weapon-slot:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 24px rgba(34, 197, 94, 0.25);
          border-color: rgba(34, 197, 94, 0.5);
        }
        .weapon-slot.selected {
          box-shadow: 0 0 30px rgba(34, 197, 94, 0.25);
          border-color: rgba(34, 197, 94, 0.6);
        }
        .weapon-icon { color: #22c55e; filter: drop-shadow(0 0 10px rgba(34, 197, 94, 0.35)); }
        .weapon-name { color: #a7f3d0; font-family: 'Courier New', monospace; font-weight: 700; }
        .weapon-level { color: #6ee7b7; font-size: 12px; opacity: 0.8; }

        .loading-spinner {
          width: 14px; height: 14px; border-radius: 9999px;
          border: 2px solid rgba(34, 197, 94, 0.3);
          border-top-color: #22c55e;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .custom-scrollbar::-webkit-scrollbar { height: 10px; width: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 197, 94, 0.35); border-radius: 10px;
        }
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: rgba(34,197,94,0.35) rgba(0,0,0,0.3); }
      `}</style>
    </div>
  );
};

export default NotFound;