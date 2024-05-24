import * as THREE from "./three.js/build/three.module.js"

import {OrbitControls} from "./three.js/examples/jsm/controls/OrbitControls.js"

import { FontLoader } from "./three.js/examples/jsm/loaders/FontLoader.js";

import {GLTFLoader} from "./three.js/examples/jsm/loaders/GLTFLoader.js";

const textureLoader = new THREE.TextureLoader()
const fontLoader = new FontLoader()
const gltfLoader = new GLTFLoader()

const width = window.innerWidth;
const height = window.innerHeight;
const scene = new THREE.Scene();

const perspectiveCamera = new THREE.
PerspectiveCamera(45, width/height)
perspectiveCamera.position.set(0, 20, 20)
perspectiveCamera.lookAt(0, 0, 0)

const perspectiveCamera2 = new THREE.
PerspectiveCamera(45, width/height)
perspectiveCamera.position.set(0, 30, 20)
perspectiveCamera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap

document.body.append(renderer.domElement)

const controls = new OrbitControls(perspectiveCamera, renderer.domElement)

window.addEventListener("keypress", (e) => {
    if(e.key == "c"){
        const controls = new OrbitControls(perspectiveCamera, renderer.domElement)
    }
    else if(e.key == "v"){
        const controls = new OrbitControls(perspectiveCamera2, renderer.domElement)
    }
})


controls.update()

const light = new THREE.DirectionalLight(0xFFFFFF, 1)
light.castShadow = true
light.position.set(4, 6, 10)
light.lookAt(0, 0, 0)

const helper = new THREE.DirectionalLightHelper(light, 2)

light.position.z = 4
light.position.y = 100

light.shadow.mapSize.width = 512; 
light.shadow.mapSize.height = 512; 
light.shadow.camera.near = 0.5; 
light.shadow.camera.far = 500; 

const light2 = new THREE.AmbientLight( 0x404040 );
light2.castShadow = true
light2.position.set(10, 6, 10)
light2.lookAt(0, 0, 0)

// const helper2 = new THREE.DirectionalLightHelper(light2, 2)

scene.add(light)
scene.add(helper)

scene.add(light2)
// scene.add(helper2)

const skyboxTexture = [
    new THREE.MeshBasicMaterial({
        map: textureLoader.load("bluecloud_ft.jpg"),
        side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load("bluecloud_bk.jpg"),
        side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load("bluecloud_up.jpg"),
        side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load("bluecloud_dn.jpg"),
        side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load("bluecloud_rt.jpg"),
        side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load("bluecloud_lf.jpg"),
        side: THREE.DoubleSide
    })
]

const BoxGeometry = new THREE.BoxGeometry(1000, 200, 1000)
const cube = new THREE.Mesh(BoxGeometry, skyboxTexture)
cube.receiveShadow = true

cube.position.set(0, 100, 0)
scene.add(cube)

let jet
let jetX = 0
let jetZ = 0

gltfLoader.load("./assets/Jet/F-16D.gltf",
(model) => {
    jet = model.scene
    jet.position.y = 50
    jet.scale.set(2, 2, 2)
    jet.traverse((child) => {
       child.castShadow = true
    })
    scene.add(jet)
})

gltfLoader.load("./assets/Jet/F-16D.gltf",
(model) => {
    jet = model.scene
    jet.position.y = 20
    jet.position.z = 25
    jet.position.x = 25
    jet.scale.set(2, 2, 2)
    jet.traverse((child) => {
        child.castShadow = true
    })
    scene.add(jet)
})

gltfLoader.load("./assets/Jet/F-16D.gltf",
(model) => {
    jet = model.scene
    jet.position.y = 50
    jet.position.x = 50
    jet.scale.set(2, 2, 2)
    jet.traverse((child) => {
        child.castShadow = true
    })
    scene.add(jet)
})

const box = new THREE.BoxGeometry(125, 5, 125);
box.translate(25, 10, 0);
const boxMaterial = [
    new THREE.MeshBasicMaterial({
        map: textureLoader.load("grass-texture-background.jpg"),
        side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load("grass-texture-background.jpg"),
        side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load("grass-texture-background.jpg"),
        side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load("grass-texture-background.jpg"),
        side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load("grass-texture-background.jpg"),
        side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load("grass-texture-background.jpg"),
        side: THREE.DoubleSide
    })
]
box.receiveShadow = true;
const boxLand = new THREE.Mesh(box, boxMaterial);
boxLand.receiveShadow = true;
scene.add(boxLand);

const missile = new THREE.CylinderGeometry( 2.34, 1.23, 16.268, 7, 1, false, 0, 6.283185307179586); 
missile.translate(180, 50, 0);
const material = new THREE.MeshBasicMaterial( {color: 0x6D7278} ); 
const cylinder = new THREE.Mesh( missile, material );
missile.castShadow = true
scene.add(cylinder)

const ring = new THREE.RingGeometry( 1, 5, 32); 
ring.translate(180, 50, 0);
const ringMaterial = new THREE.MeshBasicMaterial( {color: 0xff1100} ); 
const rings = new THREE.Mesh(ring, ringMaterial);
scene.add(rings);

const sphere = new THREE.SphereGeometry( 5, 32, 16 ); 
sphere.translate(0, 100, 0);
const sphereMaterial = new THREE.MeshBasicMaterial( {color: 0xffe100} ); 
const sphereBall = new THREE.Mesh(sphere, sphereMaterial);
scene.add(sphereBall);

const torus = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
torus.translate(100, 25, 10);
const torusMaterial = new THREE.MeshPhysicalMaterial( {color: 0x049ef4}, 0);
const torusKnot = new THREE.Mesh(torus, torusMaterial);
scene.add(torusKnot);

const torus2 = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
torus2.translate(0, 100, 100);
const torusMaterial2 = new THREE.MeshToonMaterial({color: 0xffe100});
const torusKnot2 = new THREE.Mesh(torus2, torusMaterial2);
scene.add(torusKnot2);

function animate() {
    missile.rotateY(0.05)
    ring.rotateX(0.05)
    requestAnimationFrame(animate);
    renderer.render(scene, perspectiveCamera);
  }

  animate();
    
        

