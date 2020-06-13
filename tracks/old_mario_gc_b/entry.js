var shadowFile
var cp = [
[-96.0,33.6,-192.0,33.6,0,false],
[-95.87893600000001,105.35088800000001,-193.93816800000002,104.689576,0,false],
[-99.135896,156.481592,-197.13195199999998,189.45984,0,true],
[-93.568352,171.30616,-145.470888,283.95716,0,true],
[-81.796048,170.48823199999998,-43.650296000000004,271.769592,0,true],
[-75.09308,160.480016,-19.650488000000003,185.69334400000002,0,true],
[-55.421712,86.365256,-18.571968000000002,170.006936,0,true],
[29.5668,91.891216,-15.197648,169.480592,0,true],
[58.776704,164.80744,-14.446808,175.557816,0,true],
[68.315888,196.767032,-16.725384,249.60516800000002,0,true],
[75.02875999999999,203.33244000000002,50.470968,299.14487199999996,0,true],
[87.373832,205.506968,134.942264,276.210528,0,true],
[101.30164,197.950624,172.29223199999998,208.892232,0,true],
[95.22628,170.963456,156.485232,147.051512,0,true],
[55.528424,123.57136,137.14128,115.97336,0,true],
[81.59221600000001,60.118176,144.843344,86.39031200000001,0,false],
[88.74404799999999,41.166992,156.34581599999999,24.163504,0,true],
[60.807968,-16.915504000000002,128.801896,-27.378496,0,true],
[59.164080000000006,-87.89090399999999,130.958984,-89.310768,0,false],
[60.821848,-148.953576,130.570976,-149.35887200000002,0,true],
[67.096192,-206.900832,132.08929600000002,-205.610656,0,true],
[67.476104,-233.02932800000002,132.543248,-291.18268800000004,0,true],
[59.52352,-238.697264,46.921856,-319.900496,0,true],
[53.469512,-230.212576,-14.997575999999999,-271.42859200000004,0,true],
[59.805288000000004,-205.77535999999998,-12.686144,-201.397512,0,true],
[68.491864,-131.995112,1.5005680000000001,-171.027856,0,true],
[-1.80608,-92.28033599999999,-7.222656,-168.529752,0,false],
[-41.592487999999996,-90.071688,-61.659088000000004,-170.18031200000001,0,true],
[-107.4032,-91.556536,-111.23780000000001,-172.49078400000002,0,true],
[-115.77723200000001,-87.35596000000001,-187.614936,-117.186792,0,true],
[-103.625528,-40.98688,-194.825512,-40.98688,0,true]]
var rp = [
[-144.0,10.56,-16.0,0.00]]
var startPos = new THREE.Vector3(-144.391816,10.56,16.112944)
var startTheta = 0.0
var trackFile='./tracks/old_mario_gc_b/course.glb'
var collisionFile='./tracks/old_mario_gc_b/kcl.glb'
var vrFile='./tracks/old_mario_gc_b/vrcorn.glb'
var trackName='old_mario_gc_b'
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
