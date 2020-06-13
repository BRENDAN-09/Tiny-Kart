var shadowFile = 'tracks/venice_battle/saku_kage.png'
var cp = [
]
var rp = [
[-152.0,29.351088,-34.4,90.00],
[-152.0,29.3348,93.60000000000001,90.00],
[-152.0,29.343799999999998,16.8,90.00],
[-152.0,29.33976,42.4,90.00],
[128.0,29.631232,42.4,-90.00],
[128.0,29.64028,16.8,-90.00],
[-152.0,29.346656,-8.8,90.00],
[-152.0,29.337288,68.0,90.00],
[128.0,29.6034,93.60000000000001,-90.00],
[128.0,29.667112000000003,-34.4,-90.00],
[128.0,29.612856,68.0,-90.00],
[128.0,29.653904,-8.8,-90.00],
[-26.889712,56.860992,64.919848,90.00],
[11.928128000000001,56.855584,-15.312928,-90.00],
[8.465936,56.860976,65.021432,-90.00],
[-26.110048,56.855656,-14.780488,90.00],
[-24.760104,56.863312,99.68116800000001,180.00],
[10.8,56.854256,-35.2,0.00],
[-26.551152,56.859776,46.794648,90.00],
[9.796048,56.85768,15.910984000000001,-90.00],
[7.449032,56.863192000000005,98.05552,180.00],
[-26.8,56.854312,-34.800000000000004,0.00],
[9.776808,56.859728000000004,46.390608,-90.00],
[-26.907632000000003,56.857735999999996,16.37848,90.00],
[-89.07816000000001,75.19996,-106.922264,135.00],
[74.03083199999999,75.199992,-282.140592,-45.00],
[72.76452,75.199992,-107.083512,-135.00],
[-89.06760000000001,75.199944,-280.54665600000004,45.00],
[-37.671208,75.199992,-107.01496,180.00],
[26.167288000000003,75.199984,-283.26065600000004,0.00],
[-88.94460799999999,75.199944,-156.18964000000003,90.00],
[73.739504,75.199928,-234.37049600000003,-90.00],
[23.875992,75.2,-105.92552800000001,180.00],
[-44.672248,75.199984,-282.34728,0.00],
[73.793152,75.199992,-138.71034400000002,-90.00],
[-88.701504,75.19995200000001,-253.23856,90.00]]
var startPos = new THREE.Vector3(-152.0,29.351088,-34.4)
var startTheta = 1.5707963267948966
var startPos = new THREE.Vector3(-152.0,29.3348,93.60000000000001)
var startTheta = 1.5707963267948966
var startPos = new THREE.Vector3(-152.0,29.343799999999998,16.8)
var startTheta = 1.5707963267948966
var startPos = new THREE.Vector3(-152.0,29.33976,42.4)
var startTheta = 1.5707963267948966
var startPos = new THREE.Vector3(-152.0,29.346656,-8.8)
var startTheta = 1.5707963267948966
var startPos = new THREE.Vector3(-152.0,29.337288,68.0)
var startTheta = 1.5707963267948966
var startPos = new THREE.Vector3(128.0,29.6034,93.60000000000001)
var startTheta = -1.5707963267948966
var startPos = new THREE.Vector3(128.0,29.667112000000003,-34.4)
var startTheta = -1.5707963267948966
var startPos = new THREE.Vector3(128.0,29.631232,42.4)
var startTheta = -1.5707963267948966
var startPos = new THREE.Vector3(128.0,29.64028,16.8)
var startTheta = -1.5707963267948966
var startPos = new THREE.Vector3(128.0,29.612856,68.0)
var startTheta = -1.5707963267948966
var startPos = new THREE.Vector3(128.0,29.653904,-8.8)
var startTheta = -1.5707963267948966
var trackFile='./tracks/venice_battle/course.glb'
var collisionFile='./tracks/venice_battle/kcl.glb'
var vrFile='./tracks/venice_battle/vrcorn.glb'
var trackName='venice_battle'
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
