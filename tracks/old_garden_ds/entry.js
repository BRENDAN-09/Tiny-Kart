var shadowFile
var cp = [
[-57.599992,174.42579999999998,57.600016000000004,174.42579999999998,0,false],
[-57.6,105.60001600000001,115.200016,105.60000000000001,1,false],
[-71.999992,86.400008,115.20000800000001,-43.200008000000004,1,true],
[-91.199992,62.400008,33.599992,-115.20000800000001,2,true],
[-115.2,52.80001600000001,-115.200016,-95.999992,2,true],
[-183.94134400000002,63.6552,-183.94134400000002,-38.399983999999996,2,true],
[-322.56,63.360032000000004,-201.600016,-43.199984,2,true],
[-322.855184,-68.265512,-207.05175200000002,-68.26552000000001,2,false],
[-322.855184,-137.00690400000002,-206.641408,-137.00692,2,true],
[-322.722872,-265.30116,-190.128376,-143.48406400000002,2,true],
[-245.505424,-327.95028,-178.495096,-144.058112,2,true],
[-155.873016,-328.32,-156.433936,-144.0,2,true],
[-72.761608,-328.32,-73.06639200000001,-144.00001600000002,2,true],
[12.389144,-328.32,12.295672000000001,-144.00001600000002,2,true],
[90.098688,-328.91044,90.229472,-143.73147200000002,2,false],
[161.358128,-328.97172,161.02332800000002,-144.000032,2,true],
[305.28000000000003,-296.442472,174.469392,-140.54520000000002,2,true],
[330.944816,-141.40618400000002,178.55998400000001,-128.288016,2,true],
[335.117936,-57.132408000000005,178.56,-57.029704,2,true],
[336.155872,23.5076,178.56,23.039984,3,true],
[322.56,108.639976,185.928264,108.639992,4,false],
[311.745968,183.72681599999999,198.93183199999999,184.319984,5,true],
[288.000064,305.28000000000003,211.318544,224.64000000000001,6,true],
[161.840032,305.280032,161.840032,224.64000000000001,6,true],
[88.96003200000001,305.280032,89.120024,224.64000000000001,6,false],
[-51.999976000000004,305.280032,57.760024,224.640016,0,true],
[-51.999984,201.600016,57.600024,201.600016,0,true]]
var rp = [
[1.6e-05,115.199992,183.6258,180.00],
[-28.0,115.199992,56.0,225.00],
[-60.0,115.199992,0.0,270.00],
[256.60228,115.2,52.23588,25.00],
[269.11852799999997,115.199984,123.161584,-45.00],
[244.32772,115.199984,206.712528,25.00],
[259.794872,115.199984,264.172592,-90.00]]
var startPos = new THREE.Vector3(1.6e-05,115.199992,175.6258)
var startTheta = 3.141592653589793
var trackFile='./tracks/old_garden_ds/course.glb'
var collisionFile='./tracks/old_garden_ds/kcl.glb'
var vrFile='./tracks/old_garden_ds/vrcorn.glb'
var trackName='old_garden_ds'
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
