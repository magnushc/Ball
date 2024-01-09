import * as THREE from "three";
import "./style.css";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

//Scene
const scene = new THREE.Scene();

//Create our sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);

//Create our material
const material = new THREE.MeshStandardMaterial({
  color: "#E0218A",
  roughness: 0.1,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//Light
const light = new THREE.PointLight(0xffffff, 100, 0, 1.7);
light.position.set(0, 10, 10);
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 20;
scene.add(camera);

//Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

//Resize
window.addEventListener("resize", () => {
  //Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

//Timeline magiccc
const tl = gsap.timeline({ defaults: { duration: 1 } });

tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 })
  .fromTo("nav", { y: "-100%" }, { y: "0%" })
  .fromTo(".title", { opacity: 0 }, { opacity: 1 });

//Mouse Animation Colorrrr
// let mouseDown = false;
// let rgb = [0];

// window.addEventListener("mousedown", (e) => {
//   mouseDown = true
//   console.log('dasdd')
//   rgb = [
//     Math.round((e.pageX / sizes.width) * 255),
//     Math.round((e.pageY / sizes.height) * 255),
//     150,
//   ];
//   let newColor = new THREE.Color(`rgb(${rgb.join(",")}})`);

//   console.log('newColor', newColor)
//   gsap.to(mesh.material.color, {r:newColor.r, g:newColor.g, b:newColor.b})
// });

// window.addEventListener("mouseup", () => {
//   mouseDown = false
// });

// window.addEventListener("mousemove", (e) => {
//   if (mouseDown) {
//     rgb = [
//       Math.round((e.pageX / sizes.width) * 255),
//       Math.round((e.pageY / sizes.height) * 255),
//       150,
//     ];
//     let newColor = new THREE.Color(`rgb(${rgb.join(",")}})`);
//     gsap.to(mesh.material.color, {r:newColor.r, g:newColor.g, b:newColor.b})
//   }
// });
