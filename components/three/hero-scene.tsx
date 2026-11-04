"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/* palette + shared resources                                          */
/* ------------------------------------------------------------------ */

const C = {
  cream: "#e8dfca",
  creamDim: "#c9c0ab",
  ink: "#141419",
  inkSoft: "#1d1d24",
  wood: "#2b2119",
  accent: "#ffb86b",
  mint: "#8ef0c8",
  screen: "#0a0f14",
  steel: "#3a3a44",
};

function makeGradient() {
  const data = new Uint8Array([40, 110, 190, 255]);
  const texture = new THREE.DataTexture(data, 4, 1, THREE.RedFormat);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.needsUpdate = true;
  return texture;
}

const gradientMap = makeGradient();

function toon(color: string, extra: Partial<THREE.MeshToonMaterialParameters> = {}) {
  return new THREE.MeshToonMaterial({ color, gradientMap, ...extra });
}

/* ------------------------------------------------------------------ */
/* monitor screen texture                                              */
/* ------------------------------------------------------------------ */

function makeScreenTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 720;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = C.screen;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#111820";
  ctx.fillRect(0, 0, canvas.width, 52);
  ["#ff6b6b", "#ffd166", "#8ef0c8"].forEach((color, i) => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.85;
    ctx.arc(26 + i * 22, 26, 6, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#8b949e";
  ctx.font = "15px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.fillText("portfolio.ts", 96, 31);

  const lines = [
    "// built for the web, 2026",
    "import { craft } from '@/lib/ship';",
    "",
    "export const bishal = {",
    "  role: 'full stack developer',",
    "  base: 'dhaka, bd',",
    "  stack: ['react', 'next', 'node'],",
    "  data: ['postgres', 'prisma'],",
    "  years: 3,",
    "  available: true,",
    "}",
    "",
    "export async function build(idea) {",
    "  const spec = await design(idea);",
    "  const api = implement(spec);",
    "",
    "  return ship(api, {",
    "    budget: '200kb',",
    "    fps: 60,",
    "    a11y: true,",
    "  });",
    "}",
    "",
    "// interfaces that feel alive",
    "const motion = useSpring(purpose);",
  ];

  const colors = {
    text: "#c9cdd4",
    keyword: C.accent,
    string: C.mint,
    comment: "#4d5560",
    number: "#9fb4ff",
    dim: "#2c333c",
  };
  const keywords = /^(import|from|export|const|return|async|await|function|new|true)$/;

  ctx.font = "15px ui-monospace, SFMono-Regular, Menlo, monospace";
  const lineHeight = 23;

  lines.forEach((line, i) => {
    const y = 88 + i * lineHeight;
    ctx.fillStyle = colors.dim;
    ctx.fillText(String(i + 1).padStart(2, "0"), 18, y);

    let x = 58;
    line.split(/(\s+|'[^']*'|"[^"]*")/g).forEach((token) => {
      if (!token) return;
      let color = colors.text;
      if (/^['"]/.test(token)) color = colors.string;
      else if (token.startsWith("//")) color = colors.comment;
      else if (/^\d+$/.test(token)) color = colors.number;
      else if (keywords.test(token)) color = colors.keyword;
      ctx.fillStyle = color;
      ctx.fillText(token, x, y);
      x += ctx.measureText(token).width;
    });
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

/* ------------------------------------------------------------------ */
/* builders                                                            */
/* ------------------------------------------------------------------ */

function addDesk(scene: THREE.Object3D) {
  const desk = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.16, 2.0), toon(C.wood));
  desk.position.set(0, 0.82, 0);
  scene.add(desk);

  [-1.95, 1.95].forEach((x) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.8, 1.62), toon("#221a14"));
    leg.position.set(x, 0.4, 0);
    scene.add(leg);
  });

  const strip = new THREE.Mesh(
    new THREE.BoxGeometry(4.3, 0.012, 0.012),
    new THREE.MeshBasicMaterial({ color: C.mint, transparent: true, opacity: 0.55 }),
  );
  strip.position.set(0, 0.9, 1.005);
  scene.add(strip);
}

function addMonitor(scene: THREE.Object3D, texture: THREE.CanvasTexture) {
  const standBase = new THREE.Mesh(
    new THREE.BoxGeometry(0.66, 0.05, 0.4),
    toon(C.creamDim),
  );
  standBase.position.set(0, 0.93, -0.36);
  scene.add(standBase);

  const neck = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.35, 0.15), toon(C.creamDim));
  neck.position.set(0, 1.12, -0.4);
  scene.add(neck);

  const body = new THREE.Group();
  body.rotation.x = -0.035;
  body.position.set(0, 1.72, -0.5);

  const frame = new THREE.Mesh(new THREE.BoxGeometry(2.02, 1.18, 0.09), toon(C.cream));
  body.add(frame);

  const bezel = new THREE.Mesh(new THREE.BoxGeometry(1.88, 1.04, 0.02), toon(C.ink));
  bezel.position.z = 0.052;
  body.add(bezel);

  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(1.8, 1.01),
    new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }),
  );
  screen.position.z = 0.062;
  body.add(screen);

  const dot = new THREE.Mesh(
    new THREE.SphereGeometry(0.018, 8, 8),
    new THREE.MeshBasicMaterial({ color: C.mint }),
  );
  dot.position.set(0.86, -0.48, 0.06);
  body.add(dot);

  scene.add(body);

  const glow = new THREE.PointLight(C.mint, 9, 3.2, 2);
  glow.position.set(0, 1.55, 0.35);
  scene.add(glow);
}

function addKeyboard(scene: THREE.Object3D) {
  const base = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.03, 0.44), toon(C.inkSoft));
  base.position.set(0, 0.925, 0.5);
  scene.add(base);

  const rows = 4;
  const cols = 12;
  const keys = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.084, 0.016, 0.076),
    toon(C.creamDim),
    rows * cols,
  );
  const matrix = new THREE.Matrix4();
  let i = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = (col - (cols - 1) / 2) * 0.102;
      const z = (row - (rows - 1) / 2) * 0.094;
      matrix.makeTranslation(x, 0.945, z + 0.5);
      keys.setMatrixAt(i++, matrix);
    }
  }
  keys.instanceMatrix.needsUpdate = true;
  scene.add(keys);

  const space = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.018, 0.07), toon(C.accent));
  space.position.set(0, 0.943, 0.66);
  scene.add(space);
}

type Robot = {
  group: THREE.Group;
  head: THREE.Group;
  armRight: THREE.Group;
  armLeft: THREE.Group;
  antenna: THREE.Object3D;
};

function addRobot(scene: THREE.Object3D): Robot {
  const group = new THREE.Group();
  group.position.set(1.36, 0.9, 0.1);
  group.rotation.y = -0.38;
  group.scale.setScalar(0.92);

  [-0.11, 0.11].forEach((x) => {
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.07, 0.24), toon(C.inkSoft));
    foot.position.set(x, 0.035, 0.02);
    group.add(foot);

    const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.052, 0.16, 4, 8), toon(C.steel));
    leg.position.set(x, 0.21, 0);
    group.add(leg);
  });

  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.24, 0.3, 8, 16), toon(C.cream));
  body.position.set(0, 0.56, 0);
  group.add(body);

  const panel = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.17, 0.02), toon(C.ink));
  panel.position.set(0, 0.58, 0.225);
  group.add(panel);

  const panelLight = new THREE.Mesh(
    new THREE.BoxGeometry(0.13, 0.022, 0.005),
    new THREE.MeshBasicMaterial({ color: C.mint }),
  );
  panelLight.position.set(0, 0.6, 0.238);
  group.add(panelLight);

  const makeArm = (x: number) => {
    const arm = new THREE.Group();
    arm.position.set(x, 0.68, 0);
    const limb = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.045, 0.17, 4, 8),
      toon(C.creamDim),
    );
    limb.position.y = -0.13;
    arm.add(limb);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 12), toon(C.inkSoft));
    hand.position.y = -0.26;
    arm.add(hand);
    group.add(arm);
    return arm;
  };
  const armLeft = makeArm(-0.3);
  const armRight = makeArm(0.3);

  const head = new THREE.Group();
  head.position.set(0, 0.96, 0);

  const skull = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.36, 0.36), toon(C.cream));
  head.add(skull);

  const visor = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.22, 0.02), toon(C.ink));
  visor.position.set(0, 0.01, 0.185);
  head.add(visor);

  [-0.075, 0.075].forEach((x) => {
    const eye = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.035, 0.01),
      new THREE.MeshBasicMaterial({ color: C.mint }),
    );
    eye.position.set(x, 0.035, 0.2);
    head.add(eye);
  });

  [-0.24, 0.24].forEach((x) => {
    const ear = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.03, 12), toon(C.accent));
    ear.rotation.z = Math.PI / 2;
    ear.position.set(x, 0, 0);
    head.add(ear);
  });

  const antennaStem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.012, 0.012, 0.12, 6),
    toon(C.steel),
  );
  antennaStem.position.set(0, 0.24, 0);
  head.add(antennaStem);

  const antenna = new THREE.Mesh(
    new THREE.SphereGeometry(0.035, 12, 12),
    new THREE.MeshBasicMaterial({ color: C.accent }),
  );
  antenna.position.set(0, 0.31, 0);
  head.add(antenna);

  group.add(head);
  scene.add(group);

  return { group, head, armRight, armLeft, antenna };
}

function addMug(scene: THREE.Object3D) {
  const group = new THREE.Group();
  group.position.set(1.62, 0.98, 0.28);

  const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.088, 0.18, 20), toon(C.accent));
  group.add(cup);

  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.062, 0.016, 8, 18), toon(C.accent));
  handle.position.x = 0.1;
  handle.rotation.x = Math.PI / 2;
  group.add(handle);

  const coffee = new THREE.Mesh(new THREE.CircleGeometry(0.088, 20), toon("#2a1c12"));
  coffee.position.y = 0.091;
  coffee.rotation.x = -Math.PI / 2;
  group.add(coffee);

  scene.add(group);
}

function addPlant(scene: THREE.Object3D) {
  const group = new THREE.Group();
  group.position.set(-1.62, 0.9, -0.32);

  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.22, 14), toon("#4b3a2c"));
  pot.position.y = 0.11;
  group.add(pot);

  [
    [0.0, 0.34, 0.0, 0.1],
    [0.09, 0.29, 0.04, -0.5],
    [-0.08, 0.3, -0.03, 0.6],
  ].forEach(([x, y, z, tilt], i) => {
    const leaf = new THREE.Mesh(
      new THREE.ConeGeometry(0.085, 0.3, 7),
      toon(i === 1 ? C.mint : "#3f7a5c"),
    );
    leaf.position.set(x, y, z);
    leaf.rotation.set(0.2 * i, 0, tilt);
    group.add(leaf);
  });

  scene.add(group);
}

function addLamp(scene: THREE.Object3D) {
  const group = new THREE.Group();
  group.position.set(-1.72, 0.9, 0.28);

  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.05, 16), toon(C.inkSoft));
  group.add(base);

  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.72, 8), toon(C.steel));
  arm.position.set(0.05, 0.36, -0.02);
  arm.rotation.set(0.12, 0, 0.22);
  group.add(arm);

  const shade = new THREE.Mesh(
    new THREE.ConeGeometry(0.19, 0.26, 20, 1, true),
    toon(C.accent, { side: THREE.DoubleSide }),
  );
  shade.position.set(0.32, 0.7, -0.02);
  shade.rotation.z = -1.05;
  group.add(shade);

  const light = new THREE.PointLight(C.accent, 12, 3.4, 2);
  light.position.set(0.34, 0.55, 0.05);
  group.add(light);

  scene.add(group);
}

type Floater = { mesh: THREE.Mesh; baseY: number; speed: number };

function addFloatingShapes(scene: THREE.Object3D) {
  const definitions: {
    position: [number, number, number];
    scale: number;
    color: string;
    kind: "ico" | "tetra" | "torus";
    speed: number;
  }[] = [
    { position: [-2.9, 2.4, -1.2], scale: 0.22, color: C.accent, kind: "ico", speed: 0.35 },
    { position: [2.7, 2.9, -2.0], scale: 0.16, color: C.mint, kind: "tetra", speed: -0.5 },
    { position: [3.3, 1.4, -1.0], scale: 0.1, color: C.cream, kind: "torus", speed: 0.7 },
    { position: [-3.1, 0.9, -2.4], scale: 0.14, color: C.mint, kind: "ico", speed: -0.4 },
    { position: [2.2, 3.5, -3.4], scale: 0.2, color: C.accent, kind: "tetra", speed: 0.3 },
    { position: [-1.9, 3.1, -3.0], scale: 0.09, color: C.cream, kind: "ico", speed: 0.6 },
  ];

  const group = new THREE.Group();
  const floaters: Floater[] = [];

  definitions.forEach((definition) => {
    const geometry =
      definition.kind === "ico"
        ? new THREE.IcosahedronGeometry(1, 0)
        : definition.kind === "tetra"
          ? new THREE.TetrahedronGeometry(1, 0)
          : new THREE.TorusGeometry(0.8, 0.32, 8, 16);

    const mesh = new THREE.Mesh(geometry, toon(definition.color));
    mesh.position.set(...definition.position);
    mesh.scale.setScalar(definition.scale);
    group.add(mesh);
    floaters.push({ mesh, baseY: definition.position[1], speed: definition.speed });
  });

  scene.add(group);
  return { group, floaters };
}

function addMotes(scene: THREE.Object3D) {
  const count = 180;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 9;
    positions[i * 3 + 1] = Math.random() * 4.5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    size: 0.018,
    color: C.accent,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(geometry, material);
  scene.add(points);
  return points;
}

/* ------------------------------------------------------------------ */
/* component                                                           */
/* ------------------------------------------------------------------ */

export default function HeroScene({
  paused = false,
  reduced = false,
  onReady,
}: {
  paused?: boolean;
  reduced?: boolean;
  onReady?: () => void;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  const reducedRef = useRef(reduced);
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog("#070708", 8, 22);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1.0));

    const key = new THREE.DirectionalLight(0xfff0da, 2.1);
    key.position.set(4, 6, 3);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0x7f9dff, 0.55);
    rim.position.set(-5, 3, -2);
    scene.add(rim);

    const grid = new THREE.GridHelper(40, 40, 0x2a3a4a, 0x131a22);
    grid.position.y = -0.02;
    const gridMaterial = grid.material as THREE.Material;
    gridMaterial.transparent = true;
    gridMaterial.opacity = 0.32;
    scene.add(grid);

    const world = new THREE.Group();
    scene.add(world);

    addDesk(world);
    const screenTexture = makeScreenTexture();
    addMonitor(world, screenTexture);
    addKeyboard(world);
    addMug(world);
    addPlant(world);
    addLamp(world);
    const robot = addRobot(world);

    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(2.2, 32),
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
      }),
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.02;
    shadow.scale.set(1.4, 0.7, 1);
    world.add(shadow);

    const { group: shapeGroup, floaters } = addFloatingShapes(scene);
    const motes = addMotes(scene);

    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onPointerMove = (event: PointerEvent) => {
      target.x = (event.clientX / window.innerWidth) * 2 - 1;
      target.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const resize = () => {
      const width = mount.clientWidth || 1;
      const height = mount.clientHeight || 1;
      const compact = width < 820;

      camera.aspect = width / height;
      camera.position.set(0, compact ? 2.9 : 2.25, compact ? 9.6 : 7.9);
      camera.lookAt(0, 1.15, 0);
      camera.updateProjectionMatrix();

      world.scale.setScalar(compact ? 0.8 : 1);
      world.position.y = compact ? 0.15 : 0;

      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, compact ? 1.25 : 1.6),
      );
      renderer.setSize(width, height, false);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    const clock = new THREE.Clock();

    const update = (dt: number, time: number) => {
      pointer.x = THREE.MathUtils.damp(pointer.x, target.x, 3, dt);
      pointer.y = THREE.MathUtils.damp(pointer.y, target.y, 3, dt);

      world.rotation.y = pointer.x * 0.16;
      world.rotation.x = -pointer.y * 0.05;

      robot.group.position.y = 0.9 + Math.sin(time * 1.5) * 0.018;
      robot.head.rotation.y = THREE.MathUtils.damp(
        robot.head.rotation.y,
        pointer.x * 0.5,
        4,
        dt,
      );
      robot.head.rotation.x = THREE.MathUtils.damp(
        robot.head.rotation.x,
        -pointer.y * 0.22,
        4,
        dt,
      );

      const envelope = 1 - THREE.MathUtils.smoothstep(time, 2.8, 4.2);
      robot.armRight.rotation.z =
        -0.16 - envelope * (1.55 + Math.sin(time * 11) * 0.22);
      robot.armLeft.rotation.z = 0.16 + Math.sin(time * 1.5) * 0.05;
      robot.antenna.rotation.z = Math.sin(time * 2) * 0.12;

      screenTexture.offset.y = Math.sin(time * 0.25) * 0.004;

      shapeGroup.rotation.y += dt * 0.03;
      floaters.forEach((floater, i) => {
        floater.mesh.rotation.x += dt * floater.speed * 0.5;
        floater.mesh.rotation.y += dt * floater.speed * 0.35;
        floater.mesh.position.y =
          floater.baseY + Math.sin(time * 0.6 + i) * 0.12;
      });

      motes.rotation.y = time * 0.02;
    };

    let frame = 0;
    let firstFramePainted = false;

    const renderFirstFrame = () => {
      update(0, clock.elapsedTime);
      renderer.render(scene, camera);
      if (!firstFramePainted) {
        firstFramePainted = true;
        onReadyRef.current?.();
      }
    };

    const loop = () => {
      frame = requestAnimationFrame(loop);
      if (pausedRef.current) {
        // Still paint one frame so the skeleton can be replaced even when
        // the hero starts off-screen.
        if (!firstFramePainted) renderFirstFrame();
        return;
      }
      const delta = Math.min(clock.getDelta(), 0.05);
      update(delta, clock.elapsedTime);
      renderer.render(scene, camera);
      if (!firstFramePainted) {
        firstFramePainted = true;
        onReadyRef.current?.();
      }
    };

    if (reducedRef.current) {
      renderer.render(scene, camera);
      firstFramePainted = true;
      onReadyRef.current?.();
    } else {
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      screenTexture.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry?.dispose();
          const material = object.material;
          if (Array.isArray(material)) material.forEach((m) => m.dispose());
          else material?.dispose();
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" />;
}
