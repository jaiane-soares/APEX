import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls, carModel;

function init() {
    // 1. Cena e Iluminação
    scene = new THREE.Scene();
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);
    
    const sunLight = new THREE.DirectionalLight(0xffffff, 2);
    sunLight.position.set(5, 10, 7.5);
    scene.add(sunLight);

    // 2. Câmera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(-6, 2, 8);

    // 3. Renderer
    const canvas = document.querySelector('#canvas-3d');
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // 4. Controles
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 5;
    controls.maxDistance = 15;

    // 5. Carregar o Modelo
    const loader = new GLTFLoader();
    loader.load('../assets/models/kadettAntigo.glb', (gltf) => {
        carModel = gltf.scene;
        scene.add(carModel);
        
        // Centralização automática
        const box = new THREE.Box3().setFromObject(carModel);
        const center = box.getCenter(new THREE.Vector3());
        carModel.position.sub(center);
    }, undefined, (err) => console.error("Erro ao carregar modelo:", err));

    window.addEventListener('resize', onResize);
    animate();
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    if (controls) controls.update();
    renderer.render(scene, camera);
}

// --- LÓGICA DE INTERAÇÃO ---

// Troca de Abas
document.querySelectorAll('.option-card').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelectorAll('.option-card, .category-content').forEach(el => el.classList.remove('active'));
        card.classList.add('active');
        const target = document.getElementById(`content-${card.dataset.target}`);
        if (target) target.classList.add('active');
    });
});

// Troca de Cor (Global para o HTML acessar)
window.changeColor = (colorHex) => {
    if (!carModel) return;
    carModel.traverse((node) => {
        if (node.isMesh) {
            // Ajuste o nome "pintura" para o nome exato da peça no seu arquivo .glb
            if (node.name.toLowerCase().includes("body") || node.name.toLowerCase().includes("pintura")) {
                node.material.color.set(colorHex);
            }
        }
    });
};

init();