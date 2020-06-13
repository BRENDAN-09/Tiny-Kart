var shadowFile = 'tracks/old_heyho_gba/hey_shadow.png'
var cp = [
[114.04628,76.353264,201.939624,76.439784,0,false],
[86.33783199999999,10.168536,207.619984,5.551456,0,false],
[82.91165600000001,-44.733008000000005,208.20644000000001,-54.01488,1,true],
[100.089168,-94.244648,208.20644000000001,-97.303008,1,true],
[114.67272,-128.420176,210.227312,-152.850264,1,true],
[113.71356,-139.58336,176.68957600000002,-224.489296,2,true],
[101.697816,-141.480248,100.953496,-212.083128,2,true],
[50.669352,-75.811696,54.619288000000005,-224.59164,2,false],
[-13.239896000000002,-55.695576,-8.303647999999999,-243.02449600000003,3,true],
[-77.61710400000001,-95.41366400000001,-78.921712,-245.51816,3,true],
[-121.60000000000001,-165.20000000000002,-122.8,-221.6,3,true],
[-148.4,-159.6,-187.20000000000002,-217.20000000000002,4,true],
[-168.8,-141.6,-232.0,-183.6,4,true],
[-164.8,-103.2,-233.20000000000002,-102.4,4,true],
[-160.0,-53.2,-222.4,-68.8,4,true],
[-116.0,-115.60000000000001,-120.8,-168.4,5,true],
[-128.4,-113.60000000000001,-149.20000000000002,-162.0,5,true],
[-137.20000000000002,-110.0,-170.8,-142.4,5,true],
[-144.0,-96.0,-166.4,-103.2,5,true],
[-137.6,-48.800000000000004,-161.6,-53.6,5,true],
[-135.26218400000002,-23.02092,-242.450576,-36.649472,6,false],
[-187.20000000000002,47.2,-272.24037599999997,36.591328000000004,6,true],
[-169.60790400000002,78.940968,-272.11684,92.915112,6,true],
[-167.41748800000002,115.166928,-248.587128,194.247504,7,true],
[-139.787128,145.43724799999998,-146.415888,223.034048,7,true],
[-68.902664,117.119656,-60.265576,272.79316,7,false],
[-26.926544000000003,136.15864000000002,-5.48676,248.23751199999998,8,true],
[22.51056,121.34808000000001,55.855136,252.705512,8,true],
[71.957248,111.083208,136.608328,261.847232,8,true],
[89.984752,97.739272,217.33100000000002,179.329096,0,true]]
var rp = [
[160.000112,24.0,85.71316800000001,180.00],
[146.72762400000002,24.000032,-35.296712,-178.00],
[92.024976,24.000032,-171.991328,-95.00],
[-46.879208,24.000032,-186.4762,-85.00],
[-191.673216,24.000032,-148.159904,-2.00],
[-123.2,24.000032,-147.6,-52.00],
[-203.419608,24.000032,-10.572496,-35.00],
[-178.0,24.000032,170.8,80.00],
[-6.708456,24.000032,188.56879999999998,73.00]]
var startPos = new THREE.Vector3(160.48,24.0,77.84)
var startTheta = 3.141592653589793
var trackFile='./tracks/old_heyho_gba/course.glb'
var collisionFile='./tracks/old_heyho_gba/kcl.glb'
var vrFile='./tracks/old_heyho_gba/vrcorn.glb'
var trackName='old_heyho_gba'
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
