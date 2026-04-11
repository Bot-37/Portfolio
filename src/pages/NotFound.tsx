import React, { useEffect, useRef, useState, useCallback } from "react";
import { Home, Rocket, User, ArrowLeft, Zap, Terminal } from "lucide-react";

type LogLine = { text: string; type: "output" | "input" | "error" | "success" | "info" | "warn" };

const COMMANDS: Record<string, string> = {
  help: "help",
  home: "home",
  projects: "projects",
  about: "about",
  back: "back",
  clear: "clear",
  echo: "echo",
  time: "time",
  whoami: "whoami",
  ls: "ls",
  pwd: "pwd",
  ping: "ping",
  matrix: "matrix",
  sudo: "sudo",
  hack: "hack",
};

const NotFound: React.FC = () => {
  const [terminalText, setTerminalText] = useState<string>("");
  const [showCursor, setShowCursor] = useState<boolean>(true);
  const [glitchActive, setGlitchActive] = useState<boolean>(false);
  const [uptime, setUptime] = useState<string>(() =>
  new Date().toLocaleTimeString("en-GB", { hour12: false })
  );
  const [log, setLog] = useState<LogLine[]>(() => [
    { text: "▓▓▓ SYSTEM RECOVERY PROTOCOL v4.0.4 ▓▓▓", type: "info" },
    { text: `[${new Date().toLocaleTimeString("en-GB", { hour12: false })}] Kernel panic intercepted — route not found`, type: "error" },
                                            { text: `[${new Date().toLocaleTimeString("en-GB", { hour12: false })}] Loading recovery shell...`, type: "warn" },
                                            { text: `[${new Date().toLocaleTimeString("en-GB", { hour12: false })}] Shell ready. Type 'help' for commands.`, type: "success" },
  ]);
  const [input, setInput] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [suggestion, setSuggestion] = useState<string>("");
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [matrixMode, setMatrixMode] = useState<boolean>(false);
  const [hackProgress, setHackProgress] = useState<number | null>(null);

  const logEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  const fullText = "ERR_ROUTE_NOT_FOUND // RECOVERY MODE ACTIVE";

  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  // Typewriter
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      if (i < fullText.length) {
        setTerminalText(fullText.slice(0, ++i));
      } else clearInterval(t);
    }, 55);
      return () => clearInterval(t);
  }, []);

  // Cursor blink
  useEffect(() => {
    const t = setInterval(() => setShowCursor((p) => !p), 530);
    return () => clearInterval(t);
  }, []);

  // Glitch pulse
  useEffect(() => {
    const schedule = () => {
      const id = setTimeout(() => {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 180);
        schedule();
      }, 3500 + Math.random() * 3000);
      return id;
    };
    const id = schedule();
    return () => clearTimeout(id);
  }, []);

  // Uptime
  useEffect(() => {
    const t = setInterval(() =>
    setUptime(new Date().toLocaleTimeString("en-GB", { hour12: false })), 1000);
    return () => clearInterval(t);
  }, []);

  // Auto-scroll log
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [log]);

  // Matrix rain canvas
  useEffect(() => {
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const cols = Math.floor(canvas.width / 18);
    const drops = Array(cols).fill(1);
    const chars = "ア イ ウ エ オ カ キ ク ケ コ サ 0 1 2 3 4 5 6 7 8 9 A B C D E F".split(" ");

    let frame = 0;
    const draw = () => {
      ctx.fillStyle = matrixMode ? "rgba(0,0,0,0.04)" : "rgba(0,0,0,0.055)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const alpha = matrixMode ? 1 : 0.22;
      ctx.font = "13px 'Courier New', monospace";

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 18;
        const brightness = Math.random() > 0.97 ? 1 : 0.55;
        ctx.fillStyle = matrixMode
        ? `rgba(34, 197, 94, ${brightness * alpha})`
        : `rgba(34, 197, 94, ${0.15 + brightness * 0.07})`;
        ctx.fillText(char, x, y * 18);

        if (y * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        else drops[i]++;
      });
        frame++;
        animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [matrixMode]);

  // Autocomplete suggestion
  useEffect(() => {
    if (!input) { setSuggestion(""); return; }
    const match = Object.keys(COMMANDS).find(
      (k) => k.startsWith(input) && k !== input
    );
    setSuggestion(match ? match.slice(input.length) : "");
  }, [input]);

  const append = useCallback((text: string, type: LogLine["type"] = "output") => {
    setLog((prev) => [...prev, { text, type }]);
  }, []);

  const stamp = (msg: string) =>
  `[${new Date().toLocaleTimeString("en-GB", { hour12: false })}] ${msg}`;

  const handleCommand = useCallback((raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;

    setHistory((h) => [cmd, ...h.slice(0, 49)]);
    setHistoryIndex(-1);
    append(`guest@portfolio:~$ ${cmd}`, "input");

    const [base, ...rest] = cmd.split(" ");
    const argStr = rest.join(" ");

    switch (base.toLowerCase()) {
      case "help":
        append(
          [
            "┌─ Available commands ─────────────────────────",
            "│  help          show this help",
            "│  home          navigate to homepage",
            "│  projects      navigate to projects",
            "│  about         navigate to about",
            "│  back          browser history back",
            "│  clear         clear terminal output",
            "│  echo <text>   print text",
            "│  time          show current datetime",
            "│  whoami        identify current user",
            "│  ls            list directory contents",
            "│  pwd           print working directory",
            "│  ping          ping the server",
            "│  matrix        toggle matrix mode",
            "│  hack          initiate hack sequence",
            "│  sudo <cmd>    run command as root",
            "└──────────────────────────────────────────────",
            "  Tip: Use ↑/↓ to navigate history, Tab to autocomplete",
          ].join("\n"),
               "info"
        );
        break;

      case "home":
        append(stamp("Routing to /home..."), "success");
        setTimeout(() => (window.location.href = "/"), 400);
        break;

      case "projects":
        append(stamp("Routing to /projects..."), "success");
        setTimeout(() => (window.location.href = "/#projects"), 400);
        break;

      case "about":
        append(stamp("Routing to /about..."), "success");
        setTimeout(() => (window.location.href = "/#about"), 400);
        break;

      case "back":
        append(stamp("Navigating back..."), "warn");
        setTimeout(() => window.history.back(), 400);
        break;

      case "clear":
        setLog([]);
        break;

      case "echo":
        append(argStr || "(empty string)");
        break;

      case "time":
        append(new Date().toLocaleString("en-GB", { hour12: false }), "info");
        break;

      case "whoami":
        append("guest  uid=1000  groups=visitors,lost", "info");
        break;

      case "ls":
        append(
          [
            "drwxr-xr-x  home/",
            "drwxr-xr-x  projects/",
            "drwxr-xr-x  about/",
            "-rw-r--r--  404.html  [YOU ARE HERE]",
            "-rw-------  secrets.enc  [PERMISSION DENIED]",
          ].join("\n"),
               "output"
        );
        break;

      case "pwd":
        append("/dev/null/404", "output");
        break;

      case "ping":
        append(stamp("PING portfolio.dev (127.0.0.1)"), "info");
        [64, 128, 192].forEach((ttl, i) => {
          setTimeout(() => append(`  64 bytes from 127.0.0.1: icmp_seq=${i + 1} ttl=${ttl} time=${(Math.random() * 2 + 0.3).toFixed(3)}ms`, "success"), i * 300);
        });
        setTimeout(() => append("3 packets transmitted, 3 received, 0% packet loss", "success"), 1000);
        break;

      case "matrix":
        setMatrixMode((prev) => {
          const next = !prev;
          append(next ? "Matrix mode ENABLED — welcome, Neo." : "Matrix mode disabled.", next ? "success" : "warn");
          return next;
        });
        break;

      case "hack": {
        append("Initiating hack sequence...", "warn");
        let p = 0;
        setHackProgress(0);
        const msgs = [
          "Bypassing firewall...",
          "Injecting payload...",
          "Decrypting mainframe...",
          "Access granted! Just kidding.",
        ];
        const iv = setInterval(() => {
          p += Math.floor(Math.random() * 18) + 5;
          if (p >= 100) {
            p = 100;
            clearInterval(iv);
            append("ERROR: Hack failed. You are already inside the void.", "error");
            setTimeout(() => setHackProgress(null), 1500);
          } else {
            const msgIdx = Math.floor((p / 100) * msgs.length);
            if (p % 25 < 10) append(msgs[Math.min(msgIdx, msgs.length - 1)], "warn");
          }
          setHackProgress(p);
        }, 200);
        break;
      }

      case "sudo":
        if (!argStr) { append("Usage: sudo <command>", "error"); break; }
        append("sudo: command not found in void", "error");
        append("Password: ••••••••", "output");
        setTimeout(() => append("Authentication failed (3 attempts remaining)", "error"), 600);
        break;

      default:
        append(`bash: ${base}: command not found (type 'help' for commands)`, "error");
    }
  }, [append]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
      setSuggestion("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestion) setInput(input + suggestion);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIdx = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(newIdx);
      if (history[newIdx] !== undefined) setInput(history[newIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIdx = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIdx);
      setInput(newIdx === -1 ? "" : history[newIdx]);
    }
  };

  const navItems = [
    { icon: <Home className="w-5 h-5" />, label: "HOME_BASE", level: "01", href: "/" },
    { icon: <ArrowLeft className="w-5 h-5" />, label: "GO_BACK", level: "02", onClick: () => window.history.back() },
    { icon: <Rocket className="w-5 h-5" />, label: "PROJECTS", level: "03", href: "/projects" },
    { icon: <User className="w-5 h-5" />, label: "ABOUT_ME", level: "04", href: "/about" },
  ];

  const lineColor = (type: LogLine["type"]) => {
    switch (type) {
      case "input": return "#86efac";
      case "error": return "#f87171";
      case "success": return "#4ade80";
      case "warn": return "#fbbf24";
      case "info": return "#60a5fa";
      default: return "#a7f3d0";
    }
  };

  return (
    <div
    style={{ fontFamily: "'Courier New', monospace" }}
    className="min-h-screen relative bg-black overflow-hidden"
    >
    {/* Matrix rain canvas */}
    <canvas
    ref={matrixCanvasRef}
    className="absolute inset-0 pointer-events-none"
    style={{ zIndex: 0 }}
    />

    {/* Grid overlay */}
    <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: `
      linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          zIndex: 1,
    }}
    />

    {/* Vignette */}
    <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.75) 100%)",
          zIndex: 2,
    }}
    />

    {/* HUD corners */}
    {[
      "top-0 left-0 border-l-2 border-t-2",
      "top-0 right-0 border-r-2 border-t-2",
      "bottom-0 left-0 border-l-2 border-b-2",
      "bottom-0 right-0 border-r-2 border-b-2",
    ].map((cls, i) => (
      <div
      key={i}
      className={`absolute w-16 h-16 border-green-500 opacity-40 ${cls}`}
      style={{ zIndex: 3 }}
      />
    ))}

    {/* Floating HUD dots */}
    <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-3" style={{ zIndex: 3 }}>
    {["bg-red-500", "bg-yellow-400", "bg-green-500"].map((c, i) => (
      <div key={i} className={`w-2 h-2 rounded-full ${c} opacity-70`} />
    ))}
    </div>

    {/* Main */}
    <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-12" style={{ zIndex: 4 }}>
    <div className="w-full max-w-3xl space-y-5">

    {/* Header terminal window */}
    <div style={winStyle}>
    <div style={headerStyle}>
    <div style={{ display: "flex", gap: 6 }}>
    {["#ef4444", "#eab308", "#22c55e"].map((c, i) => (
      <div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: c, boxShadow: `0 0 8px ${c}` }} />
    ))}
    </div>
    <span style={{ color: "#22c55e", fontSize: 12, marginLeft: 12 }}>SYSTEM_DIAGNOSTICS.exe — PID 404</span>
    <span style={{ marginLeft: "auto", color: "#4b5563", fontSize: 11 }}>{uptime}</span>
    </div>
    <div style={{ padding: "14px 18px" }}>
    <div style={{ color: "#22c55e", fontSize: 13 }}>
    <span style={{ color: "#4ade80" }}>root@void:~$</span>{" "}
    <span style={{ color: "#f0fdf4" }}>{terminalText}</span>
    <span style={{ opacity: showCursor ? 1 : 0, color: "#22c55e" }}>█</span>
    </div>
    </div>
    </div>

    {/* 404 display */}
    <div style={{ ...winStyle, padding: "28px 24px", textAlign: "center" }}>
    {/* Glitch 404 */}
    <div style={{ position: "relative", display: "inline-block", marginBottom: 20 }}>
    <h1
    style={{
      fontSize: "clamp(80px, 18vw, 130px)",
          fontWeight: 900,
          letterSpacing: "-0.02em",
          color: "#22c55e",
          textShadow: glitchActive
          ? "3px 0 0 #ff3333, -3px 0 0 #33ffff, 0 0 30px #22c55e"
          : "0 0 30px rgba(34,197,94,0.6), 0 0 60px rgba(34,197,94,0.2)",
          transition: "text-shadow 0.05s",
          lineHeight: 1,
    }}
    >
    404
    </h1>
    {glitchActive && (
      <>
      <h1 style={{
        position: "absolute", inset: 0,
        fontSize: "clamp(80px, 18vw, 130px)", fontWeight: 900,
                      color: "#ff3333", opacity: 0.5, lineHeight: 1,
                      clipPath: "polygon(0 0, 100% 0, 100% 40%, 0 40%)",
                      transform: "translate(3px, -1px)",
      }}>404</h1>
      <h1 style={{
        position: "absolute", inset: 0,
        fontSize: "clamp(80px, 18vw, 130px)", fontWeight: 900,
                      color: "#33ffff", opacity: 0.5, lineHeight: 1,
                      clipPath: "polygon(0 60%, 100% 60%, 100% 100%, 0 100%)",
                      transform: "translate(-3px, 1px)",
      }}>404</h1>
      </>
    )}
    </div>

    {/* Status readouts */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, textAlign: "left", maxWidth: 480, margin: "0 auto" }}>
    {[
      { tag: "ERROR", msg: "RESOURCE_NOT_FOUND", color: "#f87171" },
      { tag: "WARN", msg: "ROUTE_UNRESOLVABLE", color: "#fbbf24" },
      { tag: "INFO", msg: "SCANNING_ALTERNATIVES", color: "#60a5fa" },
      { tag: "OK", msg: "RECOVERY_SHELL_READY", color: "#4ade80" },
    ].map(({ tag, msg, color }) => (
      <div key={tag} style={{ fontSize: 11, display: "flex", gap: 6, alignItems: "center" }}>
      <span style={{
        background: color + "22", color, border: `1px solid ${color}44`,
        borderRadius: 3, padding: "1px 5px", fontSize: 10, fontWeight: 700,
        whiteSpace: "nowrap",
      }}>{tag}</span>
      <span style={{ color: "#6ee7b7", letterSpacing: "0.05em" }}>{msg}</span>
      </div>
    ))}
    </div>
    </div>

    {/* Navigation */}
    <div style={winStyle}>
    <div style={headerStyle}>
    <span style={{ color: "#22c55e", fontSize: 12, marginLeft: 6 }}>NAVIGATION_CONSOLE</span>
    </div>
    <div style={{ padding: "16px 18px" }}>
    <p style={{ color: "#6b7280", fontSize: 11, marginBottom: 14, letterSpacing: "0.08em" }}>
    SELECT RECOVERY VECTOR ↓
    </p>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
    {navItems.map(({ icon, label, level, href, onClick }, i) => (
      <button
      key={label}
      onClick={onClick ?? (() => href && (window.location.href = href))}
      style={{
        background: i === 0 ? "rgba(34,197,94,0.08)" : "rgba(0,0,0,0.5)",
                                                                 border: `1px solid ${i === 0 ? "rgba(34,197,94,0.5)" : "rgba(34,197,94,0.18)"}`,
                                                                 borderRadius: 8,
                                                                 padding: "14px 16px",
                                                                 cursor: "pointer",
                                                                 display: "flex",
                                                                 alignItems: "center",
                                                                 gap: 12,
                                                                 textAlign: "left",
                                                                 transition: "all 0.15s ease",
                                                                 color: "#a7f3d0",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(34,197,94,0.6)";
        (e.currentTarget as HTMLButtonElement).style.background = "rgba(34,197,94,0.1)";
        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = i === 0 ? "rgba(34,197,94,0.5)" : "rgba(34,197,94,0.18)";
        (e.currentTarget as HTMLButtonElement).style.background = i === 0 ? "rgba(34,197,94,0.08)" : "rgba(0,0,0,0.5)";
        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
      }}
      >
      <div style={{ color: "#22c55e", filter: "drop-shadow(0 0 8px rgba(34,197,94,0.5))", flexShrink: 0 }}>
      {icon}
      </div>
      <div style={{ flex: 1 }}>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em" }}>{label}</div>
      <div style={{ fontSize: 10, color: "#4b5563", marginTop: 2 }}>VEC_{level}</div>
      </div>
      {i === 0 && (
        <div style={{ fontSize: 9, color: "#22c55e", background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 3, padding: "2px 6px" }}>
        RECOMMENDED
        </div>
      )}
      </button>
    ))}
    </div>
    </div>
    </div>

    {/* Interactive terminal */}
    <div
    style={winStyle}
    onClick={() => {
      setInputFocused(true);
      setTimeout(() => inputRef.current?.focus(), 0);
    }}
    >
    <div style={headerStyle}>
    <div style={{ display: "flex", gap: 6 }}>
    {["#ef4444", "#eab308", "#22c55e"].map((c, i) => (
      <div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: 0.85 }} />
    ))}
    </div>
    <Terminal size={12} style={{ color: "#22c55e", marginLeft: 10 }} />
    <span style={{ color: "#22c55e", fontSize: 12, marginLeft: 6 }}>RECOVERY_SHELL.sh</span>
    <div style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center" }}>
    {hackProgress !== null && (
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ fontSize: 10, color: "#fbbf24" }}>HACKING</span>
      <div style={{ width: 80, height: 4, background: "rgba(34,197,94,0.15)", borderRadius: 2 }}>
      <div style={{ width: `${hackProgress}%`, height: "100%", background: "#22c55e", borderRadius: 2, transition: "width 0.2s ease", boxShadow: "0 0 8px #22c55e" }} />
      </div>
      <span style={{ fontSize: 10, color: "#22c55e" }}>{hackProgress}%</span>
      </div>
    )}
    <div style={{ fontSize: 10, color: "#374151" }}>
    {history.length > 0 && `${history.length} cmd${history.length !== 1 ? "s" : ""}`}
    </div>
    </div>
    </div>

    {/* Log */}
    <div
    style={{
      padding: "14px 18px",
      maxHeight: 260,
      overflowY: "auto",
      fontSize: 12,
      lineHeight: 1.7,
    }}
    className="custom-scroll"
    >
    {log.flatMap((line, i) =>
      String(line.text).split("\n").map((sub, j) => (
        <div key={`${i}-${j}`} style={{ color: lineColor(line.type) }}>
        {sub || "\u00a0"}
        </div>
      ))
    )}

    {/* Input row */}
    <div style={{ display: "flex", alignItems: "center", marginTop: 6, position: "relative" }}>
    <span style={{ color: "#22c55e", marginRight: 8, whiteSpace: "nowrap" }}>
    guest@portfolio:~$
    </span>
    <div style={{ flex: 1, position: "relative" }}>
    {/* Ghost suggestion */}
    {suggestion && (
      <span style={{
        position: "absolute", left: 0, top: 0,
        color: "#374151",
        pointerEvents: "none",
        whiteSpace: "pre",
      }}>
      {input}<span>{suggestion}</span>
      </span>
    )}
    <input
    ref={inputRef}
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={handleKeyDown}
    onFocus={() => setInputFocused(true)}
    style={{
      background: "transparent",
      outline: "none",
      border: "none",
      color: "#f0fdf4",
      fontFamily: "'Courier New', monospace",
      fontSize: 12,
      width: "100%",
      caretColor: "#22c55e",
    }}
    placeholder={inputFocused ? "" : "click to type..."}
    />
    </div>
    </div>
    <div ref={logEndRef} />
    </div>

    {/* Footer hint */}
    <div style={{ borderTop: "1px solid rgba(34,197,94,0.1)", padding: "8px 18px", display: "flex", gap: 16, flexWrap: "wrap" }}>
    {[
      ["Tab", "autocomplete"],
      ["↑↓", "history"],
      ["Enter", "execute"],
    ].map(([key, desc]) => (
      <span key={key} style={{ fontSize: 10, color: "#374151" }}>
      <kbd style={{
        background: "rgba(34,197,94,0.08)",
                            border: "1px solid rgba(34,197,94,0.2)",
                            borderRadius: 3,
                            padding: "1px 5px",
                            color: "#6ee7b7",
                            marginRight: 4,
      }}>{key}</kbd>
      {desc}
      </span>
    ))}
    </div>
    </div>

    </div>
    </div>

    {/* Global styles */}
    <style>{`
      .custom-scroll::-webkit-scrollbar { width: 5px; }
      .custom-scroll::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); }
      .custom-scroll::-webkit-scrollbar-thumb { background: rgba(34,197,94,0.3); border-radius: 5px; }
      .custom-scroll { scrollbar-width: thin; scrollbar-color: rgba(34,197,94,0.3) rgba(0,0,0,0.3); }
      button { font-family: 'Courier New', monospace; }
      `}</style>
      </div>
  );
};

const winStyle: React.CSSProperties = {
  background: "rgba(0,0,0,0.72)",
  border: "1px solid rgba(34,197,94,0.2)",
  borderRadius: 12,
  backdropFilter: "blur(12px)",
  overflow: "hidden",
  boxShadow: "0 0 40px rgba(34,197,94,0.06), inset 0 1px 0 rgba(34,197,94,0.08)",
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  height: 38,
  padding: "0 14px",
  background: "rgba(34,197,94,0.05)",
  borderBottom: "1px solid rgba(34,197,94,0.12)",
};

export default NotFound;
