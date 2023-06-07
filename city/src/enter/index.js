import * as THREE from "three";
import { City } from "./city";

export const initCity = () => {
  // 获取canvas元素
  const canvas = document.getElementById("webgl");

  // 创建场景
  const scene = new THREE.Scene();

  // 创建相机
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    100000
  );
  camera.position.set(0, 0, 10);
  scene.add(camera);

  // 添加灯光
  scene.add(new THREE.AmbientLight(0xadadad));
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 0, 0);
  scene.add(directionalLight);

  // 创建渲染器
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 设置像素比
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // 设置场景色
  renderer.setClearColor(new THREE.Color(0x000000), 1);

  const city = new City();

  const start = () => {
    city.start();

    renderer.render(scene, camera);

    requestAnimationFrame(start);
  };

  window.addEventListener("resize", () => {
    // 更新相机的投影矩阵
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    // 更新渲染器的尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
};
