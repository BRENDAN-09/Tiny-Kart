var shadowFile = 'tracks/old_falls_ds/all_shadow_b.png'
var cp = [
[-133.440016,-65.008008,-47.904,-65.008,1,false],
[-133.532328,-135.64823199999998,-44.452544,-129.073464,1,false],
[-130.66072,-233.75844,-38.9876,-167.185952,2,true],
[-44.000168,-286.82444,-18.970576,-188.61088800000002,2,true],
[53.553456,-278.183504,15.97404,-187.86808,3,true],
[119.277736,-203.19584,36.674640000000004,-169.08778400000003,3,true],
[123.168024,-132.480016,43.968008000000005,-132.480016,4,true],
[122.11201600000001,-51.696,41.856008,-51.696,4,false],
[144.266936,-17.880232,50.002712,30.406488000000003,5,true],
[207.74956,41.781112,101.11852800000001,54.05096,5,true],
[195.495128,143.785312,104.582544,91.14868,6,true],
[111.15104,206.287984,78.603864,108.94566400000001,6,true],
[21.261416,192.194672,41.722432000000005,96.09236800000001,7,true],
[-31.91336,183.41307999999998,-22.62392,92.495768,7,true],
[-119.02695200000001,148.0592,-34.856568,88.31936,0,true],
[-134.841296,64.713664,-50.825048,62.618336000000006,0,false],
[-133.53234400000002,-1.4048399999999999,-47.99633600000001,-1.404832,0,true]]
var rp = [
[-75.2,89.677904,77.60000000000001,-170.00],
[-72.4,86.272632,-125.2,-180.00],
[-34.4,86.722488,-215.20000000000002,100.00],
[54.4,85.949464,-194.8,38.00],
[70.8,86.489232,-42.4,0.00],
[131.6,90.773808,30.8,20.00],
[90.8,89.832832,140.0,-80.00],
[-4.4,90.315208,126.0,-90.00]]
var startPos = new THREE.Vector3(-101.568,91.23840799999999,-63.84)
var startTheta = 3.141592653589793
var trackFile='./tracks/old_falls_ds/course.glb'
var collisionFile='./tracks/old_falls_ds/kcl.glb'
var vrFile='./tracks/old_falls_ds/vrcorn.glb'
var trackName='old_falls_ds'
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
