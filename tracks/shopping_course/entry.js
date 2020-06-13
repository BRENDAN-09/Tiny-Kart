var shadowFile = 'tracks/shopping_course/sh_shadow.png'
var cp = [
[-160.8,63.2,-87.2,63.2,0,false],
[-160.8,-54.4,-87.2,-54.4,0,false],
[-178.4,-102.4,-68.8,-102.4,0,true],
[-160.0,-135.2,-88.728912,-135.2,0,true],
[-174.4,-181.6,-76.8,-181.6,0,true],
[-174.4,-252.0,-78.4,-252.0,1,true],
[-179.538264,-303.551784,-78.087184,-303.551784,1,true],
[-168.422592,-401.43144,-78.323176,-314.211096,1,true],
[-43.2,-409.6,-43.2,-314.40000000000003,1,true],
[-16.0,-430.40000000000003,-16.0,-308.8,1,false],
[52.0,-444.645312,52.00976,-299.226312,1,true],
[95.2,-431.2,95.2,-307.2,1,true],
[138.557112,-399.15668800000003,138.4,-329.6,1,true],
[190.596784,-399.12262400000003,190.4,-333.6,1,true],
[273.6,-342.40000000000003,203.20000000000002,-320.0,1,true],
[228.4,-232.4,195.6,-311.6,1,true],
[160.0,-221.6,159.763736,-344.484592,2,true],
[128.4,-218.8,128.163736,-344.484592,2,false],
[50.969624,-218.70984,51.145296,-344.573936,2,true],
[10.052456000000001,-219.325112,9.837224,-339.024784,2,true],
[-23.593056,-228.191472,-23.523744,-296.209968,2,true],
[-30.400000000000002,-232.0,-53.805584,-280.55344,2,true],
[-39.072199999999995,-231.63764,-80.080688,-255.93135999999998,2,true],
[-42.4,-224.0,-88.0,-224.0,2,true],
[-40.0,-218.4,-75.2,-180.8,2,true],
[-28.8,-212.0,-36.800000000000004,-160.0,2,true],
[-15.200000000000001,-212.0,-15.200000000000001,-156.8,2,true],
[12.8,-212.0,12.8,-156.8,1,true],
[42.38826400000001,-212.0,42.38826400000001,-156.8,3,true],
[71.2,-214.4,71.2,-157.38532800000002,3,true],
[127.666944,-214.076592,84.070352,-158.18928,3,true],
[178.4,-142.4,80.844216,-142.374456,3,true],
[199.20000000000002,-113.60000000000001,68.0,-113.60000000000001,3,false],
[199.20000000000002,-59.2,67.6,-59.2,3,true],
[172.8,-28.0,92.8,-28.0,3,true],
[172.8,22.400000000000002,92.8,22.400000000000002,3,true],
[173.6,66.4,93.60000000000001,66.4,3,true],
[173.6,194.4,81.391624,134.371968,3,true],
[43.2,193.6,43.2,134.4,3,true],
[-9.6,193.6,-9.6,134.4,3,false],
[-63.2,193.6,-63.2,134.4,3,true],
[-156.0,193.6,-95.2,134.4,3,true],
[-156.0,124.8,-96.0,124.8,3,true],
[-156.0,98.4,-96.0,98.4,3,true],
[-96.320576,-290.918784,-78.72057600000001,-266.057504,1,true],
[-82.72057600000001,-300.457472,-66.72057600000001,-278.857504,1,true],
[-71.520576,-309.257472,-54.312368000000006,-292.018752,1,true],
[-35.802080000000004,-324.254496,-35.70728,-296.425816,1,true]]
var rp = [
[-125.336,8.0784,73.128,180.00],
[2.4,10.637912,-361.6,90.00],
[141.61624799999998,8.081112000000001,-276.374472,-90.00],
[51.710968,24.23792,-197.93244,90.00]]
var startPos = new THREE.Vector3(-125.2,8.0784,64.648)
var startTheta = 3.141592653589793
var trackFile='./tracks/shopping_course/course.glb'
var collisionFile='./tracks/shopping_course/kcl.glb'
var vrFile='./tracks/shopping_course/vrcorn.glb'
var trackName='shopping_course'
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
