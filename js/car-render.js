import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls, carModel;

function init() {
    scene = new THREE.Scene();
    
    // Iluminação Profissional
    const light1 = new THREE.DirectionalLight(0xffffff, 2);
    light1.position.set(2, 5, 2);
    scene.add(light1);
    
    const light2 = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light2);

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(8, 3, 8);

    const canvas = document.querySelector('#canvas-3d');
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const loader = new GLTFLoader();
    loader.load('../assets/models/kadettAntigo.glb', (gltf) => {
        carModel = gltf.scene;
        
        // Centraliza o modelo no mundo
        const box = new THREE.Box3().setFromObject(carModel);
        const center = box.getCenter(new THREE.Vector3());
        carModel.position.x = -center.x;
        carModel.position.y = -center.y;
        carModel.position.z = -center.z;
        
        scene.add(carModel);
    });

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
    controls.update();
    renderer.render(scene, camera);
}

// Troca de Abas por ID
document.querySelectorAll('.card-opcao').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelectorAll('.card-opcao, .aba-conteudo').forEach(el => el.classList.remove('active'));
        card.classList.add('active');
        const targetId = `content-${card.dataset.target}`;
        document.getElementById(targetId).classList.add('active');
    });
});

window.changeColor = (color) => {
    if (!carModel) return;
    carModel.traverse(n => {
        if (n.isMesh && (n.name.includes("pintura") || n.name.includes("body"))) {
            n.material.color.set(color);
        }
    });
};

init();