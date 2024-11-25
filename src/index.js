import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { gsap } from "gsap";

// Создаём сцену, камеру и рендерер
const scene = new THREE.Scene();
scene.background = new THREE.Color("#101824");

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0.51, 0.51, -0.91);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.5;
document.body.appendChild(renderer.domElement);

// Добавляем свет
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(0, 10, 0);
directionalLight.target.position.set(0, 0, 0);
scene.add(directionalLight);
scene.add(directionalLight.target);

const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
scene.add(ambientLight);

// Загружаем Environment Map (HDRI)
new RGBELoader().load(
  "https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@master/hdri/dresden_square_2k.hdr",
  (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
  }
);

// Загрузка модели
const loader = new GLTFLoader();
let model;

loader.load(
  "/model.glb",
  (gltf) => {
    model = gltf.scene;

    model.traverse((child) => {
      if (child.isMesh) {
        child.material.metalness = 0.5;
        child.material.roughness = 0.2;
      }
    });

    model.position.set(-0.25, 0, 0);
    scene.add(model);

    console.log("Модель загружена:", gltf);

    // startAnimation();
    updateModelScale(); // Установить начальный масштаб
  },
  (xhr) => {
    console.log(`Загрузка модели: ${(xhr.loaded / xhr.total) * 100}%`);
  },
  (error) => {
    console.error("Ошибка загрузки модели:", error);
  }
);

// Настраиваем OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 0;
controls.maxDistance = 1.75;
controls.enableZoom = false;

// Анимация
function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
  //   logCameraPosition();
}

animate();

function logCameraPosition() {
  console.log(
    `Координаты камеры: x = ${camera.position.x.toFixed(
      2
    )}, y = ${camera.position.y.toFixed(2)}, z = ${camera.position.z.toFixed(
      2
    )}`
  );
}

// Обработка изменения размера окна
function updateModelScale() {
  if (model) {
    const baseScale = 1; // Базовый масштаб
    const scaleFactor = Math.min(window.innerWidth, window.innerHeight) / 1000; // Пропорциональный коэффициент
    model.scale.set(
      baseScale * scaleFactor,
      baseScale * scaleFactor,
      baseScale * scaleFactor
    );
    console.log(
      `Масштаб модели: x = ${model.scale.x}, y = ${model.scale.y}, z = ${model.scale.z}`
    );
  }
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  updateModelScale(); // Обновить масштаб модели при изменении размера окна
});

let scrollPos = 0;
const scrollPosAmount = 0.25;
let isOnGoing = false;

const text_1 = document.querySelector(".text_1");

window.addEventListener("wheel", () => {
  console.log(scrollPos);
  if (scrollPos <= 11) {
    text_1.style.transform = `translateX(${(0.5 - scrollPos / 6) * 100}%)`;
  }
  text_1.style.opacity = scrollPos / 4;

  if (scrollPos === 4) {
    const animDuration = 2;
    scrollPos = scrollPos + scrollPosAmount;
    isOnGoing = true;
    startAnimation_1(animDuration);
    setTimeout(() => {
      isOnGoing = false;
    }, animDuration * 1000);
  }
  if (scrollPos === 10) {
    const header_1 = text_1.querySelector("h2");
    const text_body_1 = text_1.querySelector(".text__body");
    header_1.innerHTML = "Усиленная редукторная<br/> группа";
    text_body_1.innerHTML =
      "<p>Спроектирована специально для интенсивного использования</p><p>Шестерни изготовлены из уникального высокопрочного сплава, а их геометрия специально разработана для увеличения пятна контакта шестерей и снижения их износа</p>";
    const animDuration = 3;
    scrollPos = scrollPos + scrollPosAmount;
    isOnGoing = true;
    startAnimation_2(animDuration);
    setTimeout(() => {
      isOnGoing = false;
    }, animDuration * 1000);
  }
  if (!isOnGoing) {
    scrollPos = scrollPos + scrollPosAmount;
  }
});

// Анимация с использованием GSAP
// function startAnimation() {
//   // Этап 1: Анимация приближения
//   gsap.to(camera.position, {
//     x: 0.51,
//     y: 0.51,
//     z: -1.24,
//     duration: 3,
//     ease: "power2.inOut",
//     onComplete: () => {
//       // Этап 2: Анимация поворота
//       gsap.to(camera.position, {
//         x: 0.51,
//         y: 0.51,
//         z: 1.24,
//         duration: 3,
//         ease: "power2.inOut",
//         onComplete: () => {
//           console.log("Анимация завершена.");
//         },
//       });
//     },
//   });
// }

function modifyText_1(duration) {}

function startAnimation_1(duration) {
  gsap.to(camera.position, {
    x: 0.51,
    y: 0.51,
    z: -1.24,
    duration: duration,
    ease: "power2.inOut",
  });
}

function startAnimation_2(duration) {
  // Этап 2: Анимация поворота
  gsap.to(camera.position, {
    x: 0.51,
    y: 0.51,
    z: 1.24,
    duration: duration,
    ease: "power2.inOut",
  });
}
