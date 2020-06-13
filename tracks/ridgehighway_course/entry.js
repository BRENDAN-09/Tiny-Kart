var shadowFile
var cp = [
[-37.2,60.0,30.0,60.0,0,false],
[-43.2,-16.0,34.4,-16.0,0,false],
[-28.8,-87.2,27.2,-28.0,0,true],
[59.2,-104.0,37.6,-25.6,0,true],
[68.8,-105.60000000000001,149.6,11.200000000000001,0,true],
[74.4,-112.8,164.8,-106.4,0,true],
[80.8,-156.0,169.6,-109.60000000000001,1,true],
[84.8,-179.20000000000002,184.8,-127.2,1,true],
[112.0,-228.0,197.20000000000002,-164.4,1,true],
[127.60000000000001,-256.0,197.6,-199.20000000000002,2,false],
[184.28106400000001,-322.460752,215.20000000000002,-264.4,2,true],
[255.6,-314.40000000000003,225.6,-261.6,3,true],
[291.2,-252.8,227.20000000000002,-252.8,3,true],
[268.4,-198.8,203.20000000000002,-228.0,4,true],
[267.2,-195.20000000000002,198.4,-173.6,4,true],
[285.6,-152.8,213.6,-124.8,4,true],
[313.2,-102.8,232.78921599999998,-71.383864,4,true],
[312.8,25.6,232.8,25.6,4,false],
[312.8,133.6,232.8,133.6,4,true],
[312.8,238.0,232.8,238.0,4,true],
[312.8,386.40000000000003,232.8,335.6,4,false],
[233.6,450.40000000000003,196.8,354.40000000000003,4,true],
[156.8,486.40000000000003,122.4,385.6,4,true],
[84.8,518.4,51.2,413.2,4,true],
[-36.800000000000004,471.2,33.6,414.40000000000003,4,false],
[-36.800000000000004,359.2,33.6,359.2,4,true],
[-36.800000000000004,274.40000000000003,33.6,274.40000000000003,4,true],
[-36.800000000000004,174.4,33.2,174.4,4,true],
[-36.800000000000004,110.4,32.8,110.4,4,true]]
var rp = [
[0.086464,14.44,77.72017600000001,180.00],
[137.92000000000002,12.0,-170.0,169.00],
[184.8,6.0,-245.6,157.00],
[250.826344,11.341776,-274.63456,30.00],
[231.36,19.312824000000003,-189.20000000000002,19.00]]
var startPos = new THREE.Vector3(0.023872,14.4,62.528248)
var startTheta = 0.0
var trackFile='./tracks/ridgehighway_course/course.glb'
var collisionFile='./tracks/ridgehighway_course/kcl.glb'
var vrFile='./tracks/ridgehighway_course/vrcorn.glb'
var trackName='ridgehighway_course'
var numLaps = 3
var floor = []
var walls = []
var collision = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000000000)
loader = new THREE.GLTFLoader();
scene = new THREE.Scene()

var texLoad = new THREE.TextureLoader(), shadowMap
if(shadowFile!=undefined)shadowMap = texLoad.load(shadowFile)
//load model
loader.load(trackFile, function(gltf, err) {
  console.log(err);
  root = gltf.scene;
  gltf.scene.traverse(function(node) {
    if(shadowMap!=undefined&& node instanceof THREE.Mesh && node.geometry.attributes.uv2){
      console.log(`${node.name} has 2 uvs`);
      node.material = shadowMat(node.material.map,shadowMap);
    }else if (node instanceof THREE.Mesh){
      node.material = flatMat(node.material.map);
    }
  })
  scene.add(root)
  count(3)
  finalize()
  animate()
});

//load collision and bg
loadKcl(collisionFile)
loadVrcorn(vrFile)


function finalize(){

}
//called every frame
function update(){

}
