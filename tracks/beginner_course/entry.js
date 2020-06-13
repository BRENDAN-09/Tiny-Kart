var shadowFile = 'tracks/beginner_course/shadowMapY.png'
var cp = [
[-204.0,204.8,-130.8,204.8,0,false],
[-204.0,156.0,-130.8,156.0,0,false],
[-228.430528,110.15322400000001,-130.8,109.920328,0,true],
[-228.608472,45.564271999999995,-130.609376,64.024144,0,true],
[-181.88676800000002,-44.609784,-128.495024,52.38994400000001,0,true],
[-108.78203200000002,-76.020736,-76.834824,41.253856,0,true],
[-46.054032,-102.067936,-8.531792,24.0,0,false],
[12.455,-128.913696,44.960767999999995,-17.346975999999998,0,true],
[137.628488,-107.736664,70.76859200000001,-13.596064,0,true],
[203.74016,-19.758608,95.26856,12.528976,0,true],
[154.615248,86.863688,84.54528,31.1902,0,false],
[122.316568,135.714168,44.739864000000004,71.71916800000001,0,true],
[81.490088,183.56049600000003,5.938776,117.002752,0,true],
[45.102288,222.76964,-35.70628,163.485232,0,true],
[26.7968,245.310296,-69.663128,228.09734400000002,0,true],
[21.875912,284.543968,-69.81875199999999,284.69928000000004,0,false],
[13.871864,338.30672,-69.34036,337.97193599999997,0,true],
[-11.581368000000001,414.895504,-90.173944,343.99496800000003,0,true],
[-96.8,452.0,-96.8,344.0,0,true],
[-180.756832,421.064096,-104.38351200000001,343.98984,0,true],
[-207.37234400000003,337.82644,-132.337232,337.82644,0,false],
[-207.891184,284.33631199999996,-132.648528,284.33631199999996,0,true],
[-207.891184,236.0,-132.648528,236.0,0,true]]
var rp = [
[-160.92000000000002,3.783448,214.0,180.00]]
var startPos = new THREE.Vector3(-160.92000000000002,3.763056,206.0)
var startTheta = 3.141592653589793
var trackFile='./tracks/beginner_course/course.glb'
var collisionFile='./tracks/beginner_course/kcl.glb'
var vrFile='./tracks/beginner_course/vrcorn.glb'
var trackName='beginner_course'
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
//loadVrcorn(vrFile)


function finalize(){

}
//called every frame
function update(){

}
