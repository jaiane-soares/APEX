import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, carModel, controls;

function init() {
    // Criando a Cena
    scene = new THREE.Scene();
    scene.background = null; // Mantemos null para o fundo ser transparente 

    //  Câmera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(4, 2, 5); // Posição diagonal para ver o carro de lado/frente

    // Renderizador
    const canvas = document.querySelector('#canvas-3d'); // Seletor do HTML
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Luzes 
    const light = new THREE.AmbientLight(0xffffff, 0.8); // Luz suave em tudo
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Controles de Mouse
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    loadModel();
    animate();
}

function loadModel() {
    const loader = new GLTFLoader();
    // o caminho aponta para o arquivo .glb
    loader.load('../assets/models/kadett_rebaixado.glb', (gltf) => {
        carModel = gltf.scene;
        scene.add(carModel);
        
        // Centralizar o carro 
        const box = new THREE.Box3().setFromObject(carModel);
        const center = box.getCenter(new THREE.Vector3());
        carModel.position.sub(center);
    }, undefined, (error) => {
        console.error('Erro ao carregar o modelo:', error);
    });
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}


init();