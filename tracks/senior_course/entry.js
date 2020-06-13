var shadowFile = 'tracks/senior_course/senior_shadow01.png'
var cp = [
[-0.86876,110.0,-0.86876,56.0,0,false],
[-53.966984,110.70760000000001,-53.966984,56.707616,0,false],
[-97.808176,120.0,-97.808176,64.0,0,true],
[-140.26452799999998,141.523064,-140.0,72.0,0,true],
[-197.173128,141.52308,-188.0,76.0,0,true],
[-255.482408,101.61923200000001,-199.238472,58.639559999999996,0,true],
[-278.04062400000004,44.0,-202.857704,48.081312,0,true],
[-248.0,-8.0,-202.218144,37.101631999999995,0,true],
[-208.503872,-55.023192,-167.09988800000002,37.013456,0,false],
[-144.0,-60.0,-144.0,31.6,1,true],
[-104.0,-92.0,-104.0,31.6,1,true],
[-60.0,-92.0,-60.0,31.6,1,true],
[-8.0,-92.0,-8.0,31.6,1,true],
[40.0,-92.0,40.0,31.6,1,true],
[88.0,-92.0,88.0,31.6,1,true],
[136.0,-70.8,135.76507999999998,20.0,1,false],
[181.98516,-70.600008,181.813832,-11.258848,1,true],
[243.36732800000001,-16.843816,187.860544,-4.01048,1,true],
[208.03172,55.1712,181.82264,4.8591679999999995,1,true],
[183.593512,55.240808,133.842296,36.015512,1,true],
[173.02444,99.302456,123.04632000000001,77.59590399999999,1,true],
[152.8,135.2,122.92743200000001,135.195968,1,true],
[152.8,180.4,122.92743200000001,180.395968,1,false],
[177.6,222.4,122.92743200000001,222.395968,1,true],
[196.0,269.2,122.92743200000001,269.19587199999995,1,true],
[160.0,332.0,126.92743200000001,277.595872,1,true],
[88.0,332.0,118.92743200000001,277.595872,1,true],
[49.2,269.2,122.92743200000001,269.19587199999995,1,true],
[72.4,222.4,122.92743200000001,222.395968,1,true],
[91.60000000000001,175.6,122.92743200000001,175.595968,0,false],
[91.77116000000001,132.202216,122.92743200000001,113.195968,0,true],
[68.933616,119.76881600000002,88.412264,65.61839200000001,0,true],
[36.620584,111.005968,36.620584,61.292832000000004,0,true]]
var rp = [
[8.33124,8.0,80.171512,-90.00],
[-136.0,16.0,-28.250040000000002,90.00]]
var startPos = new THREE.Vector3(0.33124000000000003,8.0,80.171512)
var startTheta = -1.5707963267948966
var trackFile='./tracks/senior_course/course.glb'
var collisionFile='./tracks/senior_course/kcl.glb'
var vrFile='./tracks/senior_course/vrcorn.glb'
var trackName='senior_course'
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
