import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls, carModel;
let originalMaterials = new Map();

function init() {
    scene = new THREE.Scene();

    // Iluminação reforçada para veres a cor claramente
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2);
    sunLight.position.set(5, 10, 7.5);
    scene.add(sunLight);

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(8, 3, 8);

    const canvas = document.querySelector('#canvas-3d');
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const loader = new GLTFLoader();
    loader.load('../assets/models/kadettAntigo.glb', (gltf) => {
        carModel = gltf.scene;

        // Guarda os materiais originais
        carModel.traverse((node) => {
            if (node.isMesh) {
                originalMaterials.set(node.uuid, node.material.clone());
            }
        });

        // Centralização
        const box = new THREE.Box3().setFromObject(carModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        carModel.position.x += (carModel.position.x - center.x);
        carModel.position.z += (carModel.position.z - center.z);
        carModel.position.y -= box.min.y; 

        controls.target.set(0, size.y / 2, 0);
        controls.update();

        scene.add(carModel);
        console.log("Kadett pronto para personalização!");
    }, undefined, (err) => console.error("Erro:", err));

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

// FUNÇÃO DE COR CORRIGIDA
window.changeColor = (colorHex) => {
    if (!carModel) return;

    // Lista de peças que NÃO podem ser pintadas
    const proibidos = ['vidro', 'para-brisa', 'parabrisa', 'lente', 'lanterna', 'roda', 'wheel', 'tire', 'pneu', 'farol', 'mirror', 'espelho'];

    carModel.traverse((node) => {
        if (node.isMesh) {
            const name = node.name.toLowerCase();
            
            // Se o nome NÃO contém nada da lista de proibidos, nós pintamos
            const podePintar = !proibidos.some(termo => name.includes(termo));

            if (podePintar) {
                // Força a atualização da cor no material existente
                node.material.color.set(colorHex);
                node.material.needsUpdate = true;
            }
        }
    });
};

window.resetCarColor = () => {
    if (!carModel) return;
    carModel.traverse(node => {
        if (node.isMesh && originalMaterials.has(node.uuid)) {
            node.material = originalMaterials.get(node.uuid).clone();
            node.material.needsUpdate = true;
        }
    });
};

init();