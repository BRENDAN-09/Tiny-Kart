var shadowFile = 'tracks/factory_course/kage01.png'
var cp = [
[-276.8,-157.6,-167.6,-157.6,0,false],
[-280.0,-238.0,-167.6,-238.0,0,false],
[-252.0,-282.8,-192.0,-269.2,0,true],
[-195.20000000000002,-332.8,-174.8,-276.40000000000003,0,true],
[-158.8,-334.0,-158.8,-281.6,1,true],
[-72.0,-334.0,-72.0,-281.6,1,true],
[16.4,-334.0,16.4,-281.6,1,true],
[94.0,-334.0,94.0,-281.6,2,true],
[157.20000000000002,-310.0,111.2,-279.2,2,true],
[168.8,-241.6,110.8,-241.6,2,false],
[168.8,-164.4,111.2,-164.4,3,true],
[169.20000000000002,-46.0,111.2,-46.0,3,true],
[168.8,38.0,111.2,38.0,4,true],
[152.4,151.20000000000002,112.4,105.60000000000001,4,true],
[60.800000000000004,148.4,90.4,105.60000000000001,4,true],
[30.400000000000002,80.8,89.60000000000001,80.8,4,true],
[23.2,28.8,60.4,-33.2,4,true],
[5.2,30.0,-55.2,-30.400000000000002,4,true],
[0.4,46.800000000000004,-54.4,81.60000000000001,4,true],
[18.0,71.2,-10.0,105.2,4,true],
[44.0,104.0,10.4,115.2,4,true],
[96.4,188.8,11.6,134.8,4,true],
[-16.4,231.20000000000002,-17.2,131.2,4,true],
[-62.800000000000004,237.20000000000002,-62.800000000000004,131.2,5,false],
[-153.6,236.0,-153.20000000000002,130.8,5,true],
[-264.4,204.8,-160.4,124.8,5,true],
[-270.0,114.0,-166.4,113.60000000000001,5,true],
[-270.0,83.60000000000001,-170.4,83.60000000000001,5,true],
[-272.0,17.6,-170.4,18.400000000000002,0,true],
[-278.8,-38.4,-169.20000000000002,-39.2,0,true]]
var rp = [
[-220.0,16.000008,-148.4,180.00],
[-130.592184,28.073128,-308.491872,90.00],
[139.269096,28.381912,-281.39528,0.00],
[145.6,13.599976000000002,-133.2,0.00],
[140.0,10.399976,55.2,0.00],
[-127.60000000000001,18.414976,172.8,-90.00]]
var startPos = new THREE.Vector3(-220.0,16.000008,-156.4)
var startTheta = 3.141592653589793
var trackFile='./tracks/factory_course/course.glb'
var collisionFile='./tracks/factory_course/kcl.glb'
var vrFile='./tracks/factory_course/vrcorn.glb'
var trackName='factory_course'
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
