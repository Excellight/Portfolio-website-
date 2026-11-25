
import * as THREE from
  "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js";

  import { createScene } from "./Scene.js";
  import { CameraController } from "./CameraController.js";
  import { DeviceManager } from "./DeviceManager.js";
  import { Water } from "./Water.js";
  import { Lighting } from "./Lighting.js";
  import { Atmosphere } from "./Atmosphere.js";
  import { StoneGenerator } from "./StoneGenerator.js";

  export class LitexWorld {
    constructor(container) {
        this.container = container;

            this.device = new DeviceManager();
                this.settings = this.device.getSettings();

                    // Create the scene
                        this.scene = createScene();

                            // Environment systems
                                this.lighting = new Lighting(this.scene);
                                    this.atmosphere = new Atmosphere(this.scene);
                                        this.water = new Water(this.scene);

                                            // Create the first stone
                                                this.stones = new StoneGenerator(this.scene);

                                                    this.firstStone = this.stones.createStone({
                                                          position: [0, -0.65, -8],
                                                                scale: [1, 1, 1]
                                                                    });

                                                                        // Camera
                                                                            this.camera = new THREE.PerspectiveCamera(
                                                                                  50,
                                                                                        window.innerWidth / window.innerHeight,
                                                                                              0.1,
                                                                                                    1000
                                                                                                        );

                                                                                                            this.cameraController =
                                                                                                                  new CameraController(this.camera);

                                                                                                                      // Renderer
                                                                                                                          this.renderer = new THREE.WebGLRenderer({
                                                                                                                                antialias: !this.settings.isMobile,
                                                                                                                                      alpha: false,
                                                                                                                                            powerPreference: "high-performance"
                                                                                                                                                });

                                                                                                                                                    this.renderer.setPixelRatio(
                                                                                                                                                          this.settings.pixelRatio
                                                                                                                                                              );

                                                                                                                                                                  this.renderer.setSize(
                                                                                                                                                                        this.container.clientWidth,
                                                                                                                                                                              this.container.clientHeight
                                                                                                                                                                                  );

                                                                                                                                                                                      this.renderer.outputColorSpace =
                                                                                                                                                                                            THREE.SRGBColorSpace;

                                                                                                                                                                                                this.renderer.toneMapping =
                                                                                                                                                                                                      THREE.ACESFilmicToneMapping;

                                                                                                                                                                                                          this.renderer.toneMappingExposure = 1.15;

                                                                                                                                                                                                              this.container.appendChild(
                                                                                                                                                                                                                    this.renderer.domElement
                                                                                                                                                                                                                        );

                                                                                                                                                                                                                            this.running = false;
                                                                                                                                                                                                                                this.animationFrameId = null;

                                                                                                                                                                                                                                    this.handleResize = this.handleResize.bind(this);
                                                                                                                                                                                                                                        this.animate = this.animate.bind(this);

                                                                                                                                                                                                                                            window.addEventListener(
                                                                                                                                                                                                                                                  "resize",
                                                                                                                                                                                                                                                        this.handleResize
                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                                                handleResize() {
                                                                                                                                                                                                                                                                    const width = this.container.clientWidth;
                                                                                                                                                                                                                                                                        const height = this.container.clientHeight;

                                                                                                                                                                                                                                                                            if (!width || !height) return;

                                                                                                                                                                                                                                                                                this.camera.aspect = width / height;
                                                                                                                                                                                                                                                                                    this.camera.updateProjectionMatrix();

                                                                                                                                                                                                                                                                                        this.renderer.setSize(width, height);
                                                                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                                                                            start() {
                                                                                                                                                                                                                                                                                                if (this.running) return;

                                                                                                                                                                                                                                                                                                    this.running = true;

                                                                                                                                                                                                                                                                                                        if (this.settings.reducedMotion) {
                                                                                                                                                                                                                                                                                                              this.renderer.render(this.scene, this.camera);
                                                                                                                                                                                                                                                                                                                    return;
                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                            this.animate();
                                                                                                                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                                                                                                                animate() {
                                                                                                                                                                                                                                                                                                                                    if (!this.running) return;

                                                                                                                                                                                                                                                                                                                                        this.animationFrameId =
                                                                                                                                                                                                                                                                                                                                              requestAnimationFrame(this.animate);

                                                                                                                                                                                                                                                                                                                                                  const time = performance.now() * 0.001;

                                                                                                                                                                                                                                                                                                                                                      this.water.update(time);
                                                                                                                                                                                                                                                                                                                                                          this.atmosphere.update(time);

                                                                                                                                                                                                                                                                                                                                                              this.renderer.render(
                                                                                                                                                                                                                                                                                                                                                                    this.scene,
                                                                                                                                                                                                                                                                                                                                                                          this.camera
                                                                                                                                                                                                                                                                                                                                                                              );
                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                  stop() {
                                                                                                                                                                                                                                                                                                                                                                                      this.running = false;

                                                                                                                                                                                                                                                                                                                                                                                          if (this.animationFrameId !== null) {
                                                                                                                                                                                                                                                                                                                                                                                                cancelAnimationFrame(this.animationFrameId);
                                                                                                                                                                                                                                                                                                                                                                                                      this.animationFrameId = null;
                                                                                                                                                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                                                              destroy() {
                                                                                                                                                                                                                                                                                                                                                                                                                  this.stop();

                                                                                                                                                                                                                                                                                                                                                                                                                      window.removeEventListener(
                                                                                                                                                                                                                                                                                                                                                                                                                            "resize",
                                                                                                                                                                                                                                                                                                                                                                                                                                  this.handleResize
                                                                                                                                                                                                                                                                                                                                                                                                                                      );

                                                                                                                                                                                                                                                                                                                                                                                                                                          this.atmosphere.dispose();
                                                                                                                                                                                                                                                                                                                                                                                                                                              this.stones.dispose();
                                                                                                                                                                                                                                                                                                                                                                                                                                                  this.water.dispose();

                                                                                                                                                                                                                                                                                                                                                                                                                                                      this.renderer.dispose();
                                                                                                                                                                                                                                                                                                                                                                                                                                                          this.renderer.domElement.remove();
                                                                                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                                                                            