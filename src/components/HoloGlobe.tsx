import { useEffect, useRef, useState } from "react";

// World continent outline polygons (lon/lat degrees)
// Simplified but recognisable landmass outlines.
const CONTINENTS: Array<Array<[number, number]>> = [
  // North America
  [[-168, 71], [-140, 70], [-120, 74], [-85, 75], [-65, 83], [-60, 78], [-70, 68], [-62, 58], [-65, 45], [-60, 47], [-66, 44], [-70, 42], [-74, 41], [-76, 35], [-80, 25], [-87, 15], [-83, 10], [-77, 8], [-76, 10], [-78, 15], [-83, 20], [-90, 16], [-92, 18], [-97, 19], [-105, 20], [-110, 23], [-117, 32], [-120, 34], [-124, 37], [-124, 49], [-130, 54], [-135, 58], [-145, 60], [-152, 57], [-160, 58], [-168, 63], [-168, 71]],
  // South America
  [[-80, 12], [-75, 10], [-63, 10], [-60, 6], [-52, 4], [-50, 0], [-50, -5], [-36, -5], [-35, -8], [-38, -15], [-38, -20], [-42, -22], [-43, -23], [-45, -24], [-48, -28], [-50, -30], [-52, -33], [-58, -34], [-62, -38], [-65, -42], [-66, -45], [-66, -50], [-68, -54], [-68, -55], [-64, -55], [-66, -56], [-72, -52], [-74, -48], [-72, -42], [-70, -30], [-70, -20], [-75, -14], [-77, -8], [-79, -5], [-78, 0], [-75, 2], [-80, 5], [-80, 12]],
  // Europe
  [[25, 70], [28, 72], [32, 70], [30, 68], [26, 65], [22, 65], [18, 68], [14, 66], [10, 63], [5, 58], [0, 55], [-2, 50], [0, 48], [5, 44], [10, 44], [15, 38], [18, 40], [20, 38], [25, 37], [30, 37], [35, 42], [37, 46], [32, 50], [24, 55], [20, 58], [18, 62], [20, 67], [25, 70]],
  // Africa
  [[35, 22], [38, 18], [42, 12], [45, 11], [50, 12], [52, 10], [44, 10], [40, 5], [35, 5], [30, 5], [25, 5], [20, 5], [14, 4], [10, 4], [5, 4], [0, 5], [-5, 5], [-15, 10], [-17, 15], [-17, 21], [-13, 28], [-8, 35], [0, 37], [5, 37], [10, 38], [15, 37], [20, 35], [25, 38], [30, 36], [35, 30], [37, 25], [35, 22]],
  // Asia (simplified, split to avoid wrap issues)
  [[25, 70], [30, 72], [40, 73], [55, 73], [70, 73], [90, 75], [100, 72], [120, 73], [130, 70], [140, 68], [148, 58], [140, 50], [135, 35], [130, 32], [120, 23], [105, 20], [100, 15], [98, 5], [105, 2], [110, 0], [115, -5], [120, -8], [130, -8], [135, -6], [140, 0], [148, 10], [155, 18], [160, 24], [168, 55], [165, 60], [160, 65], [155, 70], [148, 68], [140, 72], [130, 73], [120, 70], [100, 72], [80, 73], [60, 73], [40, 73], [25, 70]],
  // Australia
  [[114, -22], [115, -30], [120, -34], [125, -34], [132, -32], [136, -36], [140, -38], [145, -38], [150, -37], [152, -30], [155, -25], [152, -20], [148, -18], [142, -12], [136, -12], [130, -14], [126, -18], [120, -20], [114, -22]],
  // Greenland
  [[-50, 83], [-30, 83], [-20, 77], [-25, 70], [-32, 65], [-42, 64], [-50, 68], [-55, 75], [-50, 83]],
  // Japan (simplified)
  [[130, 32], [132, 34], [134, 35], [136, 36], [138, 38], [140, 40], [142, 42], [141, 43], [140, 42], [138, 38], [135, 35], [132, 33], [130, 32]],
  // UK (simplified)
  [[-5, 50], [0, 50], [2, 52], [0, 54], [-2, 56], [-5, 58], [-6, 57], [-4, 55], [-3, 53], [-5, 50]],
  // New Zealand (simplified)
  [[172, -34], [174, -36], [176, -38], [174, -40], [172, -38], [170, -36], [172, -34]],
  // Iceland
  [[-25, 65], [-18, 66], [-15, 65], [-14, 63], [-18, 63], [-22, 63], [-25, 64], [-25, 65]],
];

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
}

interface TransmissionBeam {
  progress: number;
  fromLat: number;
  fromLon: number;
  toLat: number;
  toLon: number;
  active: boolean;
  phase: number;
}

interface HoloGlobeProps {
  transmitting?: boolean;
  onTransmitComplete?: () => void;
}

const DEST_LAT = 10.9974 * Math.PI / 180;
const DEST_LON = 76.9589 * Math.PI / 180;

export default function HoloGlobe({ transmitting = false, onTransmitComplete }: HoloGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({ angle: 0, tiltX: 0.35, velX: 0, velY: 0, dragging: false, lmx: 0, lmy: 0 });
  const particles = useRef<Particle[]>([]);
  const raf = useRef(0);
  const transmitRef = useRef<TransmissionBeam | null>(null);
  const prevTransmitting = useRef(false);
  const viewerPos = useRef<{ lat: number; lon: number } | null>(null);
  const onTransmitCompleteRef = useRef(onTransmitComplete);
  const [hudNodes, setHudNodes] = useState(0);
  const [viewerLabel, setViewerLabel] = useState("LOCATING...");
  const [txStatus, setTxStatus] = useState("");

  useEffect(() => {
    onTransmitCompleteRef.current = onTransmitComplete;
  }, [onTransmitComplete]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setViewerLabel("NO GPS");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        viewerPos.current = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        setViewerLabel(`${pos.coords.latitude.toFixed(1)}°N ${pos.coords.longitude.toFixed(1)}°E`);
      },
      () => {
        viewerPos.current = { lat: 51.5, lon: -0.1 };
        setViewerLabel("APPROX LOCATION");
      }
    );
  }, []);

  useEffect(() => {
    if (transmitting && !prevTransmitting.current) {
      const src = viewerPos.current ?? { lat: 51.5, lon: -0.1 };
      transmitRef.current = {
        progress: 0,
        fromLat: src.lat * Math.PI / 180,
        fromLon: src.lon * Math.PI / 180,
        toLat: DEST_LAT,
        toLon: DEST_LON,
        active: true,
        phase: 0,
      };
      setTxStatus("TRANSMITTING");
    }

    prevTransmitting.current = transmitting;
  }, [transmitting]);

  useEffect(() => {
    particles.current = Array.from({ length: 60 }, () => ({
      x: Math.random() * 500,
      y: Math.random() * 500,
      r: Math.random() * 1.5 + 0.2,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      a: Math.random() * 0.3 + 0.06,
    }));

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 500;
    const H = 500;
    const CX = W / 2;
    const CY = H / 2;
    const R = 175;

    function project(lat: number, lon: number, ang: number) {
      const tx = state.current.tiltX;
      const lam = lon + ang;
      const x = Math.cos(lat) * Math.sin(lam);
      const y = Math.sin(lat) * Math.cos(tx) - Math.cos(lat) * Math.cos(lam) * Math.sin(tx);
      const z = Math.sin(lat) * Math.sin(tx) + Math.cos(lat) * Math.cos(lam) * Math.cos(tx);

      return { sx: CX + R * x, sy: CY - R * y, z, v: z > -0.05 };
    }

    function drawContinents(ang: number) {
      for (const poly of CONTINENTS) {
        if (poly.length < 2) continue;
        ctx.beginPath();
        let started = false;
        let lastVisible = false;

        for (let i = 0; i < poly.length; i++) {
          const [lonDeg, latDeg] = poly[i];
          const lat = latDeg * Math.PI / 180;
          const lon = lonDeg * Math.PI / 180;
          const p = project(lat, lon, ang);

          if (!p.v) {
            started = false;
            lastVisible = false;
            continue;
          }

          if (!started || !lastVisible) {
            ctx.moveTo(p.sx, p.sy);
            started = true;
          } else {
            ctx.lineTo(p.sx, p.sy);
          }
          lastVisible = true;
        }

        ctx.strokeStyle = "rgba(0,255,200,0.55)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    function fillContinents(ang: number) {
      for (const poly of CONTINENTS) {
        if (poly.length < 3) continue;
        ctx.beginPath();
        let started = false;

        for (const [lonDeg, latDeg] of poly) {
          const lat = latDeg * Math.PI / 180;
          const lon = lonDeg * Math.PI / 180;
          const p = project(lat, lon, ang);

          if (!p.v) continue;
          if (!started) {
            ctx.moveTo(p.sx, p.sy);
            started = true;
          } else {
            ctx.lineTo(p.sx, p.sy);
          }
        }

        if (started) {
          ctx.closePath();
          ctx.fillStyle = "rgba(0,255,200,0.04)";
          ctx.fill();
        }
      }
    }

    function drawTransmissionArc(tx: TransmissionBeam, ang: number) {
      const steps = 80;
      const prog = tx.progress;
      const trailLen = 0.22;
      const pts: Array<{ sx: number; sy: number; z: number; t: number }> = [];

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const lat = tx.fromLat + (tx.toLat - tx.fromLat) * t;
        const lon = tx.fromLon + (tx.toLon - tx.fromLon) * t;
        const arcHeight = Math.sin(t * Math.PI) * 0.45;
        const tx2 = state.current.tiltX;
        const lam = lon + ang;
        const bx = Math.cos(lat) * Math.sin(lam);
        const by = Math.sin(lat) * Math.cos(tx2) - Math.cos(lat) * Math.cos(lam) * Math.sin(tx2);
        const bz = Math.sin(lat) * Math.sin(tx2) + Math.cos(lat) * Math.cos(lam) * Math.cos(tx2);
        const scale = 1 + arcHeight;

        pts.push({ sx: CX + R * bx * scale, sy: CY - R * by * scale, z: bz, t });
      }

      const tipIdx = Math.floor(prog * steps);
      const trailStart = Math.max(0, prog - trailLen);

      for (let i = 1; i <= tipIdx; i++) {
        const t = i / steps;
        if (t < trailStart) continue;

        const prev = pts[i - 1];
        const curr = pts[i];
        if (prev.z < -0.1 || curr.z < -0.1) continue;

        const fade = (t - trailStart) / (prog - trailStart + 0.001);
        const intensity = Math.pow(fade, 1.5);

        ctx.beginPath();
        ctx.moveTo(prev.sx, prev.sy);
        ctx.lineTo(curr.sx, curr.sy);
        ctx.strokeStyle = `rgba(0,255,120,${intensity * 0.9})`;
        ctx.lineWidth = 2 + intensity * 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(prev.sx, prev.sy);
        ctx.lineTo(curr.sx, curr.sy);
        ctx.strokeStyle = `rgba(180,255,230,${intensity * 0.6})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      if (tipIdx > 0 && tipIdx < pts.length) {
        const tip = pts[tipIdx];
        if (tip.z > -0.05) {
          const r1 = 3 + Math.sin(Date.now() / 80) * 2;
          const r2 = 8 + Math.sin(Date.now() / 60) * 4;
          ctx.beginPath();
          ctx.arc(tip.sx, tip.sy, r2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0,255,120,0.15)";
          ctx.fill();
          ctx.beginPath();
          ctx.arc(tip.sx, tip.sy, r1, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0,255,150,0.9)";
          ctx.fill();
        }
      }

      if (prog >= 1) {
        const dest = pts[pts.length - 1];
        if (dest.z > -0.05) {
          const burst = tx.phase;
          const br = burst * 35;
          const ba = Math.max(0, 1 - burst);
          ctx.beginPath();
          ctx.arc(dest.sx, dest.sy, br, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0,255,150,${ba * 0.6})`;
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(dest.sx, dest.sy, br * 0.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(180,255,230,${ba * 0.4})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(dest.sx, dest.sy, 5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,255,120,${ba})`;
          ctx.fill();
        }
      }
    }

    function drawViewerPin(ang: number) {
      const vp = viewerPos.current;
      if (!vp) return;

      const p = project(vp.lat * Math.PI / 180, vp.lon * Math.PI / 180, ang);
      if (!p.v || p.z < 0.05) return;

      const t = Date.now();
      const pulse = 0.5 + 0.5 * Math.sin(t / 400);
      const a = Math.min(1, (p.z - 0.05) / 0.3);

      for (let i = 0; i < 3; i++) {
        const rr = 6 + i * 8 + pulse * 5;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, rr, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,220,0,${a * (0.5 - i * 0.15)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(p.sx, p.sy, 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,230,0,${a})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(p.sx, p.sy, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,200,${a})`;
      ctx.fill();

      if (p.z > 0.3) {
        ctx.font = "500 9px monospace";
        ctx.fillStyle = `rgba(255,220,0,${a * 0.9})`;
        ctx.textAlign = "left";
        ctx.fillText("◀ YOU", p.sx + 16, p.sy + 4);
      }
    }

    function drawDestPin(ang: number) {
      const p = project(DEST_LAT, DEST_LON, ang);
      if (!p.v || p.z < 0.05) return;

      const t = Date.now();
      const pulse = 0.5 + 0.5 * Math.sin(t / 350);
      const a = Math.min(1, (p.z - 0.05) / 0.3);

      for (let i = 0; i < 2; i++) {
        const rr = 5 + i * 7 + pulse * 4;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, rr, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,180,255,${a * (0.5 - i * 0.2)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(p.sx, p.sy, 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,180,255,${a})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(p.sx, p.sy, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180,230,255,${a})`;
      ctx.fill();

      if (p.z > 0.3) {
        ctx.font = "500 9px monospace";
        ctx.fillStyle = `rgba(0,200,255,${a * 0.9})`;
        ctx.textAlign = "right";
        ctx.fillText("DEST ▶", p.sx - 16, p.sy + 4);
      }
    }

    function frame() {
      const s = state.current;

      if (!s.dragging) {
        s.angle += 0.005 + Math.abs(s.velX);
        s.velX *= 0.96;
        s.velY *= 0.96;
        s.tiltX = Math.max(-0.9, Math.min(0.9, s.tiltX + s.velY));
      }

      const ang = s.angle;
      const tb = transmitRef.current;

      if (tb && tb.active) {
        if (tb.progress < 1) {
          tb.progress = Math.min(1, tb.progress + 0.008);
        } else {
          tb.phase = Math.min(1, tb.phase + 0.025);
          if (tb.phase >= 1) {
            tb.active = false;
            transmitRef.current = null;
            setTxStatus("");
            onTransmitCompleteRef.current?.();
          }
        }
      }

      ctx.clearRect(0, 0, W, H);

      for (const p of particles.current) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,200,${p.a})`;
        ctx.fill();
      }

      const g1 = ctx.createRadialGradient(CX - 45, CY - 45, 12, CX, CY, R);
      g1.addColorStop(0, "rgba(0,75,100,0.65)");
      g1.addColorStop(0.5, "rgba(0,30,60,0.55)");
      g1.addColorStop(1, "rgba(0,5,25,0.82)");
      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.fillStyle = g1;
      ctx.fill();

      const g2 = ctx.createRadialGradient(CX, CY, R - 2, CX, CY, R + 28);
      g2.addColorStop(0, "rgba(0,255,200,0.30)");
      g2.addColorStop(0.6, "rgba(0,255,200,0.08)");
      g2.addColorStop(1, "rgba(0,255,200,0)");
      ctx.beginPath();
      ctx.arc(CX, CY, R + 28, 0, Math.PI * 2);
      ctx.fillStyle = g2;
      ctx.fill();

      const g3 = ctx.createRadialGradient(CX - 60, CY - 60, 6, CX - 45, CY - 45, 90);
      g3.addColorStop(0, "rgba(200,255,245,0.22)");
      g3.addColorStop(1, "rgba(0,255,200,0)");
      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.fillStyle = g3;
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.clip();

      for (let latD = -80; latD <= 80; latD += 10) {
        const lat = latD * Math.PI / 180;
        ctx.beginPath();
        let started = false;

        for (let lon = -Math.PI; lon <= Math.PI; lon += 0.025) {
          const p = project(lat, lon, ang);
          if (!p.v) {
            started = false;
            continue;
          }

          if (started) {
            ctx.lineTo(p.sx, p.sy);
          } else {
            ctx.moveTo(p.sx, p.sy);
            started = true;
          }
        }

        const isEquator = latD === 0;
        const isTropic = Math.abs(latD) === 23 || Math.abs(latD) === 66;
        ctx.strokeStyle = isEquator ? "rgba(0,255,200,0.6)" : isTropic ? "rgba(0,255,200,0.35)" : "rgba(0,255,200,0.12)";
        ctx.lineWidth = isEquator ? 1.3 : isTropic ? 0.8 : 0.4;
        ctx.stroke();
      }

      for (let lonD = 0; lonD < 360; lonD += 10) {
        const lon = lonD * Math.PI / 180;
        ctx.beginPath();
        let started = false;

        for (let lat = -Math.PI / 2; lat <= Math.PI / 2; lat += 0.025) {
          const p = project(lat, lon, ang);
          if (!p.v) {
            started = false;
            continue;
          }

          if (started) {
            ctx.lineTo(p.sx, p.sy);
          } else {
            ctx.moveTo(p.sx, p.sy);
            started = true;
          }
        }

        const isPrime = lonD === 0 || lonD === 180;
        ctx.strokeStyle = isPrime ? "rgba(0,255,200,0.4)" : "rgba(0,255,200,0.10)";
        ctx.lineWidth = isPrime ? 1 : 0.35;
        ctx.stroke();
      }

      fillContinents(ang);
      drawContinents(ang);
      ctx.restore();

      let nodeCount = 0;
      for (let latD = -80; latD <= 80; latD += 20) {
        for (let lonD = 0; lonD < 360; lonD += 20) {
          const p = project(latD * Math.PI / 180, lonD * Math.PI / 180, ang);
          if (!p.v) continue;
          nodeCount++;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,255,200,${0.25 + p.z * 0.6})`;
          ctx.fill();
        }
      }
      setHudNodes(nodeCount);

      drawViewerPin(ang);
      drawDestPin(ang);

      if (tb && tb.active) drawTransmissionArc(tb, ang);

      const ot = 0.42;
      const orR = R + 34;
      ctx.save();
      ctx.translate(CX, CY);
      ctx.scale(1, Math.cos(ot));
      ctx.beginPath();
      ctx.arc(0, 0, orR, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,180,255,0.3)";
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 7]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      const sa = ang * 1.7;
      const osx = CX + orR * Math.cos(sa);
      const osy = CY + orR * Math.sin(sa) * Math.cos(ot);
      ctx.beginPath();
      ctx.arc(osx, osy, 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,180,255,0.9)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(osx, osy, 8, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,180,255,0.25)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(CX, CY, R + 6, -0.3, 0.3);
      ctx.strokeStyle = "rgba(0,180,255,0.5)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(CX, CY, R + 6, Math.PI - 0.3, Math.PI + 0.3);
      ctx.strokeStyle = "rgba(0,180,255,0.5)";
      ctx.lineWidth = 2;
      ctx.stroke();

      const py = CY + R + 18;
      const pb = ctx.createLinearGradient(CX, py, CX, py + 60);
      pb.addColorStop(0, "rgba(0,255,200,0.22)");
      pb.addColorStop(1, "rgba(0,255,200,0)");
      ctx.beginPath();
      ctx.rect(CX - 4, py, 8, 60);
      ctx.fillStyle = pb;
      ctx.fill();

      const tg = ctx.createRadialGradient(CX, py + 64, 0, CX, py + 64, 105);
      tg.addColorStop(0, "rgba(0,255,200,0.28)");
      tg.addColorStop(0.5, "rgba(0,255,200,0.08)");
      tg.addColorStop(1, "rgba(0,255,200,0)");
      ctx.beginPath();
      ctx.ellipse(CX, py + 64, 105, 16, 0, 0, Math.PI * 2);
      ctx.fillStyle = tg;
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(CX, py + 64, 82, 12, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,255,200,0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();

      raf.current = requestAnimationFrame(frame);
    }

    raf.current = requestAnimationFrame(frame);

    const down = (e: MouseEvent) => {
      state.current.dragging = true;
      state.current.lmx = e.clientX;
      state.current.lmy = e.clientY;
    };
    const move = (e: MouseEvent) => {
      if (!state.current.dragging) return;
      const dx = e.clientX - state.current.lmx;
      const dy = e.clientY - state.current.lmy;
      state.current.velX = dx * 0.003;
      state.current.velY = dy * 0.004;
      state.current.angle += state.current.velX;
      state.current.tiltX = Math.max(-0.9, Math.min(0.9, state.current.tiltX + state.current.velY));
      state.current.lmx = e.clientX;
      state.current.lmy = e.clientY;
    };
    const up = () => {
      state.current.dragging = false;
    };
    const td = (e: TouchEvent) => {
      e.preventDefault();
      state.current.dragging = true;
      state.current.lmx = e.touches[0].clientX;
      state.current.lmy = e.touches[0].clientY;
    };
    const tm = (e: TouchEvent) => {
      e.preventDefault();
      if (!state.current.dragging) return;
      const dx = e.touches[0].clientX - state.current.lmx;
      const dy = e.touches[0].clientY - state.current.lmy;
      state.current.velX = dx * 0.003;
      state.current.velY = dy * 0.004;
      state.current.angle += state.current.velX;
      state.current.tiltX = Math.max(-0.9, Math.min(0.9, state.current.tiltX + state.current.velY));
      state.current.lmx = e.touches[0].clientX;
      state.current.lmy = e.touches[0].clientY;
    };

    canvas.addEventListener("mousedown", down);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    canvas.addEventListener("touchstart", td, { passive: false });
    canvas.addEventListener("touchmove", tm, { passive: false });
    canvas.addEventListener("touchend", up);

    return () => {
      cancelAnimationFrame(raf.current);
      canvas.removeEventListener("mousedown", down);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      canvas.removeEventListener("touchstart", td);
      canvas.removeEventListener("touchmove", tm);
      canvas.removeEventListener("touchend", up);
    };
  }, []);

  const M: React.CSSProperties = { fontFamily: "monospace" };
  const C = "#00ffcc";
  const CD = "rgba(0,255,200,0.55)";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#020c18", position: "relative", overflow: "hidden", userSelect: "none", padding: "12px 0", width: "100%" }}>
      <style>{`
        @keyframes scan{0%{top:0;opacity:0}5%{opacity:1}95%{opacity:1}100%{top:100%;opacity:0}}
        @keyframes txPulse{0%,100%{opacity:1}50%{opacity:0.4}}
      `}</style>
      <div style={{ position: "absolute", width: "100%", height: 1, background: "linear-gradient(to right,transparent,rgba(0,255,200,0.25),transparent)", animation: "scan 6s linear infinite", pointerEvents: "none", top: 0 }} />

      <div style={{ position: "absolute", top: 16, left: 10, ...M, background: "rgba(0,255,200,0.04)", border: "0.5px solid rgba(0,255,200,0.18)", borderRadius: 5, padding: "8px 12px" }}>
        <div style={{ fontSize: 9, color: CD, letterSpacing: 2 }}>OBJECT</div>
        <div style={{ fontSize: 12, color: C }}>TERRA-01</div>
        <div style={{ fontSize: 9, color: CD, letterSpacing: 2, marginTop: 6 }}>YOUR SIGNAL</div>
        <div style={{ fontSize: 11, color: "rgba(255,220,0,0.85)" }}>{viewerLabel}</div>
        <div style={{ fontSize: 9, color: CD, letterSpacing: 2, marginTop: 6 }}>DESTINATION</div>
        <div style={{ fontSize: 11, color: "rgba(0,180,255,0.9)" }}>10.99°N 76.95°E</div>
      </div>

      <div style={{ position: "absolute", top: 16, right: 10, ...M, background: "rgba(0,255,200,0.04)", border: "0.5px solid rgba(0,255,200,0.18)", borderRadius: 5, padding: "8px 12px", textAlign: "right" }}>
        <div style={{ fontSize: 9, color: CD, letterSpacing: 2 }}>STATUS</div>
        <div style={{ fontSize: 12, color: txStatus ? "rgba(0,255,100,1)" : "#00ff88", animation: txStatus ? "txPulse 0.8s infinite" : "none" }}>
          {txStatus ? `● ${txStatus}` : "● ACTIVE"}
        </div>
        <div style={{ fontSize: 9, color: CD, letterSpacing: 2, marginTop: 6 }}>GRID</div>
        <div style={{ fontSize: 11, color: C }}>10° PRECISION</div>
        <div style={{ fontSize: 9, color: CD, letterSpacing: 2, marginTop: 6 }}>NODES</div>
        <div style={{ fontSize: 11, color: C }}>{hudNodes}</div>
      </div>

      <canvas ref={canvasRef} width={500} height={500} style={{ cursor: "grab", display: "block", maxWidth: "100%", height: "auto" }} />

      <div style={{ display: "flex", gap: 24, ...M, borderTop: "0.5px solid rgba(0,255,200,0.18)", paddingTop: 8, marginTop: 2, maxWidth: "100%", flexWrap: "wrap", justifyContent: "center" }}>
        {[
          { l: "MODE", v: "PULSE + GRID" },
          { l: "CONTINENTS", v: "ENABLED", c: "#00ff88" },
          { l: "SIGNAL", v: "██████ 98%", c: "#00ff88" },
          { l: "ORBIT", v: "ACTIVE" },
        ].map(({ l, v, c }) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 9, color: CD, letterSpacing: 2 }}>{l}</div>
            <div style={{ fontSize: 11, color: c ?? C }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
