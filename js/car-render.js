import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, carModel, controls;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(8, 4, 12); 

    const canvas = document.querySelector('#canvas-3d');
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
        });
    });
}

function animate() {
    requestAnimationFrame(animate);
    if(controls) controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();