import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function createPartNode(part) {
  let partNode = document.createElement("div");

  let partCheckBox = document.createElement("input");
  partCheckBox.id = part.name;
  partCheckBox.type = "checkbox";
  partCheckBox.name = "parts";

  let partLabel = document.createElement("label");
  partLabel.innerHTML = part.name;

  partNode.appendChild(partCheckBox);
  partNode.appendChild(partLabel);
  partNode.classList.add("part");

  return partNode;
}

function setupLighting(scene) {
  const pointLightTop = new THREE.PointLight(0xffffff);
  pointLightTop.position.set(4, 2.5, 0);

  const pointLightBottom = new THREE.PointLight(0xffffff);
  pointLightBottom.position.set(-4, -2.5, 0);

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(pointLightTop, pointLightBottom, ambientLight);
}

function setupScene() {
  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth / (4 / 3), window.innerHeight / (4 / 3));

  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(3, 4, 3);

  renderer.render(scene, camera);

  const gridHelper = new THREE.GridHelper(10, 10, 0xffffff, 0x000fff);
  const controls = new OrbitControls(camera, renderer.domElement);
  scene.add(gridHelper);

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  return scene;
}

function getSlectedParts() {
  return Array.from(document.querySelectorAll("input[type=checkbox]"))
    .filter((box) => box.checked)
    .map((part) => part.id);
}

export { createPartNode, setupScene, setupLighting, getSlectedParts };
