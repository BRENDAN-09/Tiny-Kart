var renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);

camera.position.set(0, 15, 20);
camera.lookAt(0, 0, 0)
light = new THREE.DirectionalLight(0xffffff, 2)
scene.add(light)
scene.background = new THREE.Color(0x16bff7);



var loader = new THREE.GLTFLoader();
var texLoad = new THREE.TextureLoader()
var shadowTex = texLoad.load("./experimental/shadowI.png")

loader.load("./experimental/island.glb", function(gltf, error) {
  gltf.scene.traverse(function(node) {
    console.log(node);
    if (node instanceof THREE.Mesh && node.geometry.attributes.uv2) {
      var uniforms = {
        shadowMap: {
          value: shadowTex
        },
        map: {
          value: node.material.map
        },
      }
      uniforms["map"].value.wrapS = uniforms["map"].value.wrapT = THREE.RepeatWrapping;
      var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent
      });
      node.material = material
    }
    if (node.name == "Fun") {
      node.visible = false;
    }
  })
  scene.add(gltf.scene)
})

var waterTex = texLoad.load("./experimental/waterNormals.jpg");
waterTex.wrapS = THREE.RepeatWrapping;
waterTex.wrapT = THREE.RepeatWrapping;
var waterBump = texLoad.load("./experimental/waterBump.jpg");
waterBump.wrapS = THREE.RepeatWrapping;
waterBump.wrapT = THREE.RepeatWrapping;
var waterGeometry = new THREE.PlaneBufferGeometry(500, 500);
var waterMaterial = new THREE.ShaderMaterial({
  uniforms: {
    basCol: {value: new THREE.Color("rgb(11, 79, 156)")},
    truCol: {value: new THREE.Color("rgb(64, 231, 228)")},
    time: {value: 0.0},
    normalSampler: {value: waterTex},
    bumpSampler: {value: waterBump},
  },
  vertexShader: document.getElementById('vertexShader').textContent,
  fragmentShader: document.getElementById('waterShader').textContent
});
var water = new THREE.Mesh(waterGeometry,waterMaterial);
water.rotation.x = -Math.PI / 2;
water.position.y+=1.5
scene.add(water);

sky = new THREE.Sky();
sky.scale.setScalar( 45000 );
scene.add(sky);

var t = 0
animate()

function animate() {
  t=400;
  requestAnimationFrame(animate);
  water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
  camera.position.x = Math.sin(t * 0.006) * 20;
  camera.position.z = Math.cos(t * 0.006) * 20;
  camera.lookAt(0, 5, 0)
  renderer.render(scene, camera);
}
