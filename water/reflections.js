var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var loader = new THREE.TextureLoader();


var params = {
  intensity: 0.1,
  minCut: 0.5,
  maxCut: 0.5
}

var shinyMap = loader.load("./waterreflection.png")
shinyMap.wrapS = THREE.RepeatWrapping; shinyMap.wrapT = THREE.RepeatWrapping;
console.log(shinyMap);
var geometry = new THREE.BoxGeometry(4, 4, 4);

var shinyWater = new THREE.ShaderMaterial({
  uniforms: {
    animate: true,
    map: {value: shinyMap},
    time: {value: 0.0},
    intensity: {value: 0.1},
    minCut: {value: 0.5},
    maxCut: {value: 0.5}
  },
  transparent: true,
  vertexShader: document.getElementById( 'vertexShader' ).textContent,
  fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
});



//lighting
directionalLight = new THREE.DirectionalLight(0xffffff, 4)
directionalLight.castShadow = true
scene.add(directionalLight)
directionalLight.position.y += 6
directionalLight.position.z = 2
directionalLight.position.x = -3
directionalLight.lookAt(0, 0, 0)
var light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

var sceneLoader = new THREE.GLTFLoader();
var bah = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
sceneLoader.load("scene.glb",function(gltf,err){
  console.log(err);
    gltf.scene.traverse(function(node){
      if(!(node instanceof THREE.Mesh))return;
      if(node.name == "Plane001"){
        node.material = shinyWater;
      }else{
        node.material = new THREE.ShaderMaterial({
          uniforms: {map: {value: node.material.map}},
          vertexShader: document.getElementById('pv').textContent,
          fragmentShader: document.getElementById('pf').textContent
        });
      }
    })
    scene.add(gltf.scene);
})



var gui = new dat.GUI()
gui.add(params,'intensity',0,0.4);
gui.add(params,'minCut',0,1);
gui.add(params,'maxCut',0,1);
camera.position.z = 10;
camera.position.y = 10;
camera.lookAt(0,0,0);

function updateUniforms(){
  shinyWater.uniforms[ 'time' ].value += 0.01;
  shinyWater.uniforms[ 'intensity' ].value = params.intensity;
  shinyWater.uniforms[ 'minCut' ].value = params.minCut;
  shinyWater.uniforms[ 'maxCut' ].value = params.maxCut;
}
var t = 0;
var animate = function() {
  t+=1;
  requestAnimationFrame(animate);
  updateUniforms();
  camera.position.x = Math.sin(t/800)*10;
  camera.position.z = Math.cos(t/800)*10;
  camera.lookAt(0,0,0);
  renderer.render(scene, camera);
};

animate();
