import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { loadFBX } from "../utils";
import { SurroundLine } from "../effect/surroundLine";
import { Background } from "../effect/background";
import { Radar } from "../effect/radar";
import { Wall } from "../effect/wall";
import { Circle } from "../effect/circle";
import { Ball } from "../effect/ball";
import { Cone } from "../effect/cone";

export class City {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.tweenPosition = null;
    this.tweenRotation = null;

    this.height = {
      value: 5,
    };

    this.top = {
      value: 5,
    };
    this.flag = false;

    this.time = {
      value: 0,
    };

    this.loadCity();
  }

  loadCity() {
    // 加载模型，并渲染到场景中
    loadFBX("/src/model/beijing.fbx").then((object) => {
      object.traverse((child) => {
        if (child.isMesh) {
          new SurroundLine(this.scene, child, this.height, this.time);
        }
      });
      this.initEffect();
    });
  }

  initEffect() {
    new Background(this.scene);

    new Radar(this.scene, this.time);

    new Wall(this.scene, this.time);

    new Circle(this.scene, this.time);

    new Ball(this.scene, this.time);

    new Cone(this.scene, this.top, this.height);

    // 添加点击选择
    this.addClick();
  }

  addClick() {
    let flag = true;

    document.onmousedown = () => {
      flag = true;

      document.onmousemove = () => {
        flag = false;
      };
    };

    document.onmouseup = (event) => {
      if (flag) {
        this.clickEvent(event);
      }
      document.onmousemove = null;
    };
  }

  clickEvent(event) {
    // 获取设备坐标
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;

    // 创建设备坐标 （三维）
    const standardVector = new THREE.Vector3(x, y, 0.5);

    // 转换为世界坐标
    const worldVector = standardVector.unproject(this.camera);

    // 做序列化
    const ray = worldVector.sub(this.camera.position).normalize();

    // 创建射线
    const raycaster = new THREE.Raycaster(this.camera.position, ray);

    // 获取射线碰撞的对象
    const intersects = raycaster.intersectObjects(this.scene.children, true);

    let point3d = null;
    if (intersects.length) {
      point3d = intersects[0];
    }
    console.log("point3d", point3d);
    if (point3d) {
      // 开始动画来修改观察点
      const time = 1000;
      const proportion = 3;

      this.tweenPosition = new TWEEN.Tween(this.camera.position)
        .to(
          {
            x: point3d.point.x * proportion,
            y: point3d.point.y * proportion,
            z: point3d.point.z * proportion,
          },
          time
        )
        .start();

      this.tweenRotation = new TWEEN.Tween(this.camera.rotation)
        .to(
          {
            x: this.camera.rotation.x,
            y: this.camera.rotation.y,
            z: this.camera.rotation.z,
          },
          time
        )
        .start();
    }
  }

  start(delta) {
    this.tweenPosition && this.tweenPosition.update();
    this.tweenRotation && this.tweenRotation.update();

    this.time.value += delta;

    this.height.value += 0.4;
    if (this.height.value > 160) {
      this.height.value = 5;
    }
    if (this.top.value > 15 || this.top.value < 0) {
      this.flag = !this.flag;
    }
    this.top.value += this.flag ? -0.8 : 0.8;
  }
}
