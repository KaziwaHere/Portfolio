import { useEffect, useRef } from "react";

/*
  Background: animated canvas — diamond grid + drifting geometric shards
  Color palette: --pink (#ff3d7f), --pink-light (#ff6b9d), purple accent (#7b2fff)
  Motion style: slow diagonal drift, pulse fade, no circular blobs
*/

const PINK = "#ff3d7f";
const PINK_LIGHT = "#ff6b9d";
const PURPLE = "#7b2fff";
const BG = "#0a0a0f";

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgba(hex, a) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
}

// Types of floating shapes
const SHAPES = ["diamond", "triangle", "cross", "rect"];

function createShard(W, H) {
  const color = [PINK, PINK_LIGHT, PURPLE][Math.floor(rand(0, 3))];
  return {
    x: rand(0, W),
    y: rand(0, H),
    size: rand(6, 28),
    vx: rand(-0.12, 0.12),
    vy: rand(-0.18, -0.05),
    rotation: rand(0, Math.PI * 2),
    rotSpeed: rand(-0.004, 0.004),
    opacity: rand(0.08, 0.28),
    opacityTarget: rand(0.08, 0.28),
    opacitySpeed: rand(0.002, 0.006),
    color,
    shape: SHAPES[Math.floor(rand(0, SHAPES.length))],
  };
}

function drawDiamond(ctx, x, y, size, rotation) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.lineTo(size * 0.6, 0);
  ctx.lineTo(0, size);
  ctx.lineTo(-size * 0.6, 0);
  ctx.closePath();
  ctx.restore();
}

function drawTriangle(ctx, x, y, size, rotation) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.lineTo(size * 0.866, size * 0.5);
  ctx.lineTo(-size * 0.866, size * 0.5);
  ctx.closePath();
  ctx.restore();
}

function drawCross(ctx, x, y, size, rotation) {
  const t = size * 0.25;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.beginPath();
  ctx.rect(-t, -size, t * 2, size * 2);
  ctx.rect(-size, -t, size * 2, t * 2);
  ctx.restore();
}

function drawRect(ctx, x, y, size, rotation) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.beginPath();
  ctx.rect(-size * 0.5, -size * 0.9, size, size * 1.8);
  ctx.restore();
}

function drawShape(ctx, s) {
  ctx.globalAlpha = s.opacity;
  ctx.strokeStyle = s.color;
  ctx.lineWidth = 1;
  ctx.fillStyle = rgba(s.color, 0.06);

  switch (s.shape) {
    case "diamond":
      drawDiamond(ctx, s.x, s.y, s.size, s.rotation);
      break;
    case "triangle":
      drawTriangle(ctx, s.x, s.y, s.size, s.rotation);
      break;
    case "cross":
      drawCross(ctx, s.x, s.y, s.size, s.rotation);
      break;
    case "rect":
      drawRect(ctx, s.x, s.y, s.size, s.rotation);
      break;
  }

  if (s.shape !== "cross") {
    ctx.fill();
  }
  ctx.stroke();
  ctx.globalAlpha = 1;
}

function drawGrid(ctx, W, H, t) {
  const spacing = 72;
  const cols = Math.ceil(W / spacing) + 2;
  const rows = Math.ceil(H / spacing) + 2;
  const offsetX = (t * 0.006) % spacing;
  const offsetY = (t * 0.004) % spacing;

  ctx.save();
  ctx.lineWidth = 0.4;

  // Draw diamond/cross grid
  for (let row = -1; row < rows; row++) {
    for (let col = -1; col < cols; col++) {
      const cx = col * spacing - offsetX;
      const cy = row * spacing - offsetY;

      // Pulse opacity based on position + time
      const dist = Math.sqrt(Math.pow(cx - W / 2, 2) + Math.pow(cy - H / 2, 2));
      const pulse = Math.sin(dist * 0.008 - t * 0.0015) * 0.5 + 0.5;
      const baseOpacity = 0.04 + pulse * 0.05;

      ctx.globalAlpha = baseOpacity;

      // Alternating pink/purple dots at intersections
      const colorPick = (row + col) % 2 === 0 ? PINK : PURPLE;
      ctx.strokeStyle = colorPick;

      // Small diamond at grid intersection
      const s = 4 + pulse * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy - s);
      ctx.lineTo(cx + s * 0.7, cy);
      ctx.lineTo(cx, cy + s);
      ctx.lineTo(cx - s * 0.7, cy);
      ctx.closePath();
      ctx.stroke();

      // Horizontal line segment
      ctx.globalAlpha = baseOpacity * 0.5;
      ctx.strokeStyle = PINK;
      ctx.beginPath();
      ctx.moveTo(cx + s * 0.7 + 2, cy);
      ctx.lineTo(cx + spacing - s * 0.7 - 2, cy);
      ctx.stroke();

      // Vertical line segment
      ctx.beginPath();
      ctx.moveTo(cx, cy + s + 2);
      ctx.lineTo(cx, cy + spacing - s - 2);
      ctx.stroke();
    }
  }

  ctx.globalAlpha = 1;
  ctx.restore();
}

function drawScanLine(ctx, W, H, t) {
  const y = ((t * 0.04) % (H + 60)) - 30;
  const gradient = ctx.createLinearGradient(0, y - 40, 0, y + 40);
  gradient.addColorStop(0, "rgba(255,61,127,0)");
  gradient.addColorStop(0.5, "rgba(255,61,127,0.035)");
  gradient.addColorStop(1, "rgba(255,61,127,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, y - 40, W, 80);
}

function drawCornerAccents(ctx, W, H, t) {
  const pulse = Math.sin(t * 0.002) * 0.5 + 0.5;
  const size = 60 + pulse * 10;
  const opacity = 0.15 + pulse * 0.1;
  const lineW = 1.5;

  const corners = [
    [0, 0, 1, 1],
    [W, 0, -1, 1],
    [0, H, 1, -1],
    [W, H, -1, -1],
  ];

  ctx.save();
  ctx.lineWidth = lineW;
  ctx.strokeStyle = PINK;
  ctx.globalAlpha = opacity;

  corners.forEach(([x, y, dx, dy]) => {
    ctx.beginPath();
    ctx.moveTo(x + dx * size, y);
    ctx.lineTo(x, y);
    ctx.lineTo(x, y + dy * size);
    ctx.stroke();

    // Inner tick
    ctx.globalAlpha = opacity * 0.5;
    ctx.beginPath();
    ctx.moveTo(x + dx * (size * 0.4), y + dy * 8);
    ctx.lineTo(x + dx * (size * 0.7), y + dy * 8);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + dx * 8, y + dy * (size * 0.4));
    ctx.lineTo(x + dx * 8, y + dy * (size * 0.7));
    ctx.stroke();
    ctx.globalAlpha = opacity;
  });

  ctx.restore();
}

export default function Background() {
  const canvasRef = useRef(null);
  const stateRef = useRef({ shards: [], t: 0, raf: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;

      // Regenerate shards on resize
      const count = Math.floor((W * H) / 18000);
      stateRef.current.shards = Array.from({ length: count }, () =>
        createShard(W, H)
      );
    }

    resize();
    window.addEventListener("resize", resize);

    function tick() {
      const { shards } = stateRef.current;
      stateRef.current.t += 1;
      const t = stateRef.current.t;

      // Clear
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      // Grid layer
      drawGrid(ctx, W, H, t);

      // Scan line sweep
      drawScanLine(ctx, W, H, t);

      // Floating shards
      shards.forEach((s) => {
        // Move
        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.rotSpeed;

        // Fade in/out
        if (Math.abs(s.opacity - s.opacityTarget) < 0.002) {
          s.opacityTarget = rand(0.04, 0.3);
        }
        s.opacity += (s.opacityTarget - s.opacity) * s.opacitySpeed;

        // Wrap around
        if (s.y < -50) { s.y = H + 50; s.x = rand(0, W); }
        if (s.x < -50) { s.x = W + 50; }
        if (s.x > W + 50) { s.x = -50; }

        drawShape(ctx, s);
      });

      // Corner bracket accents
      drawCornerAccents(ctx, W, H, t);

      stateRef.current.raf = requestAnimationFrame(tick);
    }

    stateRef.current.raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(stateRef.current.raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        display: "block",
        pointerEvents: "none",
      }}
    />
  );
}