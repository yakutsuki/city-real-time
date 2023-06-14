// 烟雾预警 粒子
import * as THREE from "three";

export class Smoke {
  constructor(scene) {
    this.scene = scene;

    this.smokes = [];

    this.init();
  }

  init() {
    // 粒子初始化 空的缓冲几何体
    this.geometry = new THREE.BufferGeometry();

    this.material = new THREE.PointsMaterial({
      size: 50,
      map: new THREE.TextureLoader().load("../../src/assets/smoke.png"),
      transparent: true,
      depthWrite: false, // 禁止深度写入
    });
  }
}
