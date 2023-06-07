import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

const loader = new FBXLoader();
export const loadFBX = (url) => {
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (object) => {
        resolve(object);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        reject(error);
      }
    );
  });
};
