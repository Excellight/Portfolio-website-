
import * as THREE from
  "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js";

  export class Lighting {
    constructor(scene) {
        this.scene = scene;

            this.ambient = new THREE.HemisphereLight(
                  "#c6e5f5",
                        "#071522",
                              0.8
                                  );

                                      this.scene.add(this.ambient);

                                          this.moon = new THREE.DirectionalLight(
                                                "#b9dcf5",
                                                      2.5
                                                          );

                                                              this.moon.position.set(-12, 25, -10);
                                                                  this.scene.add(this.moon);

                                                                      this.reflectionLight = new THREE.PointLight(
                                                                            "#39b9d4",
                                                                                  18,
                                                                                        90
                                                                                            );

                                                                                                this.reflectionLight.position.set(0, 4, -12);
                                                                                                    this.scene.add(this.reflectionLight);

                                                                                                        this.secondaryLight = new THREE.PointLight(
                                                                                                              "#638fc5",
                                                                                                                    12,
                                                                                                                          100
                                                                                                                              );

                                                                                                                                  this.secondaryLight.position.set(18, 6, -35);
                                                                                                                                      this.scene.add(this.secondaryLight);
                                                                                                                                        }
                                                                                                                                        }
                                                                                                                                        