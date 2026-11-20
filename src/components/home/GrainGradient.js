'use client';
import { useEffect, useRef } from 'react';

// Slow "painted" gradient (grain lives in CSS on .home-hero-media::after) in the brand greens and blues.
// Motion is deliberately minimal: a 40-60s drift plus a soft cursor glow.
// Renders a single still frame for reduced-motion users.

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseAmt;

// Brand palette (from _colors.scss)
const vec3 cNight = vec3(0.104, 0.123, 0.135); // $blue-dark-9
const vec3 cDeep  = vec3(0.099, 0.201, 0.160); // $brand-dark-5
const vec3 cBrand = vec3(0.050, 0.309, 0.214); // $brand-dark-1
const vec3 cLeaf  = vec3(0.188, 0.472, 0.259); // $green-dark-3
const vec3 cBlue  = vec3(0.136, 0.453, 0.664); // $blue-dark-1
const vec3 cSky   = vec3(0.491, 0.718, 0.869); // $blue-light-3

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; i++) {
    v += a * snoise(p);
    p = p * 2.02 + vec2(11.3, 7.7);
    a *= 0.5;
  }
  return v * 0.5 + 0.5;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y) * 0.5;
  float t = uTime * 0.018;

  // Domain-warped noise gives soft, brushy color fields.
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(
    fbm(p + 1.1 * q + vec2(1.7, 9.2) + t * 0.6),
    fbm(p + 1.1 * q + vec2(8.3, 2.8) - t * 0.4)
  );
  float f = fbm(p * 0.9 + 1.2 * r);

  vec3 col = mix(cNight, cDeep, smoothstep(0.25, 0.5, f));
  col = mix(col, cBrand, smoothstep(0.42, 0.66, f));
  col = mix(col, cBlue, smoothstep(0.48, 0.72, r.x) * 0.8);
  col = mix(col, cLeaf, smoothstep(0.52, 0.74, q.y * 0.6 + f * 0.6) * 0.7);
  col = mix(col, cSky, smoothstep(0.62, 0.82, r.y * 0.5 + f * 0.6) * 0.45);
  // Faint "brush edge" where color fields meet, for a painted feel.
  float edge = 1.0 - smoothstep(0.0, 0.035, abs(fract(f * 3.0) - 0.5) - 0.465);
  col += 0.012 * edge;

  // Soft cursor light.
  vec2 m = vec2(uMouse.x * aspect, uMouse.y) * 0.5;
  float d = distance(p, m);
  col += mix(cSky, vec3(1.0), 0.3) * 0.16 * uMouseAmt * exp(-d * d * 5.0);

  // Keep the middle calm so the headline stays readable; gentle vignette.
  float center = exp(-pow((uv.y - 0.5) * 2.2, 2.0)) * exp(-pow((uv.x - 0.5) * 1.6, 2.0));
  col *= 1.0 - 0.24 * center;
  col *= mix(0.82, 1.0, smoothstep(1.1, 0.35, length((uv - 0.5) * vec2(1.0, 1.25))));

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn('[GrainGradient]', gl.isContextLost() ? 'context lost' : gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export default function GrainGradient({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) return; // CSS gradient on the wrapper remains as the fallback.

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uMouse = gl.getUniformLocation(prog, 'uMouse');
    const uMouseAmt = gl.getUniformLocation(prog, 'uMouseAmt');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const lowPower = coarse || navigator.connection?.saveData;
    // The gradient is soft, so render at 1x (grain is a separate full-res CSS layer).
    const dprCap = lowPower ? 0.75 : 1;
    const frameMs = lowPower ? 1000 / 20 : 1000 / 30; // slow motion doesn't need 60fps

    const timeOffset = 24; // a composition we like as the opening frame
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, amt: 0, tamt: 0 };
    let raf = 0;
    let last = 0;
    let start = performance.now();
    let visible = true;
    let shown = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const draw = (now) => {
      resize();
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      mouse.amt += (mouse.tamt - mouse.amt) * 0.03;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, timeOffset + (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uMouseAmt, mouse.amt);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!shown) {
        shown = true;
        canvas.dataset.ready = 'true';
      }
    };

    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (now - last < frameMs) return;
      last = now;
      draw(now);
    };

    const play = () => {
      cancelAnimationFrame(raf);
      if (reduceMotion.matches) {
        draw(start); // one still frame
      } else if (visible && !document.hidden) {
        raf = requestAnimationFrame(loop);
      }
    };

    const onPointer = (e) => {
      if (e.pointerType !== 'mouse' || reduceMotion.matches) return;
      const rect = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left) / rect.width;
      mouse.ty = 1 - (e.clientY - rect.top) / rect.height;
      mouse.tamt = 1;
    };
    const onLeave = () => { mouse.tamt = 0; };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play(); else cancelAnimationFrame(raf);
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? cancelAnimationFrame(raf) : play());
    const onResize = () => { if (reduceMotion.matches) draw(start); };

    window.addEventListener('pointermove', onPointer, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('resize', onResize);
    reduceMotion.addEventListener?.('change', play);
    play();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('pointermove', onPointer);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
      reduceMotion.removeEventListener?.('change', play);
      // Free GPU resources but keep the context alive (React strict mode remounts).
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      delete canvas.dataset.ready;
    };
  }, []);

  return <canvas ref={canvasRef} className={`home-hero-canvas ${className}`} aria-hidden="true" />;
}
