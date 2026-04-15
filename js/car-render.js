import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls, carModel;

function init() {
    scene = new THREE.Scene();
    
    // Iluminação Profissional Ajustada
    const light1 = new THREE.DirectionalLight(0xffffff, 3);
    light1.position.set(5, 10, 5);
    scene.add(light1);
    
    const light2 = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(light2);

    // Luz de preenchimento para realçar o metal
    const fillLight = new THREE.PointLight(0xa2ff00, 1);
    fillLight.position.set(-5, 2, -5);
    scene.add(fillLight);

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(8, 3, 8);

    const canvas = document.querySelector('#canvas-3d');
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace; // Garante cores fiéis

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const loader = new GLTFLoader();
    loader.load('../assets/models/kadettAntigo.glb', (gltf) => {
        carModel = gltf.scene;
        
        // Centralização
        const box = new THREE.Box3().setFromObject(carModel);
        const center = box.getCenter(new THREE.Vector3());
        carModel.position.sub(center);
        
        scene.add(carModel);

        // DEBUG: Descomente a linha abaixo para ver os nomes das peças no console do navegador
        // carModel.traverse(n => n.isMesh && console.log("Peça encontrada:", n.name, "| Material:", n.material.name));
        
    }, undefined, (error) => console.error("Erro ao carregar o Kadett:", error));

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

// jaiane-soares/apex/APEX-dev/js/car-render.js

window.changeColor = (colorHex, metal = 0.9, rough = 0.1) => {
    if (!carModel) return;

    carModel.traverse((node) => {
        if (node.isMesh) {
            const nodeName = node.name.toLowerCase();
            const matName = node.material.name.toLowerCase();

            // Busca por qualquer parte que não seja vidro, pneu ou motor
            const isIgnore = ["glass", "vidro", "tire", "pneu", "wheel", "roda", "interior"].some(key => 
                nodeName.includes(key) || matName.includes(key)
            );

            // Se não for para ignorar e parecer parte da lataria (ou se for o 'body')
            if (!isIgnore || nodeName.includes("body")) {
                
                // Cria um novo material para garantir que as propriedades funcionem
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


init();
