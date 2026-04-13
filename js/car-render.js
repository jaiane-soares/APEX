import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, carModel, controls;

function init() {
    scene = new THREE.Scene();

    // Câmera posicionada para ver o carro de cima/diagonal
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(8, 4, 12); 

    const canvas = document.querySelector('#canvas-3d');
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Habilita Sombras no Renderizador
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // CONTROLES DE ROTAÇÃO (OrbitControls)
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Suaviza o movimento
    controls.dampingFactor = 0.05;
    controls.minDistance = 5; // Zoom 
    controls.maxDistance = 20; // Zoom 
    controls.maxPolarAngle = Math.PI / 2; // Impede de olhar por baixo do chão

    // LUZES
    scene.add(new THREE.AmbientLight(0xffffff, 1.5)); 
    
    const light = new THREE.DirectionalLight(0xffffff, 2.0);
    light.position.set(5, 15, 10);
    light.castShadow = true; // Luz que projeta sombra
    // Ajuste da qualidade da sombra
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    scene.add(light);

    // CHÃO PARA A SOMBRA 
    const planeGeom = new THREE.PlaneGeometry(100, 100);
    const planeMat = new THREE.ShadowMaterial({ opacity: 0.4 });
    const plane = new THREE.Mesh(planeGeom, planeMat);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = 0;
    plane.receiveShadow = true;
    scene.add(plane);

    const loader = new GLTFLoader();
    loader.load('../assets/models/kadettAntigo.glb', (gltf) => {
        carModel = gltf.scene;

        // Ativa sombras em todas as partes do carro
        carModel.traverse(node => {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });

        const box = new THREE.Box3().setFromObject(carModel);
        const center = box.getCenter(new THREE.Vector3());
        
        carModel.position.x = -center.x;
        carModel.position.z = -center.z;
        carModel.position.y = -box.min.y; // Coloca no chão

        carModel.scale.setScalar(2.5); // Aumenta o carro
        scene.add(carModel);
        
        camera.lookAt(0, 1, 0);
    });

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    if (controls) controls.update(); // Necessário para o damping funcionar
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();