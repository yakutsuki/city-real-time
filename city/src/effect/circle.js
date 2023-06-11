import { Cylinder } from "./cylinder";
import { color } from "../config";

export class Circle {
  constructor(scene, time) {
    this.config = {
      radius: 80,
      height: 1,
      opacity: 0.6,
      color: color.circle,
      open: false,
      position: {
        x: 300,
        y: 0,
        z: 300,
      },
      speed: 2.0,
    };

    new Cylinder(scene, time).createCylinder(this.config);
  }
}
