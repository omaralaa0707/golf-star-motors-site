"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useMemo, useRef, useState, useEffect, Suspense } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/use-browser";

/**
 * Signature technique for this site: a GLSL displacement dissolve between
 * photographs, driven by scroll progress. Two textures are sampled with the
 * UVs pushed apart by a noise field, so one frame melts into the next instead
 * of cross-fading — closer to the way their own posts cut between cars.
 */

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform sampler2D uFrom;
  uniform sampler2D uTo;
  uniform float uProgress;
  uniform float uTime;
  uniform vec2 uFromScale;
  uniform vec2 uToScale;
  varying vec2 vUv;

  // Cheap value noise — enough texture to break the dissolve edge up.
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  // Cover-fit: keep photographs from stretching on wide viewports.
  vec2 cover(vec2 uv, vec2 scale) {
    return (uv - 0.5) * scale + 0.5;
  }

  void main() {
    float n = noise(vUv * 5.5 + uTime * 0.04);
    float p = smoothstep(0.0, 1.0, uProgress);

    // Push the two frames apart along the noise gradient as they swap.
    vec2 shift = vec2(n - 0.5) * 0.28;
    vec2 uvFrom = cover(vUv + shift * p, uFromScale);
    vec2 uvTo = cover(vUv - shift * (1.0 - p), uToScale);

    vec4 from = texture2D(uFrom, uvFrom);
    vec4 to = texture2D(uTo, uvTo);

    // Noise-thresholded wipe rather than a linear fade.
    float edge = smoothstep(p - 0.28, p + 0.28, n);
    vec4 color = mix(to, from, edge);

    // Warm the mix toward the brand gold at the moment of transition.
    float heat = (1.0 - abs(p - 0.5) * 2.0) * 0.16;
    color.rgb += vec3(0.83, 0.65, 0.22) * heat;

    gl_FragColor = color;
  }
`;

function Plane({
  urls,
  progressRef,
}: {
  urls: string[];
  progressRef: React.RefObject<number>;
}) {
  const textures = useLoader(THREE.TextureLoader, urls);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const [size, setSize] = useState<[number, number]>([1, 1]);

  useEffect(() => {
    textures.forEach((t) => {
      t.minFilter = THREE.LinearFilter;
      t.generateMipmaps = false;
    });
  }, [textures]);

  const uniforms = useMemo(
    () => ({
      uFrom: { value: textures[0] },
      uTo: { value: textures[1] ?? textures[0] },
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uFromScale: { value: new THREE.Vector2(1, 1) },
      uToScale: { value: new THREE.Vector2(1, 1) },
    }),
    [textures]
  );

  useFrame((state, delta) => {
    const m = mat.current;
    if (!m) return;
    m.uniforms.uTime.value += delta;

    // Scroll progress maps across the whole set: 0 → first pair, 1 → last.
    const t = (progressRef.current ?? 0) * (textures.length - 1);
    const i = Math.min(Math.floor(t), textures.length - 2);
    m.uniforms.uFrom.value = textures[i];
    m.uniforms.uTo.value = textures[i + 1];
    m.uniforms.uProgress.value = t - i;

    const { width, height } = state.viewport;
    if (width !== size[0] || height !== size[1]) setSize([width, height]);

    // Recompute cover scale for whichever pair is on screen.
    const fit = (tex: THREE.Texture) => {
      const img = tex.image as { width: number; height: number } | undefined;
      if (!img?.width) return new THREE.Vector2(1, 1);
      const planeAspect = width / height;
      const imgAspect = img.width / img.height;
      return imgAspect > planeAspect
        ? new THREE.Vector2(planeAspect / imgAspect, 1)
        : new THREE.Vector2(1, imgAspect / planeAspect);
    };
    m.uniforms.uFromScale.value = fit(textures[i]);
    m.uniforms.uToScale.value = fit(textures[i + 1]);
  });

  return (
    <mesh scale={[size[0], size[1], 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function SceneMorph({
  urls,
  progressRef,
  className,
  poster,
}: {
  urls: string[];
  progressRef: React.RefObject<number>;
  className?: string;
  /** Shown instead of WebGL when motion is reduced. */
  poster: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={className}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={poster} alt="" className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div className={className}>
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        dpr={[1, 1.6]}
        gl={{ antialias: false }}
      >
        <Suspense fallback={null}>
          <Plane urls={urls} progressRef={progressRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
