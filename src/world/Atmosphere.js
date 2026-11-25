
import * as THREE from
  "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js";

  export class Atmosphere {
    constructor(scene) {
        this.scene = scene;
            this.clouds = [];

                this.material = new THREE.MeshBasicMaterial({
                      color: "#9bbbd0",
                            transparent: true,
                                  opacity: 0.075,
                                        depthWrite: false
                                            });

                                                this.createClouds();
                                                  }

                                                    createClouds() {
                                                        const cloudPositions = [
                                                              [-35, 13, -45],
                                                                    [25, 16, -65],
                                                                          [-65, 11, -95],
                                                                                [60, 14, -120],
                                                                                      [0, 18, -150],
                                                                                            [85, 12, -185]
                                                                                                ];

                                                                                                    cloudPositions.forEach((position, index) => {
                                                                                                          const group = new THREE.Group();

                                                                                                                const cloudParts = 5 + (index % 3);

                                                                                                                      for (let i = 0; i < cloudParts; i++) {
                                                                                                                              const geometry = new THREE.SphereGeometry(
                                                                                                                                        1,
                                                                                                                                                  12,
                                                                                                                                                            10
                                                                                                                                                                    );

                                                                                                                                                                            const cloud = new THREE.Mesh(
                                                                                                                                                                                      geometry,
                                                                                                                                                                                                this.material
                                                                                                                                                                                                        );

                                                                                                                                                                                                                cloud.position.set(
                                                                                                                                                                                                                          (Math.random() - 0.5) * 7,
                                                                                                                                                                                                                                    Math.random() * 1.2,
                                                                                                                                                                                                                                              (Math.random() - 0.5) * 3
                                                                                                                                                                                                                                                      );

                                                                                                                                                                                                                                                              cloud.scale.set(
                                                                                                                                                                                                                                                                        2.5 + Math.random() * 2,
                                                                                                                                                                                                                                                                                  0.7 + Math.random() * 0.5,
                                                                                                                                                                                                                                                                                            1.4 + Math.random()
                                                                                                                                                                                                                                                                                                    );

                                                                                                                                                                                                                                                                                                            group.add(cloud);
                                                                                                                                                                                                                                                                                                                  }

                                                                                                                                                                                                                                                                                                                        group.position.set(...position);

                                                                                                                                                                                                                                                                                                                              this.scene.add(group);
                                                                                                                                                                                                                                                                                                                                    this.clouds.push(group);
                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                                                                                                                            update(time) {
                                                                                                                                                                                                                                                                                                                                                this.clouds.forEach((cloud, index) => {
                                                                                                                                                                                                                                                                                                                                                      cloud.position.x +=
                                                                                                                                                                                                                                                                                                                                                              Math.sin(time * 0.025 + index) * 0.003;
                                                                                                                                                                                                                                                                                                                                                                  });
                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                      dispose() {
                                                                                                                                                                                                                                                                                                                                                                          this.clouds.forEach(cloud => {
                                                                                                                                                                                                                                                                                                                                                                                cloud.children.forEach(mesh => {
                                                                                                                                                                                                                                                                                                                                                                                        mesh.geometry.dispose();
                                                                                                                                                                                                                                                                                                                                                                                              });

                                                                                                                                                                                                                                                                                                                                                                                                    this.scene.remove(cloud);
                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                            this.material.dispose();
                                                                                                                                                                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                                                                                                                                                                              