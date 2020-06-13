var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );

camera.position.set( 0, 2, 9 );
camera.lookAt(0,0,0)
directionalLight = new THREE.DirectionalLight(0xffffff, 2)
scene.add(directionalLight)



var loader = new THREE.GLTFLoader();
var texLoad = new THREE.TextureLoader()
var shadowTex = texLoad.load("./experimental/shadowq.jpg")

loader.load("./experimental/scene.glb",function(gltf,error){
  gltf.scene.traverse(function(node) {
    if(node instanceof THREE.Mesh && node.geometry.attributes.uv2){
      //console.log(node.material.map instanceof THREE.Texture);
      console.log(`${node.name} has 2 uvs`);
      console.log(node.geometry.attributes);
      //console.log(node.material.map);
      var uniforms = {
        shadowMap: {value: shadowTex},
        map: {value: node.material.map},
      }
      uniforms[ "map" ].value.wrapS = uniforms[ "map" ].value.wrapT = THREE.RepeatWrapping;
      var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent
      });
      node.material = material
      //console.log(node.material);
    }
  })
  scene.add(gltf.scene)
})

var t = 0
animate()
function animate() {
  t++
	requestAnimationFrame( animate );
  camera.position.x = Math.sin(t*0.002)*10;
  camera.position.z = Math.cos(t*0.002)*10;
  camera.lookAt(0,0,0)
	renderer.render( scene, camera );
}
