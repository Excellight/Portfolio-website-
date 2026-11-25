
export class DeviceManager {
  constructor() {
      this.isMobile =
            window.matchMedia("(max-width: 768px)").matches ||
                  /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

                      this.reducedMotion =
                            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

                                this.pixelRatio = Math.min(
                                      window.devicePixelRatio || 1,
                                            this.isMobile ? 1.5 : 2
                                                );

                                                    this.quality = this.isMobile ? "low" : "high";
                                                      }

                                                        getSettings() {
                                                            return {
                                                                  isMobile: this.isMobile,
                                                                        reducedMotion: this.reducedMotion,
                                                                              pixelRatio: this.pixelRatio,
                                                                                    quality: this.quality
                                                                                        };
                                                                                          }
                                                                                          }
                                                                                          