var shadowFile = 'tracks/farm_course/kage.png'
var cp = [
[87.60000000000001,-278.40000000000003,136.0,-278.40000000000003,0,false],
[84.4,-309.2,141.6,-309.2,0,false],
[87.2,-332.8,138.0,-332.8,0,true],
[87.60000000000001,-356.8,137.20000000000002,-356.8,0,true],
[89.60000000000001,-380.40000000000003,133.6,-380.40000000000003,0,true],
[84.4,-404.0,130.8,-404.0,0,true],
[81.60000000000001,-416.40000000000003,119.2,-436.8,0,true],
[70.4,-427.6,98.8,-457.6,0,true],
[56.4,-432.0,74.4,-476.40000000000003,0,true],
[43.2,-435.6,45.2,-482.8,0,true],
[23.2,-434.8,23.6,-484.40000000000003,0,true],
[3.2,-430.8,-5.2,-481.2,0,true],
[-18.8,-422.40000000000003,-30.8,-464.8,0,false],
[-26.400000000000002,-411.2,-55.6,-440.40000000000003,0,true],
[-35.6,-386.40000000000003,-68.8,-422.40000000000003,0,true],
[-44.4,-358.8,-88.0,-407.2,0,true],
[-53.6,-316.40000000000003,-96.0,-401.2,0,true],
[-89.60000000000001,-304.40000000000003,-124.0,-389.2,0,true],
[-100.4,-298.0,-164.0,-382.8,0,true],
[-128.4,-287.6,-196.8,-377.2,0,true],
[-150.8,-274.8,-244.0,-368.0,0,true],
[-170.0,-267.2,-267.2,-340.40000000000003,0,true],
[-189.6,-264.8,-282.0,-315.2,0,true],
[-205.20000000000002,-264.8,-287.6,-285.6,0,true],
[-212.4,-260.0,-285.6,-259.2,0,true],
[-217.20000000000002,-254.0,-278.8,-236.4,0,true],
[-220.0,-241.20000000000002,-264.0,-220.0,0,false],
[-211.6,-226.0,-248.4,-210.4,0,true],
[-194.4,-214.4,-237.20000000000002,-198.8,0,true],
[-179.6,-190.8,-223.6,-185.6,0,true],
[-175.20000000000002,-176.0,-216.0,-166.8,0,true],
[-177.20000000000002,-154.8,-215.6,-148.8,0,true],
[-175.6,-134.4,-217.6,-127.60000000000001,0,true],
[-176.8,-121.2,-216.8,-106.4,0,true],
[-174.4,-103.60000000000001,-206.8,-76.4,0,true],
[-168.4,-86.4,-192.4,-54.4,0,true],
[-150.0,-73.2,-157.20000000000002,-38.800000000000004,0,true],
[-118.8,-77.2,-116.0,-36.4,0,true],
[-98.0,-82.0,-89.60000000000001,-44.4,0,false],
[-79.60000000000001,-92.0,-58.4,-44.4,0,true],
[-61.6,-116.0,-26.400000000000002,-48.0,0,true],
[-42.4,-134.4,4.0,-56.800000000000004,0,true],
[-15.6,-144.4,25.6,-63.6,0,true],
[4.4,-155.6,52.0,-65.2,0,true],
[14.0,-173.6,86.0,-68.8,0,true],
[27.6,-184.8,114.8,-90.4,0,true],
[46.0,-191.6,122.8,-127.60000000000001,0,true],
[72.0,-192.8,133.6,-152.8,0,false],
[84.8,-202.0,152.0,-180.0,0,true],
[86.8,-216.0,151.20000000000002,-218.4,0,true],
[84.8,-242.0,139.6,-243.6,0,true],
[86.4,-264.0,135.6,-264.0,0,true]]
var rp = [
[110.8,62.610016,-269.2,180.00]]
var startPos = new THREE.Vector3(110.8,62.610016,-276.40000000000003)
var startTheta = 3.141592653589793
var trackFile='./tracks/farm_course/course.glb'
var collisionFile='./tracks/farm_course/kcl.glb'
var vrFile='./tracks/farm_course/vrcorn.glb'
var trackName='farm_course'
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
