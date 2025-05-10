import * as THREE from "three";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { RGBShiftShader } from "three/addons/shaders/RGBShiftShader.js";
import { FilmPass } from "three/addons/postprocessing/FilmPass.js";
import { BloomPass } from "three/addons/postprocessing/BloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const bgTexture = textureLoader.load("./images/text-image.png", (text) => {
  text.mapping = THREE.EquirectangularReflectionMapping;
});
// bgTexture.mapping = THREE.EquirectangularRefractionMapping;
// bgTexture.wrapS = THREE.RepeatWrapping;
// scene.background = bgTexture;

const fov = 86;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(100, 0, 100);

// Enhanced lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 2, 100);
pointLight.position.set(0, 50, 0);
scene.add(pointLight);

// Add a subtle hemisphere light for more natural illumination
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
hemisphereLight.position.set(0, 50, 0);
scene.add(hemisphereLight);
//
const controls = new OrbitControls(camera, renderer.domElement);
controls.listenToKeyEvents(window);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = false;
controls.minDistance = 100;
controls.maxDistance = 500;
controls.maxPolarAngle = Math.PI / 2;

// Post-processing setup for chromatic dispersion
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
const bloomPass = new BloomPass(1, 20, 0.2, 500);
const filmPass = new FilmPass(8, false);
const outputPass = new OutputPass();
composer.addPass(renderPass);
composer.addPass(filmPass);
composer.addPass(bloomPass);
composer.addPass(outputPass);

// Chromatic aberration effect
// const rgbShiftPass = new ShaderPass(RGBShiftShader);
// rgbShiftPass.uniforms["amount"].value = 0.001; // subtle dispersion effect
// composer.addPass(rgbShiftPass);

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("./three/examples/jsm/libs/draco/gltf/");
const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

loader.load("./images/glb/S7_Disepersion.glb", function (gltf) {
  const image = gltf.scene.children[0];

  image.traverse((child) => {
    if (child.isMesh) {
      // Create glass-like material
      child.material = new THREE.MeshPhysicalMaterial({
        // color: 0xffffff,
        transmission: 0.9, // Glass transmission
        roughness: 0.1,
        metalness: 2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        ior: 50, // Index of refraction (glass is ~1.5)
        // thickness: 0.5,
        envMap: bgTexture, // Use background as environment map
        envMapIntensity: 1,
        opacity: 0.8,
        iridescence: 1.0,
        // iridescenceIOR: 2.33,
        transparent: true,
        // clearcoatRoughnessMap: 1,
      });
    }
  });

  image.scale.set(800, 800, 800);
  scene.add(gltf.scene);
});

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  // Rotate the model slightly for better visual effect
  if (scene.children.length > 4) {
    // Assuming model is loaded
    scene.children[4].rotation.y += 0.002;
  }

  // Render with post-processing
  composer.render();
}
animate();
