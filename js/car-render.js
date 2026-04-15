import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls, carModel;
let originalMaterials = new Map();

function init() {
    scene = new THREE.Scene();
    
    // Iluminação para realçar o metal
    const light1 = new THREE.DirectionalLight(0xffffff, 3);
    light1.position.set(5, 10, 5);
    scene.add(light1);
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));

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
        carModel.position.sub(box.getCenter(new THREE.Vector3()));
        
        carModel.traverse((node) => {
            if (node.isMesh) {
                originalMaterials.set(node.uuid, node.material.clone());
            }
        });
        scene.add(carModel);
    }, undefined, (error) => console.error("Erro no carregamento:", error));

    window.addEventListener('resize', onResize);
    animate();
    setupTabs();
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

// jaiane-soares/apex/APEX-dev/js/car-render.js

window.changeColor = (colorHex, metal = 0.9, rough = 0.1) => {
    if (!carModel) return;

    carModel.traverse((node) => {
        if (node.isMesh) {
            const nodeName = node.name.toLowerCase();
            const matName = node.material.name.toLowerCase();

            // LISTA DE EXCLUSÃO (Peças que NÃO recebem cor)
            const isExcluded = [
                "glass", "window", "vidro", "para-brisa", // Vidros
                "wheel", "tire", "pneu", "roda", "rim",   // Rodas e Pneus
                "interior", "seat", "dashboard",          // Interior
                "light", "farol", "mirror", "chrome"      // Detalhes
            ].some(keyword => nodeName.includes(keyword) || matName.includes(keyword));

            // Filtro extra por transparência (geralmente vidros)
            const isTransparent = node.material.transparent || node.material.opacity < 1;

            // SÓ MUDA A COR SE: Não estiver na lista de exclusão E não for transparente
            if (!isExcluded && !isTransparent) {
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

window.resetCarColor = () => {
    if (!carModel) return;
    carModel.traverse(n => {
        if (n.isMesh && originalMaterials.has(n.uuid)) n.material = originalMaterials.get(n.uuid).clone();
    });
};

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

init();