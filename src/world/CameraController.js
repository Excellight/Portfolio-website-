
import * as THREE from
  "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js";

  export class CameraController {
    constructor(camera) {
        this.camera = camera;

            this.position = new THREE.Vector3(
                  0,
                        8,
                              15
                                  );

                                      this.target = new THREE.Vector3(
                                            0,
                                                  0,
                                                        -5
                                                            );

                                                                this.camera.position.copy(this.position);
                                                                    this.camera.lookAt(this.target);
                                                                      }

                                                                        focusOn(position) {
                                                                            this.target.copy(position);
                                                                                this.camera.lookAt(this.target);
                                                                                  }

                                                                                    setPosition(position) {
                                                                                        this.position.copy(position);
                                                                                            this.camera.position.copy(this.position);
                                                                                                this.camera.lookAt(this.target);
                                                                                                  }
                                                                                                  }
                                                                                                  