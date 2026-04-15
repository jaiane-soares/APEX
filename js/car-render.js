import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

<<<<<<< HEAD
let scene, camera, renderer, carModel, controls;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(8, 4, 12); 
=======
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
>>>>>>> 73afcd92f803a3f3c8700aaacc01073ec374895c

    const canvas = document.querySelector('#canvas-3d');
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
<<<<<<< HEAD
    renderer.shadowMap.enabled = true;

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 2.0)); 
    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(5, 10, 7.5);
    light.castShadow = true;
    scene.add(light);

    const loader = new GLTFLoader();
    loader.load('../assets/models/kadettAntigo.glb', (gltf) => {
        carModel = gltf.scene;
        
        // Ativa sombras
        carModel.traverse(n => { if(n.isMesh) { n.castShadow = true; n.receiveShadow = true; } });

        // Centralização e Escala
        const box = new THREE.Box3().setFromObject(carModel);
        const center = box.getCenter(new THREE.Vector3());
        carModel.position.set(-center.x, -box.min.y, -center.z);
        carModel.scale.setScalar(2.5);
        
        scene.add(carModel);
        setupUI();
    });

    animate();
}

function setupUI() {
    const cardCores = document.getElementById('card-cores');
    const colorMenu = document.getElementById('color-menu');
    const mainCards = document.getElementById('main-cards');
    const colorItems = document.querySelectorAll('.selection-item');

    // Abre Menu Cores
    cardCores.addEventListener('click', (e) => {
        e.stopPropagation();
        mainCards.classList.add('hidden');
        colorMenu.classList.add('active');
    });

    // Fecha ao clicar fora (no fundo do 3D)
    window.addEventListener('click', (e) => {
        if (!colorMenu.contains(e.target) && colorMenu.classList.contains('active')) {
            colorMenu.classList.remove('active');
            mainCards.classList.remove('hidden');
        }
    });

    // Troca de Cor
    colorItems.forEach(item => {
        item.addEventListener('click', () => {
            colorItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            const color = item.getAttribute('data-color');
            carModel.traverse(n => { if(n.isMesh) n.material.color.set(color); });
=======

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.maxDistance = 15;
    controls.minDistance = 4;

    // Carregamento inicial do Kadett
   // jaiane-soares/apex/APEX-dev/js/car-render.js

loader.load('../assets/models/kadettAntigo.glb', (gltf) => {
    carModel = gltf.scene;
    console.log("Modelo carregado com sucesso!"); // Log de sucesso
    
    // Centralização e escala
    const box = new THREE.Box3().setFromObject(carModel);
    const center = box.getCenter(new THREE.Vector3());
    carModel.position.sub(center);
    
    scene.add(carModel);
}, 
(xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% carregado');
}, 
(error) => {
    console.error("Erro ao carregar o modelo GLB:", error); 
    // Se der erro aqui, o caminho '../assets/models/kadettAntigo.glb' está incorreto
});

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
>>>>>>> 73afcd92f803a3f3c8700aaacc01073ec374895c
        });
    });
}

function animate() {
    requestAnimationFrame(animate);
<<<<<<< HEAD
    if(controls) controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
=======
    if (controls) controls.update();
    renderer.render(scene, camera);
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();

}
>>>>>>> 73afcd92f803a3f3c8700aaacc01073ec374895c
