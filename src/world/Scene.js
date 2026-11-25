
import * as THREE from
  "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js";

  export function createScene() {
    const scene = new THREE.Scene();

      scene.background = new THREE.Color("#071522");

        scene.fog = new THREE.FogExp2(
            "#071522",
                0.018
                  );

                    // Soft environmental light
                      const ambientLight = new THREE.HemisphereLight(
                          "#b8d8ed",
                              "#101d29",
                                  1.1
                                    );

                                      scene.add(ambientLight);

                                        // Moonlight from above and ahead
                                          const moonLight = new THREE.DirectionalLight(
                                              "#b9dcf5",
                                                  2.2
                                                    );

                                                      moonLight.position.set(-8, 14, 6);

                                                        scene.add(moonLight);

                                                          return scene;
                                                          }
                                                          