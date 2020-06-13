var shadowFile
var cp = [
]
var rp = [
[0.0,73.39276,-42.4,0.00],
[-37.2,73.46145600000001,21.2,120.00],
[37.2,73.42844000000001,20.8,-120.00],
[-32.8,75.84868,-47.2,-52.00],
[-24.0,75.815016,52.0,67.00],
[57.2,75.84168,-5.2,-170.00],
[-20.0,70.700496,-11.6,-24.00],
[0.0,70.70917600000001,23.2,90.00],
[20.0,70.700496,-11.6,-142.00],
[-55.6,75.856752,-14.8,-9.00],
[14.8,75.856752,55.6,109.00],
[40.800000000000004,75.882352,-40.800000000000004,-128.00]]
var startPos = new THREE.Vector3(-14.8,75.856752,-55.6)
var startTheta = 0.5235987755982988
var startPos = new THREE.Vector3(55.6,75.856752,14.8)
var startTheta = -1.5707963267948966
var startPos = new THREE.Vector3(-40.800000000000004,75.882352,40.800000000000004)
var startTheta = 2.6179938779914944
var startPos = new THREE.Vector3(-6.4,76.656472,-62.0)
var startTheta = 0.2617993877991494
var startPos = new THREE.Vector3(56.0,76.48072,24.8)
var startTheta = -1.8325957145940461
var startPos = new THREE.Vector3(-50.4,76.587064,36.0)
var startTheta = 2.356194490192345
var startPos = new THREE.Vector3(40.800000000000004,75.882344,40.800000000000004)
var startTheta = -2.6179938779914944
var startPos = new THREE.Vector3(-55.6,75.856752,14.8)
var startTheta = 1.5707963267948966
var startPos = new THREE.Vector3(14.8,75.85676,-55.6)
var startTheta = -0.5235987755982988
var startPos = new THREE.Vector3(49.6,76.48588000000001,36.0)
var startTheta = -2.356194490192345
var startPos = new THREE.Vector3(-56.4,76.58794400000001,25.6)
var startTheta = 1.8325957145940461
var startPos = new THREE.Vector3(6.4,76.656472,-62.0)
var startTheta = -0.2617993877991494
var trackFile='./tracks/old_CookieLand_gc/course.glb'
var collisionFile='./tracks/old_CookieLand_gc/kcl.glb'
var vrFile='./tracks/old_CookieLand_gc/vrcorn.glb'
var trackName='old_CookieLand_gc'
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
