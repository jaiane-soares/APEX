import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls, carModel;
let originalMaterials = new Map();

function init() {
    // 1. Cena e Iluminação
    scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2);
    sunLight.position.set(5, 10, 7.5);
    scene.add(sunLight);

    // 2. Câmera
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(8, 3, 8);

    // 3. Renderer
    const canvas = document.querySelector('#canvas-3d');
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // 4. Controles
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 4;
    controls.maxDistance = 15;

    // 5. Carregar o Modelo
    const loader = new GLTFLoader();
    loader.load('../assets/models/kadettAntigo.glb', (gltf) => {
        carModel = gltf.scene;

        // Centralização Automática (Fixando a posição errada)
        const box = new THREE.Box3().setFromObject(carModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Move o modelo para que o centro dele seja o 0,0,0 da cena
        carModel.position.x += (carModel.position.x - center.x);
        carModel.position.z += (carModel.position.z - center.z);
        carModel.position.y -= box.min.y; // Coloca as rodas no chão

        // Ajusta o foco da câmera para o centro do carro
        controls.target.set(0, size.y / 2, 0);
        controls.update();

        scene.add(carModel);

        // Salva materiais para reset
        carModel.traverse((node) => {
            if (node.isMesh) {
                originalMaterials.set(node.uuid, node.material.clone());
            }
        });

        console.log("Kadett carregado e centralizado!");
    }, undefined, (err) => console.error("Erro ao carregar modelo:", err));

    setupInteractions();
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

function setupInteractions() {
    // Lógica de Troca de Abas
    document.querySelectorAll('.card-opcao').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.card-opcao, .aba-conteudo').forEach(el => el.classList.remove('active'));
            card.classList.add('active');
            const targetId = `content-${card.dataset.target}`;
            const targetElement = document.getElementById(targetId);
            if (targetElement) targetElement.classList.add('active');
        });
    });
}

// Troca de Cor (Acessível pelo HTML)
window.changeColor = (colorHex) => {
    if (!carModel) return;
    carModel.traverse((node) => {
        if (node.isMesh) {
            const name = node.name.toLowerCase();
            // Filtro para pintar apenas a lataria
            if (name.includes("body") || name.includes("pintura") || name.includes("carroceria")) {
                node.material.color.set(colorHex);
            }
        }
    });
};

init();