/* LITEX — SUNLIT COAST WATER
   Complete replacement for the ROOT water.js file.
   Keep beside index.html. */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js";

const canvas = document.getElementById("water-canvas");

if (!canvas) {
  console.warn("Litex: #water-canvas was not found.");
} else {
  let renderer;

  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: "low-power"
    });
  } catch (error) {
    console.warn("Litex: WebGL unavailable; CSS beach background remains visible.", error);
  }

  if (renderer) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      48, window.innerWidth / window.innerHeight, 0.1, 100
    );

    camera.position.set(0, 7, 9);
    camera.lookAt(0, 0, 0);

    const mobile = window.innerWidth < 768;

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.5)
    );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    /* Gentle wave movement */
    const vertexShader = `
      uniform float uTime;
      varying vec2 vUv;
      varying float vWave;

      void main() {
        vUv = uv;
        vec3 pos = position;

        float a = sin(pos.x * 0.42 + uTime * 0.38) * 0.13;
        float b = sin(pos.y * 0.58 - uTime * 0.28) * 0.085;
        float c = sin((pos.x + pos.y) * 0.20 + uTime * 0.20) * 0.055;
        float wave = a + b + c;

        pos.z += wave;
        vWave = wave;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    /* Clear turquoise shallows, coastal teal and warm sun glints */
    const fragmentShader = `
      uniform float uTime;
      uniform vec4 uRipples[6];

      varying vec2 vUv;
      varying float vWave;

      void main() {
        vec3 shallow = vec3(0.48, 0.76, 0.68);
        vec3 aqua = vec3(0.20, 0.61, 0.58);
        vec3 teal = vec3(0.075, 0.39, 0.42);

        float depth = smoothstep(0.04, 0.96, vUv.y);
        vec3 color = mix(shallow, aqua, smoothstep(0.0, 0.58, depth));
        color = mix(color, teal, smoothstep(0.48, 1.0, depth) * 0.58);

        float p1 = sin(vUv.x * 39.0 + uTime * 0.30) *
                   sin(vUv.y * 25.0 - uTime * 0.22);
        float p2 = sin(vUv.x * 71.0 - uTime * 0.18) *
                   sin(vUv.y * 43.0 + uTime * 0.24);

        float shimmer = smoothstep(0.48, 0.94, p1 * 0.62 + p2 * 0.38);
        vec3 goldSun = vec3(1.0, 0.88, 0.65);
        vec3 bright = vec3(1.0, 0.97, 0.84);

        color += goldSun * shimmer * 0.17;
        color += vec3(0.12, 0.23, 0.20) * abs(vWave);

        float caustic = sin(vUv.x * 88.0 + uTime * 0.42) *
                        sin(vUv.y * 66.0 - uTime * 0.34);
        caustic = smoothstep(0.55, 0.96, caustic);
        color += bright * caustic * 0.075;

        float rippleLight = 0.0;
        for (int i = 0; i < 6; i++) {
          vec4 ripple = uRipples[i];
          float age = uTime - ripple.z;

          if (age >= 0.0 && age < 3.0) {
            float d = distance(vUv, ripple.xy);
            float ring = abs(d - age * 0.13);
            float fade = 1.0 - age / 3.0;
            rippleLight += exp(-ring * 105.0) * fade * ripple.w;
          }
        }

        color += bright * rippleLight * 0.30;

        /* Translucency lets the warm beach background show through */
        float opacity = mix(0.22, 0.46, smoothstep(0.0, 1.0, depth));
        opacity += shimmer * 0.035;
        opacity += rippleLight * 0.08;
        opacity = clamp(opacity, 0.18, 0.52);

        gl_FragColor = vec4(color, opacity);
      }
    `;

    const rippleSlots = Array.from(
      { length: 6 },
      () => new THREE.Vector4(-2, -2, -10, 0)
    );

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uRipples: { value: rippleSlots }
      },
      vertexShader,
      fragmentShader
    });

    const geometry = new THREE.PlaneGeometry(
      45, 45, mobile ? 80 : 130, mobile ? 80 : 130
    );

    const water = new THREE.Mesh(geometry, material);
    water.rotation.x = -Math.PI / 2;
    scene.add(water);

    /* Tap/click ripples; don't interfere with links or buttons */
    let rippleIndex = 0;

    function createRipple(event) {
      const target = event.target;
      if (
        target instanceof Element &&
        target.closest("a, button, input, textarea, select, [role='dialog']")
      ) return;

      rippleSlots[rippleIndex].set(
        event.clientX / window.innerWidth,
        1 - event.clientY / window.innerHeight,
        material.uniforms.uTime.value,
        1
      );

      rippleIndex = (rippleIndex + 1) % 6;
    }

    window.addEventListener("pointerdown", createRipple, { passive: true });

    function resizeWater() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1 : 1.5)
      );
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("resize", resizeWater);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const clock = new THREE.Clock();
    let frameId = null;

    function renderFrame() {
      material.uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    }

    function animate() {
      frameId = null;
      if (document.hidden) return;

      renderFrame();
      if (!reducedMotion) frameId = requestAnimationFrame(animate);
    }

    animate();

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        if (frameId !== null) cancelAnimationFrame(frameId);
        frameId = null;
      } else if (!reducedMotion && frameId === null) {
        clock.start();
        animate();
      } else if (reducedMotion) {
        renderFrame();
      }
    });

    window.addEventListener("pagehide", () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resizeWater);
      window.removeEventListener("pointerdown", createRipple);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    }, { once: true });
  }
}
