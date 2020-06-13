var shadowFile = 'tracks/kinoko_course/kage.png'
var cp = [
[113.68356,365.405592,200.88359200000002,365.405592,0,false],
[100.8,312.0,204.0,312.0,1,false],
[94.0,240.8,207.20000000000002,276.0,1,true],
[87.2,218.8,214.4,186.4,1,true],
[75.60000000000001,205.20000000000002,177.20000000000002,130.0,2,true],
[44.800000000000004,198.0,107.2,110.4,2,true],
[30.8,88.4,104.8,88.4,2,false],
[30.849016,28.912256000000003,114.72188000000001,27.266223999999998,3,true],
[29.2,5.6000000000000005,110.8,-53.6,3,true],
[16.4,-2.0,6.4,-87.60000000000001,4,true],
[-24.0,-4.8,-52.800000000000004,-72.0,4,true],
[-75.60000000000001,12.8,-102.8,-53.2,4,true],
[-125.60000000000001,34.4,-152.0,-34.0,4,true],
[-176.0,53.6,-201.6,-16.0,5,true],
[-220.0,72.8,-245.6,0.0,5,true],
[-4.8,27.2,-65.2,18.8,4,true],
[3.6,121.2,-71.60000000000001,57.2,4,true],
[-65.6,197.6,-84.979288,73.76605599999999,4,true],
[-153.6,187.6,-126.8,72.4,5,true],
[-209.20000000000002,163.6,-176.8,64.8,5,true],
[-242.8,126.8,-224.0,12.8,5,true],
[-260.8,120.8,-280.0,11.200000000000001,5,true],
[-283.170032,128.724608,-408.524184,91.876352,5,true],
[-260.634032,156.32416,-413.459312,246.807128,6,false],
[-227.600592,166.1492,-321.314816,345.061184,6,true],
[-147.91118400000002,192.91914400000002,-268.8,403.6,6,true],
[-94.0,210.0,-244.8,445.2,7,true],
[-25.6,216.8,-211.20000000000002,474.0,7,true],
[20.400000000000002,261.2,-166.8,481.6,7,true],
[58.4,325.2,-112.0,485.6,8,false],
[97.2,401.6,-42.0,506.0,8,true],
[98.4,457.2,-10.8,541.6,8,true],
[102.8,469.2,96.8,612.8000000000001,9,true],
[114.0,468.40000000000003,215.6,531.2,9,true],
[121.2,437.6,218.8,439.6,9,true],
[122.0,388.40000000000003,209.20000000000002,388.40000000000003,0,true]]
var rp = [
[144.0,92.8,375.2,180.00],
[140.0,93.111,291.2,170.00],
[74.0,106.683656,142.4,180.00],
[72.8,105.4978,9.200000000000001,-160.00],
[-13.6,113.537232,-36.0,-60.00],
[-222.4,114.913576,63.2,-80.00],
[-313.2,137.646424,201.20000000000002,42.00],
[-199.05083199999999,115.859568,326.392312,58.00],
[40.4,99.878536,408.0,30.00],
[130.0,98.951112,510.8,148.00]]
var startPos = new THREE.Vector3(144.256,92.8,366.92)
var startTheta = 3.141592653589793
var trackFile='./tracks/kinoko_course/course.glb'
var collisionFile='./tracks/kinoko_course/kcl.glb'
var vrFile='./tracks/kinoko_course/vrcorn.glb'
var trackName='kinoko_course'
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
