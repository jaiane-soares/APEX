import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls, carModel;
let originalMaterials = new Map();
const loader = new GLTFLoader();

function init() {
    scene = new THREE.Scene();
    
    // Iluminação Profissional
    const topLight = new THREE.DirectionalLight(0xffffff, 2);
    topLight.position.set(5, 10, 5);
    scene.add(topLight);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(8, 3, 8);

    const canvas = document.querySelector('#canvas-3d');
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.maxDistance = 15;
    controls.minDistance = 4;

    // Carregamento inicial do Kadett
    loader.load('../assets/models/kadettAntigo.glb', (gltf) => {
        carModel = gltf.scene;
        
        // Centralização automática
        const box = new THREE.Box3().setFromObject(carModel);
        carModel.position.sub(box.getCenter(new THREE.Vector3()));
        
        // Backup de materiais para reset
        carModel.traverse((node) => {
            if (node.isMesh) {
                originalMaterials.set(node.uuid, node.material.clone());
            }
        });
        
        scene.add(carModel);
    });

    window.addEventListener('resize', onResize);
    animate();
    setupTabs();
}

// Lógica de Troca de Cor (Silent Integration)
window.changeColor = (colorHex, metal = 0.9, rough = 0.2) => {
    if (!carModel) return;
    carModel.traverse((node) => {
        if (node.isMesh) {
            const name = node.name.toLowerCase();
            const matName = node.material.name.toLowerCase();
            
            // Excluir vidros, pneus e faróis da pintura
            const exclude = ["glass", "window", "pneu", "tire", "wheel", "light", "farol"];
            const isExcluded = exclude.some(k => name.includes(k) || matName.includes(k));

            if (!isExcluded && !node.material.transparent) {
                node.material = new THREE.MeshStandardMaterial({
                    color: new THREE.Color(colorHex),
                    metalness: metal,
                    roughness: rough
                });
            }
        }
    });
};

window.resetCarColor = () => {
    if (!carModel) return;
    carModel.traverse(n => {
        if (n.isMesh && originalMaterials.has(n.uuid)) {
            n.material = originalMaterials.get(n.uuid).clone();
        }
    });
};

// Lógica de abas do menu
function setupTabs() {
    document.querySelectorAll('.card-opcao').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.card-opcao, .aba-conteudo').forEach(el => el.classList.remove('active'));
            btn.classList.add('active');
            const target = document.getElementById(`content-${btn.dataset.target}`);
            if (target) target.classList.add('active');
        });
    });
}

function animate() {
    requestAnimationFrame(animate);
    if (controls) controls.update();
    renderer.render(scene, camera);
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();