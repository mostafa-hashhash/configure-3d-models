import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { setupLighting, setupScene, createPartNode, getSlectedParts } from "./utils";

let scene = setupScene();
setupLighting(scene);

let LoadedModel = null;

const loader = new GLTFLoader();
const model = document.querySelector("#model");

model.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  loader.load(url, (gltf) => {
    LoadedModel = gltf.scene;
    scene.add(LoadedModel);

    let partsFragment = document.createDocumentFragment();

    LoadedModel.children.forEach((part) => {
      partsFragment.appendChild(createPartNode(part));
    });

    document.querySelector(".parts").appendChild(partsFragment);
  });
});

document.querySelector(".apply-btn").onclick = () => {
  let selectedPartsIDs = getSlectedParts();

  let selectedColor = document.querySelector("#color").value;

  let textureFile = document.querySelector("#material").files[0];
  let textureURL = textureFile ? URL.createObjectURL(textureFile) : null;

  let materialObject = {};
  materialObject.color = selectedColor;
  if (textureURL && textureFile) materialObject.map = new THREE.TextureLoader().load(textureURL);
  console.log(textureURL && textureFile);
  LoadedModel.children
    .filter((child) => selectedPartsIDs.includes(child.name))
    .forEach((part) => {
      const newMaterial = new THREE.MeshStandardMaterial(materialObject);
      part.material = newMaterial;
    });
};
