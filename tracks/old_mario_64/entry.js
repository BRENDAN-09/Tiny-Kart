var shadowFile = 'tracks/old_mario_64/m64_shadow.png'
var cp = [
[-297.6,-84.8,-209.6,-84.8,0,false],
[-297.6,-112.8,-209.6,-112.8,0,false],
[-329.6,-184.8,-209.6,-136.0,0,true],
[-253.6,-355.2,-203.89634400000003,-139.495096,1,true],
[-32.8,-247.20000000000002,-200.0,-136.0,1,true],
[26.047824000000002,-187.02472,-201.693232,0.932568,1,false],
[37.492832,-179.48435999999998,-49.6,68.0,2,true],
[47.2,-176.8,94.333168,23.90116,2,true],
[51.2,-179.20000000000002,157.6,-117.60000000000001,3,true],
[108.0,-220.8,162.57479999999998,-119.38511199999999,3,true],
[196.8,-237.6,165.6,-116.8,3,true],
[295.2,-208.8,166.4,-114.4,3,true],
[298.40000000000003,-79.2,125.60000000000001,-28.0,3,true],
[299.2,16.8,173.6,16.8,3,true],
[299.2,82.4,175.20000000000002,82.4,3,true],
[311.2,160.0,176.8,160.0,3,false],
[272.8,346.40000000000003,172.0,167.20000000000002,3,true],
[98.4,345.6,167.20000000000002,166.4,3,true],
[24.8,234.4,163.20000000000002,157.6,3,true],
[27.2,207.20000000000002,168.0,15.200000000000001,4,true],
[7.2,136.8,8.0,-118.4,4,true],
[-71.2,136.0,-72.0,23.2,4,false],
[-158.4,136.0,-160.8,24.8,4,true],
[-254.4,137.6,-187.20000000000002,13.6,4,true],
[-361.6,-3.2,-204.0,-3.2,4,true],
[-309.6,-39.2,-206.4,-39.2,0,true]]
var rp = [
[-232.743408,27.2,-75.168,180.00],
[-83.350504,29.175991999999997,-160.09264000000002,-13.00],
[42.41780000000001,32.643424,-52.732504,82.00],
[177.518064,22.027696,-178.44576800000002,58.00],
[14.299272000000002,14.04824,76.738208,-90.00]]
var startPos = new THREE.Vector3(-232.599408,27.2,-83.168)
var startTheta = 3.141592653589793
var trackFile='./tracks/old_mario_64/course.glb'
var collisionFile='./tracks/old_mario_64/kcl.glb'
var vrFile='./tracks/old_mario_64/vrcorn.glb'
var trackName='old_mario_64'
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
