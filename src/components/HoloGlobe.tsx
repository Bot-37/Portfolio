import { useEffect, useRef, useState } from "react";

type Mode = "scan" | "grid" | "pulse";

interface PulseRing {
  r: number;
  alpha: number;
}

const LAND: [number, number][] = [
  ...Array.from({ length: 80 }, (_, i) => [20 + (i * 7.3) % 45, -170 + (i * 13.7) % 100] as [number, number]),
  ...Array.from({ length: 60 }, (_, i) => [-50 + (i * 9.1) % 60, -80 + (i * 8.3) % 45] as [number, number]),
  ...Array.from({ length: 50 }, (_, i) => [35 + (i * 6.1) % 30, -15 + (i * 11.3) % 50] as [number, number]),
  ...Array.from({ length: 75 }, (_, i) => [-30 + (i * 8.7) % 65, -20 + (i * 9.9) % 60] as [number, number]),
  ...Array.from({ length: 120 }, (_, i) => [0 + (i * 5.7) % 70, 40 + (i * 10.3) % 130] as [number, number]),
  ...Array.from({ length: 40 }, (_, i) => [-40 + (i * 6.3) % 25, 115 + (i * 12.7) % 50] as [number, number]),
];

const CITIES: [number, number][] = [
  [40.7, -74], [51.5, -0.1], [35.7, 139.7], [-33.9, 151.2],
  [48.9, 2.3], [55.8, 37.6], [19.1, 72.9], [31.2, 121.5],
  [-23.5, -46.6], [1.3, 103.8], [37.6, -122.4], [25.2, 55.3],
  [59.9, 10.7], [41.0, 29.0], [39.9, 116.4], [-34.6, -58.4],
];

const DOT_SIZES = LAND.map(() => 0.8 + Math.random() * 1.2);

export default function HoloGlobe() {
  const bgRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<HTMLCanvasElement>(null);
  const fxRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<Mode>("scan");
  const [rotDisplay, setRotDisplay] = useState(0);
  const stateRef = useRef({ rot: 0, time: 0, scanAngle: -Math.PI / 2, pulseRings: [] as PulseRing[], mode: "scan" as Mode });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const bg = bgRef.current!;
    const bgCtx = bg.getContext("2d")!;
    const W = 360, H = 360, CX = 180, CY = 180, R = 130;

    // Stars (static)
    bgCtx.clearRect(0, 0, W, H);
    for (let i = 0; i < 120; i++) {
      const seed = i * 137.508;
      const x = (seed * 31.7) % W;
      const y = (seed * 71.3) % H;
      const d = Math.sqrt((x - CX) ** 2 + (y - CY) ** 2);
      if (d < R + 20) continue;
      bgCtx.beginPath();
      bgCtx.arc(x, y, 0.5 + (i % 3) * 0.4, 0, Math.PI * 2);
      bgCtx.fillStyle = `rgba(200,240,255,${0.2 + (i % 5) * 0.12})`;
      bgCtx.fill();
    }
  }, []);

  useEffect(() => {
    stateRef.current.mode = mode;
  }, [mode]);

  useEffect(() => {
    const globe = globeRef.current!;
    const fx = fxRef.current!;
    const gCtx = globe.getContext("2d")!;
    const fCtx = fx.getContext("2d")!;
    const W = 360, H = 360, CX = 180, CY = 180, R = 130;

    function latLonTo3D(lat: number, lon: number, rotDeg: number) {
      const phi = (90 - lat) * Math.PI / 180;
      const theta = (lon + rotDeg) * Math.PI / 180;
      return {
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.sin(theta),
      };
    }

    function drawGlobe() {
      const { rot, time, scanAngle, pulseRings, mode: m } = stateRef.current;
      gCtx.clearRect(0, 0, W, H);

      // Outer glow
      const grd = gCtx.createRadialGradient(CX, CY, R - 2, CX, CY, R + 18);
      grd.addColorStop(0, "rgba(0,200,255,0.18)");
      grd.addColorStop(1, "transparent");
      gCtx.beginPath();
      gCtx.arc(CX, CY, R + 18, 0, Math.PI * 2);
      gCtx.fillStyle = grd;
      gCtx.fill();

      // Globe body
      const bg2 = gCtx.createRadialGradient(CX - 30, CY - 30, 10, CX, CY, R);
      bg2.addColorStop(0, "rgba(0,80,120,0.35)");
      bg2.addColorStop(0.5, "rgba(0,20,50,0.55)");
      bg2.addColorStop(1, "rgba(0,10,30,0.8)");
      gCtx.beginPath();
      gCtx.arc(CX, CY, R, 0, Math.PI * 2);
      gCtx.fillStyle = bg2;
      gCtx.fill();
      gCtx.strokeStyle = "rgba(0,200,255,0.4)";
      gCtx.lineWidth = 1;
      gCtx.stroke();

      // Lat lines
      for (let lat = -75; lat <= 75; lat += 15) {
        const phi = (90 - lat) * Math.PI / 180;
        const ry = Math.cos(phi) * R;
        const rx = Math.sin(phi) * R;
        if (rx < 2) continue;
        gCtx.beginPath();
        gCtx.ellipse(CX, CY - ry, rx, rx * 0.12, 0, 0, Math.PI * 2);
        gCtx.strokeStyle = lat === 0 ? "rgba(0,220,255,0.35)" : "rgba(0,200,255,0.12)";
        gCtx.lineWidth = lat === 0 ? 1 : 0.5;
        gCtx.stroke();
      }

      // Lon lines
      for (let lon = 0; lon < 360; lon += 20) {
        const theta = (lon + rot) * Math.PI / 180;
        const vis = Math.cos(theta) > 0;
        gCtx.beginPath();
        for (let lat = -90; lat <= 90; lat += 3) {
          const phi = (90 - lat) * Math.PI / 180;
          const x = CX + Math.sin(phi) * Math.cos(theta) * R;
          const y = CY - Math.cos(phi) * R;
          lat === -90 ? gCtx.moveTo(x, y) : gCtx.lineTo(x, y);
        }
        gCtx.strokeStyle = vis ? "rgba(0,180,255,0.15)" : "rgba(0,100,180,0.06)";
        gCtx.lineWidth = 0.5;
        gCtx.stroke();
      }

      // Land dots
      for (let i = 0; i < LAND.length; i++) {
        const [lat, lon] = LAND[i];
        const p = latLonTo3D(lat, lon, rot);
        if (p.z < 0) continue;
        gCtx.beginPath();
        gCtx.arc(CX + p.x * R, CY - p.y * R, DOT_SIZES[i] * (0.5 + p.z * 0.5), 0, Math.PI * 2);
        gCtx.fillStyle = `rgba(0,220,255,${(0.4 + p.z * 0.6) * 0.8})`;
        gCtx.fill();
      }

      // City nodes
      for (const [lat, lon] of CITIES) {
        const p = latLonTo3D(lat, lon, rot);
        if (p.z < 0.1) continue;
        const pulse = 0.5 + 0.5 * Math.sin(time * 2 + lat * 0.1);
        const px = CX + p.x * R, py = CY - p.y * R;
        gCtx.beginPath();
        gCtx.arc(px, py, 2 + pulse * 1.5, 0, Math.PI * 2);
        gCtx.fillStyle = `rgba(0,255,220,${0.5 + pulse * 0.5})`;
        gCtx.fill();
        gCtx.beginPath();
        gCtx.arc(px, py, 4 + pulse * 3, 0, Math.PI * 2);
        gCtx.strokeStyle = `rgba(0,255,180,${0.15 + pulse * 0.15})`;
        gCtx.lineWidth = 0.8;
        gCtx.stroke();
      }

      // Scan mode
      if (m === "scan") {
        const sx = CX + Math.cos(scanAngle) * R;
        const sy = CY + Math.sin(scanAngle) * R;
        gCtx.save();
        gCtx.beginPath();
        gCtx.moveTo(CX, CY);
        gCtx.arc(CX, CY, R, scanAngle - 0.5, scanAngle, false);
        gCtx.closePath();
        gCtx.fillStyle = "rgba(0,255,200,0.06)";
        gCtx.fill();
        gCtx.beginPath();
        gCtx.moveTo(CX, CY);
        gCtx.lineTo(sx, sy);
        gCtx.strokeStyle = "rgba(0,255,200,0.6)";
        gCtx.lineWidth = 1;
        gCtx.stroke();
        gCtx.restore();
      }

      // Pulse mode
      if (m === "pulse") {
        for (const ring of pulseRings) {
          gCtx.beginPath();
          gCtx.arc(CX, CY, ring.r, 0, Math.PI * 2);
          gCtx.strokeStyle = `rgba(0,220,255,${ring.alpha})`;
          gCtx.lineWidth = 1.5;
          gCtx.stroke();
        }
      }

      // Specular highlight
      const sGrd = gCtx.createRadialGradient(CX - 45, CY - 45, 5, CX - 30, CY - 30, 80);
      sGrd.addColorStop(0, "rgba(200,255,255,0.12)");
      sGrd.addColorStop(1, "transparent");
      gCtx.beginPath();
      gCtx.arc(CX, CY, R, 0, Math.PI * 2);
      gCtx.fillStyle = sGrd;
      gCtx.fill();
    }

    function drawFX() {
      const { time, mode: m } = stateRef.current;
      fCtx.clearRect(0, 0, W, H);

      // Orbit 1
      fCtx.save();
      fCtx.translate(CX, CY);
      fCtx.rotate(Math.PI * 0.08);
      fCtx.scale(1, 0.28);
      fCtx.beginPath();
      fCtx.arc(0, 0, R + 22, 0, Math.PI * 2);
      fCtx.strokeStyle = "rgba(0,180,255,0.25)";
      fCtx.lineWidth = 1;
      fCtx.setLineDash([6, 10]);
      fCtx.stroke();
      fCtx.setLineDash([]);
      fCtx.restore();

      const oa = time * 0.6;
      fCtx.beginPath();
      fCtx.arc(CX + Math.cos(oa) * (R + 22), CY + Math.sin(oa) * (R + 22) * 0.28, 3, 0, Math.PI * 2);
      fCtx.fillStyle = "rgba(100,255,200,0.9)";
      fCtx.fill();
      fCtx.beginPath();
      fCtx.arc(CX + Math.cos(oa) * (R + 22), CY + Math.sin(oa) * (R + 22) * 0.28, 6, 0, Math.PI * 2);
      fCtx.strokeStyle = "rgba(100,255,200,0.3)";
      fCtx.lineWidth = 1;
      fCtx.stroke();

      // Orbit 2
      fCtx.save();
      fCtx.translate(CX, CY);
      fCtx.rotate(-Math.PI * 0.15);
      fCtx.scale(0.22, 1);
      fCtx.beginPath();
      fCtx.arc(0, 0, R + 35, 0, Math.PI * 2);
      fCtx.strokeStyle = "rgba(120,80,255,0.2)";
      fCtx.lineWidth = 1;
      fCtx.setLineDash([4, 14]);
      fCtx.stroke();
      fCtx.setLineDash([]);
      fCtx.restore();

      const o2a = -time * 0.4 + Math.PI * 0.3;
      fCtx.beginPath();
      fCtx.arc(CX + Math.cos(o2a) * (R + 35) * 0.22, CY + Math.sin(o2a) * (R + 35), 2.5, 0, Math.PI * 2);
      fCtx.fillStyle = "rgba(180,120,255,0.9)";
      fCtx.fill();

      // Base glow
      const baseY = CY + R + 15;
      const baseGrd = fCtx.createRadialGradient(CX, baseY, 0, CX, baseY, 80);
      baseGrd.addColorStop(0, "rgba(0,200,255,0.18)");
      baseGrd.addColorStop(0.5, "rgba(0,150,255,0.06)");
      baseGrd.addColorStop(1, "transparent");
      fCtx.beginPath();
      fCtx.ellipse(CX, baseY, 80, 12, 0, 0, Math.PI * 2);
      fCtx.fillStyle = baseGrd;
      fCtx.fill();

      // Projection beams
      for (let i = 0; i < 3; i++) {
        const bx = CX + (i - 1) * 45;
        const alpha = 0.04 + 0.02 * Math.sin(time + i * 1.5);
        fCtx.beginPath();
        fCtx.moveTo(bx, baseY + 8);
        fCtx.lineTo(CX + (bx - CX) * 0.3, CY + R - 20);
        fCtx.strokeStyle = `rgba(0,200,255,${alpha})`;
        fCtx.lineWidth = 12 - i * 2;
        fCtx.stroke();
      }

      // Grid mode
      if (m === "grid") {
        fCtx.save();
        fCtx.beginPath();
        fCtx.arc(CX, CY, R, 0, Math.PI * 2);
        fCtx.clip();
        fCtx.globalAlpha = 0.1;
        for (let gx = CX - R; gx < CX + R; gx += 18) {
          fCtx.beginPath();
          fCtx.moveTo(gx, CY - R);
          fCtx.lineTo(gx, CY + R);
          fCtx.strokeStyle = "#00f5ff";
          fCtx.lineWidth = 0.5;
          fCtx.stroke();
        }
        for (let gy = CY - R; gy < CY + R; gy += 18) {
          fCtx.beginPath();
          fCtx.moveTo(CX - R, gy);
          fCtx.lineTo(CX + R, gy);
          fCtx.stroke();
        }
        fCtx.restore();
      }
    }

    function tick() {
      const s = stateRef.current;
      s.time += 0.016;
      s.rot = (s.rot + 0.12) % 360;
      if (s.mode === "scan") {
        s.scanAngle += 0.018;
        if (s.scanAngle > Math.PI * 2) s.scanAngle -= Math.PI * 2;
      }
      if (s.mode === "pulse") {
        if (Math.random() < 0.04) s.pulseRings.push({ r: 5, alpha: 0.8 });
        for (const ring of s.pulseRings) {
          ring.r += 1.5;
          ring.alpha -= 0.012;
        }
        s.pulseRings = s.pulseRings.filter((r) => r.alpha > 0 && r.r < R + 5);
      }
      setRotDisplay(Math.round(s.rot * 10) / 10);
      drawGlobe();
      drawFX();
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const modeLabel = mode.toUpperCase();

  return (
    <div style={{
      minHeight: 520,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem 0 1.5rem",
      background: "#010b14",
      border: "1px solid rgba(0,245,255,0.18)",
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: "0 0 48px rgba(0, 245, 255, 0.12)",
    }}>
      {/* Globe canvases */}
      <div style={{ position: "relative", width: "min(360px, 82vw)", height: "min(360px, 82vw)" }}>
        <canvas ref={bgRef} width={360} height={360} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
        <canvas ref={globeRef} width={360} height={360} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
        <canvas ref={fxRef} width={360} height={360} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
      </div>

      {/* Table surface lines */}
      <div style={{ width: "min(520px, 92vw)", marginTop: -12, position: "relative", height: 28 }}>
        {[{ w: "100%", top: 0, op: 0.5 }, { w: "80%", top: 7, op: 0.3 }, { w: "60%", top: 13, op: 0.15 }].map((l, i) => (
          <div key={i} style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: l.w,
            height: 1,
            top: l.top,
            background: "linear-gradient(90deg, transparent, #00f5ff, transparent)",
            opacity: l.op,
          }} />
        ))}
      </div>

      {/* Status bar */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "1rem 2rem",
        marginTop: "1.2rem",
        fontFamily: "'Courier New', monospace",
        fontSize: 11,
        letterSpacing: "0.12em",
        color: "#00f5ff",
        opacity: 0.75,
      }}>
        {[
          `ROT ${rotDisplay.toFixed(1)}°`,
          "NODES 247",
          `MODE ${modeLabel}`,
        ].map((label, i) => (
          <div key={i} style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <div style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#00f5ff",
              animation: `holoBlink 1.8s ${i * 0.6}s ease-in-out infinite`,
            }} />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
        {(["scan", "grid", "pulse"] as Mode[]).map((m) => (
          <button key={m} onClick={() => setMode(m)} style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 10,
            letterSpacing: "0.1em",
            color: "#00f5ff",
            border: `1px solid ${mode === m ? "#00f5ff" : "rgba(0,245,255,0.3)"}`,
            background: mode === m ? "rgba(0,245,255,0.18)" : "rgba(0,245,255,0.05)",
            padding: "5px 14px",
            borderRadius: 3,
            cursor: "pointer",
            textTransform: "uppercase",
          }}>
            {m}
          </button>
        ))}
      </div>

      <style>{`
        @keyframes holoBlink { 0%,100%{opacity:1} 50%{opacity:0.2} }
      `}</style>
    </div>
  );
}
