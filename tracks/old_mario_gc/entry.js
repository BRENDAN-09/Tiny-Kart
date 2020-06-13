var shadowFile
var cp = [
[96.0,-33.600008,192.0,-33.600016000000004,0,false],
[95.87893600000001,-105.35089599999999,193.93816,-104.689592,0,false],
[99.13588800000001,-156.48160800000002,197.131936,-189.459856,0,true],
[93.568336,-171.306168,145.470856,-283.95716,0,true],
[81.79603999999999,-170.488248,43.650272,-271.769624,0,true],
[75.093072,-160.480016,19.650472,-185.69334400000002,0,true],
[55.421704,-86.365264,18.571952000000003,-170.00695199999998,0,true],
[-29.566808,-91.891216,15.197632,-169.480592,0,true],
[-58.776720000000005,-164.80744,14.446792,-175.557816,0,true],
[-68.315912,-196.76704800000002,16.725360000000002,-249.605184,0,true],
[-75.028776,-203.332456,-50.471000000000004,-299.14487199999996,0,true],
[-87.373856,-205.506984,-134.942296,-276.21056,0,true],
[-101.30165600000001,-197.950624,-172.292248,-208.892216,0,true],
[-95.226296,-170.963456,-156.48524799999998,-147.051504,0,true],
[-55.52844,-123.57136,-137.141296,-115.973352,0,true],
[-81.592224,-60.118168,-144.843344,-86.390304,0,false],
[-88.744056,-41.166992,-156.345832,-24.163496,0,true],
[-60.807968,16.915512,-128.801896,27.378504000000003,0,true],
[-59.164080000000006,87.890912,-130.958976,89.310784,0,false],
[-60.821839999999995,148.95359200000001,-130.570968,149.35890400000002,0,true],
[-67.09617600000001,206.90084,-132.08928,205.610688,0,true],
[-67.47608,233.029344,-132.543216,291.18271999999996,0,true],
[-59.523504,238.69728,-46.921832,319.900496,0,true],
[-53.469504,230.212576,14.9976,271.428624,0,true],
[-59.805271999999995,205.775376,12.686160000000001,201.397528,0,true],
[-68.491864,131.995112,-1.5005519999999999,171.027872,0,true],
[1.806088,92.280344,7.222664,168.529752,0,false],
[41.592496,90.071696,61.659104,170.18031200000001,0,true],
[107.403216,91.556536,111.23782399999999,172.490768,0,true],
[115.77724800000001,87.355952,187.614952,117.186776,0,true],
[103.625536,40.986872000000005,194.825512,40.986864000000004,0,true]]
var rp = [
[144.96,10.56,-20.160008,180.00]]
var startPos = new THREE.Vector3(145.20000000000002,10.56,-29.760016)
var startTheta = 3.141592653589793
var trackFile='./tracks/old_mario_gc/course.glb'
var collisionFile='./tracks/old_mario_gc/kcl.glb'
var vrFile='./tracks/old_mario_gc/vrcorn.glb'
var trackName='old_mario_gc'
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
