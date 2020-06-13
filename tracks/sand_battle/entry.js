var shadowFile = 'tracks/sand_battle/sand_shadow00.png'
var cp = [
]
var rp = [
[-19.414151999999998,80.03172,73.681368,165.00],
[-73.449792,80.017504,19.928896,105.00],
[73.936312,80.036496,18.409736000000002,255.00],
[19.06776,80.018984,73.68269599999999,195.00],
[-54.800456,80.006288,52.6494,135.00],
[53.680872,80.040024,54.181744,225.00],
[21.783496,80.05636,-73.165784,-15.00],
[71.53064,80.02572,-26.196279999999998,-65.00],
[-73.498664,80.02930400000001,-20.085656,75.00],
[-19.514832,80.028336,-73.65196,15.00],
[53.774864,80.05764,-54.223728,-45.00],
[-53.425792,80.02750400000001,-54.294328,45.00]]
var startPos = new THREE.Vector3(21.167848000000003,80.80025599999999,81.383)
var startTheta = 3.4033920413889422
var startPos = new THREE.Vector3(-21.64292,80.800008,-81.49229600000001)
var startTheta = 0.2617993877991494
var startPos = new THREE.Vector3(-81.402144,80.800496,22.168984000000002)
var startTheta = 1.8325957145940461
var startPos = new THREE.Vector3(78.366296,80.800064,-29.386744)
var startTheta = -1.1344640137963142
var startPos = new THREE.Vector3(-59.13801600000001,80.800008,-60.118552)
var startTheta = 0.7853981633974483
var startPos = new THREE.Vector3(-81.338992,80.80048,-22.325752)
var startTheta = 1.3089969389957472
var startPos = new THREE.Vector3(-60.470672,80.800544,58.193616000000006)
var startTheta = 2.356194490192345
var startPos = new THREE.Vector3(-21.598232,80.800408,81.24167200000001)
var startTheta = 2.8797932657906435
var startPos = new THREE.Vector3(59.397792,80.800864,59.898664)
var startTheta = 3.9269908169872414
var startPos = new THREE.Vector3(81.776704,80.800872,20.565824)
var startTheta = 4.4505895925855405
var startPos = new THREE.Vector3(59.459096,80.800008,-60.201968)
var startTheta = -0.7853981633974483
var startPos = new THREE.Vector3(23.911576,80.800008,-81.11815200000001)
var startTheta = -0.2617993877991494
var trackFile='./tracks/sand_battle/course.glb'
var collisionFile='./tracks/sand_battle/kcl.glb'
var vrFile='./tracks/sand_battle/vrcorn.glb'
var trackName='sand_battle'
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
