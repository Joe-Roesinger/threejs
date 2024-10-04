import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

if ( WebGL.isWebGL2Available() ) { 
    // Create Scene renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    // Cube Mesh
    const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
    const cubeMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
    bindRenderToButton('cubeBtn', 'click', () => { updateScene(scene, camera, renderer, cube) });
    
    // Sphere Mesh
    const sphereGeometry = new THREE.SphereGeometry( 1, 32, 16 );
    const sphereMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00  } );
    const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    bindRenderToButton('sphereBtn', 'click', () => { updateScene(scene, camera, renderer, sphere) }); 

    // Line
    const material = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
    const points = [];
    points.push( new THREE.Vector3( - 1, 0, 0 ) );
    points.push( new THREE.Vector3( 0, 1, 0 ) );
    points.push( new THREE.Vector3( 1, 0, 0 ) );
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometry, material );
    bindRenderToButton('lineBtn', 'click', () => { updateScene(scene, camera, renderer, line)});

    updateScene(scene, camera, renderer, cube);
} else {
    const warning = WebGL.getWebGL2ErrorMessage();
    document.getElementById('container').appendChild( warning );
}

function updateScene(scene, camera, renderer, geometry) {
    clearScene(scene)
    scene.add(geometry);
    camera.position.z = 5;
    renderer.setAnimationLoop(() => {renderGeometry(scene, camera, renderer, geometry)});
}

function clearScene(scene) {
    while(scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }
}

function renderGeometry(scene, camera, renderer, geometry) {
    geometry.rotation.x += 0.01; geometry.rotation.y += 0.01;
    renderer.render( scene, camera );
}

function bindRenderToButton(id, action, func) {
    document.getElementById(id).addEventListener(action, func)
}