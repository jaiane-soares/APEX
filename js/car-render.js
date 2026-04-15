import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls, carModel;
let originalMaterials = new Map();

function init() {
    scene = new THREE.Scene();
    
    // Iluminação
    const light1 = new THREE.DirectionalLight(0xffffff, 3);
    light1.position.set(5, 10, 5);
    scene.add(light1);
    
    const light2 = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(light2);

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
        
        const box = new THREE.Box3().setFromObject(carModel);
        const center = box.getCenter(new THREE.Vector3());
        carModel.position.sub(center);
        
        carModel.traverse((node) => {
            if (node.isMesh) {
                // Guarda o material original para o Reset
                originalMaterials.set(node.uuid, node.material.clone());
            }
        });

        scene.add(carModel);
    }, undefined, (error) => console.error("Erro ao carregar o modelo:", error));

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

// Lógica de Abas
document.querySelectorAll('.card-opcao').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelectorAll('.card-opcao, .aba-conteudo').forEach(el => el.classList.remove('active'));
        card.classList.add('active');
        const targetId = `content-${card.dataset.target}`;
        const targetEl = document.getElementById(targetId);
        if (targetEl) targetEl.classList.add('active');
    });
});

window.resetCarColor = () => {
    if (!carModel) return;
    carModel.traverse((node) => {
        if (node.isMesh && originalMaterials.has(node.uuid)) {
            node.material = originalMaterials.get(node.uuid).clone();
            node.material.needsUpdate = true;
        }
    });
};

// FUNÇÃO DE CORES COM FILTRO EM INGLÊS
window.changeColor = (colorHex, metal = 0.9, rough = 0.1) => {
    if (!carModel) return;

    carModel.traverse((node) => {
        if (node.isMesh) {
            const nodeName = node.name.toLowerCase();
            const matName = node.material.name.toLowerCase();

            // 1. FILTRO DE VIDROS (Nomes em Inglês)
            const isGlass = 
                nodeName.includes("glass") || 
                nodeName.includes("window") || 
                matName.includes("glass") || 
                node.material.transparent === true || 
                node.material.opacity < 1;

            // 2. FILTRO DE RODAS, PNEUS E INTERIOR (Nomes em Inglês)
            const isIgnore = [
                "wheel", "tire", "rim", "rubber", "interior", 
                "seat", "mirror", "light", "chrome", "engine", 
                "plastic", "black", "bolt", "handle"
            ].some(key => nodeName.includes(key) || matName.includes(key));

            // SÓ MUDA A COR SE: Não for vidro E não estiver na lista de ignorados
            if (!isGlass && !isIgnore) {
                node.material = new THREE.MeshStandardMaterial({
                    color: new THREE.Color(colorHex),
                    metalness: metal,
                    roughness: rough,
                    envMapIntensity: 1.0
                });
                node.material.needsUpdate = true;
            }
        }
    });
};

// jaiane-soares/apex/APEX-dev/js/car-render.js

// jaiane-soares/apex/APEX-dev/js/car-render.js
