var shadowFile = 'tracks/castle_course/p_all_kage_n15.png'
var cp = [
[-24.0,383.0,23.6,383.0,0,false],
[-25.2,330.0,22.400000000000002,330.0,0,false],
[-24.400000000000002,291.2,22.400000000000002,291.2,0,true],
[-22.8,255.6,20.8,255.6,0,true],
[-23.2,223.20000000000002,21.6,223.20000000000002,0,true],
[-22.8,192.4,22.8,192.4,0,true],
[-25.6,157.6,23.2,158.0,0,true],
[-22.8,124.8,24.400000000000002,137.6,0,true],
[-3.6,92.4,34.800000000000004,125.60000000000001,0,true],
[27.2,62.800000000000004,48.0,120.0,0,true],
[61.6,50.4,62.0,115.60000000000001,0,false],
[94.0,46.800000000000004,94.4,112.8,0,true],
[134.4,53.2,117.2,118.0,0,true],
[169.6,78.0,124.8,126.4,0,true],
[192.8,119.2,129.2,139.20000000000002,0,true],
[191.6,165.20000000000002,133.6,165.20000000000002,0,true],
[187.6,202.0,129.6,202.0,0,true],
[176.8,237.6,125.60000000000001,218.4,0,true],
[160.4,258.0,110.0,235.6,0,true],
[156.8,265.6,36.0,240.0,0,true],
[152.4,292.0,36.0,291.2,0,true],
[152.0,318.40000000000003,36.0,310.40000000000003,0,true],
[140.8,381.6,36.0,316.0,0,true],
[106.0,403.6,36.0,325.6,0,true],
[52.800000000000004,408.8,33.6,332.0,0,true],
[30.8,410.0,30.400000000000002,332.8,0,true],
[-20.400000000000002,413.6,-21.2,333.2,0,true],
[-64.0,416.8,-64.8,330.8,0,false],
[-83.2,417.6,-124.8,323.6,0,true],
[-86.4,420.0,-172.4,347.2,0,true],
[-92.0,424.0,-196.0,382.0,0,true],
[-93.60000000000001,432.0,-196.0,432.0,0,true],
[-92.8,452.40000000000003,-196.4,452.40000000000003,0,true],
[-92.4,474.0,-194.0,474.0,0,true],
[-92.0,494.8,-197.6,494.40000000000003,0,true],
[-89.60000000000001,504.8,-190.0,524.4,0,true],
[-89.2,510.8,-177.6,565.2,0,true],
[-89.2,520.0,-144.8,602.0,0,true],
[-78.4,524.0,-97.60000000000001,609.6,0,true],
[-65.2,524.0,-62.800000000000004,610.8000000000001,0,false],
[-50.800000000000004,521.2,-32.0,603.2,0,true],
[-43.2,515.6,2.0,582.4,0,true],
[-38.4,508.40000000000003,28.8,541.6,0,true],
[-38.800000000000004,495.6,34.0,496.0,0,true],
[-38.800000000000004,459.2,37.2,459.2,0,true],
[-35.6,418.0,33.2,418.0,0,true]]
var rp = [
[0.0,28.992,392.40000000000003,180.00]]
var startPos = new THREE.Vector3(0.0,28.992,384.40000000000003)
var startTheta = 3.141592653589793
var trackFile='./tracks/castle_course/course.glb'
var collisionFile='./tracks/castle_course/kcl.glb'
var vrFile='./tracks/castle_course/vrcorn.glb'
var trackName='castle_course'
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
