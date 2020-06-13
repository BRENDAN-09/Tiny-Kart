var trackFile = "./tracks/swamp/course.glb"
var collisionFile = "./tracks/swamp/kcl.glb"
var trackName = "Cotton Plant Forest"
var trackShadow = "./tracks/swamp/Shadow.jpg"
//var startPos = new THREE.Vector3(183,50,-50)
//var startTheta = -1.6
var numLaps = 3
var floorName = []
var wallName = []
var water, swater, cube, boost
var boosts = []
var materials = [];
var floor = []
var walls = []
var collision = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)
//camera.layers.set(5)

var cp = [
[128.53232,15.983784,128.5472,-77.73346400000001],
[8.816248,17.69788,112.22728000000001,-78.73244],
[-13.611343999999999,-81.38632000000001,103.96272,-83.62224],
[-17.54632,-137.61928,101.37783999999999,-137.62464000000003],
[-21.470568,-187.584952,100.57264,-184.194872],
[-15.820424000000001,-266.68712800000003,96.05256,-220.35584],
[-16.950456,-360.479592,98.88968,-244.65016],
[100.57264,-357.089528,102.83272000000001,-255.3868],
[199.526232,-360.74344,170.79448800000003,-260.182232],
[280.932968,-344.78128000000004,177.17928,-261.778408],
[303.97809600000005,-279.11744,180.8048,-257.64687200000003],
[297.19784000000004,-210.185592,180.8048,-251.99672],
[226.006,-152.55408,177.41472000000002,-245.21648800000003],
[174.02464,-148.03392000000002,107.35288000000001,-238.43631200000002],
[169.504488,-141.253768,97.18256,-144.64384],
[135.60359200000002,-85.88232,91.5324,-141.253768],
[75.712008,-76.84204,75.712016,-141.253768],
[27.120720000000002,-76.84204,27.120720000000002,-140.123768],
[-22.400000000000002,-76.0,-24.0,-141.6],
[-74.4,-70.4,-74.4,-146.4],
[-145.6,-74.4,-103.2,-149.6],
[-203.20000000000002,-110.4,-102.4,-153.6],
[-206.41520000000003,-166.00472,-106.4,-167.20000000000002],
[-208.0,-187.20000000000002,-88.0,-283.2],
[-209.6,-191.20000000000002,-208.0,-288.8],
[-238.4,-192.0,-308.0,-277.6],
[-236.0,-168.0,-304.8,-169.6],
[-207.20000000000002,-124.0,-349.6,-2.4],
[-145.6,-111.2,-272.8,24.0],
[-52.0,-59.2,-218.4,88.0],
[-20.8,-32.0,-65.6,120.8],
[16.037992,-22.453191999999998,18.042744,115.87447999999999],
[56.934864000000005,38.491176,56.53392,106.65264],
[89.41176,41.698776,90.61464,103.846],
[130.7096,40.094976,129.90776,105.44976],
[153.558488,42.029592,158.229592,131.155592],
[177.62072,39.694032,299.10856,128.70488],
[178.42264000000003,36.887384,312.74087199999997,35.283584000000005],
[178.42264000000003,32.87788,299.509528,-67.359568],
[161.411688,25.486048,187.46408,-78.723568]]
var startPos = new THREE.Vector3(134.01992,3.24,-27.436367999999998)
var startTheta = -1.5707963267948966

var rp = [
{x:182.61003992168023,y:17.00004038368651,z:-63.31117491224288,theta:-1.6015000000000001},
{x:179.34597398043786,y:17.000046853419423,z:-111.46380779032084,theta:-1.579443939161603},
{x:147.95202313142283,y:17.00005281452442,z:-155.83084804198558,theta:-2.9745540580432994},
{x:80.138959836652,y:17.00005333015381,z:-159.66855095532384,theta:-3.133231295416268},
{x:12.823831496845372,y:56.71737215864709,z:-162.77324604374007,theta:-3.030186005347606},
{x:-72.8077678794343,y:12.200044878379838,z:-167.94047855405694,theta:-3.068508813069706},
{x:-124.06895387645922,y:19.614347791237307,z:-172.61680506157484,theta:-3.0325233897891173},
{x:-194.86140501078543,y:17.000056843023902,z:-185.81398013830574,theta:-2.863919543842314},
{x:-260.1431973862805,y:17.000063692118424,z:-236.79010829556438,theta:-2.337748155894592},
{x:-324.73890790822446,y:17.00006989134183,z:-282.9294054004605,theta:-2.982787081602916},
{x:-408.5731093847578,y:17.000065528893458,z:-250.460773698168,theta:-4.001394084915743},
{x:-415.58646560917344,y:17.000053921034425,z:-164.06633022560158,theta:-4.809423904642471},
{x:-341.65087993687507,y:17.000046722679432,z:-110.49074214458768,theta:-5.940161798625959},
{x:-271.1708082841073,y:17.000041421694558,z:-71.03681383765286,theta:-5.51322008847811},
{x:-217.45840683012477,y:20.257145491896242,z:3.125094172005774,theta:-5.309302336884659},
{x:-156.66636177493976,y:17.000024156855513,z:57.46114235021465,theta:-6.148636016191917},
{x:-86.96857301911159,y:17.000029152445666,z:20.280191944863688,theta:-6.903324767191213},
{x:-29.68887637107632,y:17.00003043282571,z:10.75063777147349,theta:-6.059105350950501},
{x:32.3979053904858,y:17.000027109736465,z:35.48357474420587,theta:-5.694894171770884},
{x:109.53795355586821,y:17.00002320585144,z:64.53923206396395,theta:-6.457965546757328},
{x:176.9967046578098,y:17.000026545237894,z:39.68499895720722,theta:-7.319624160925175},
{x:184.99928804361625,y:17.000034688444966,z:-20.92289104039703,theta:-7.812046130812095}]
console.log(rp.length);
console.log(cp.length);
//Initiate the THREE js context
scene = new THREE.Scene()

//water
var texLoad = new THREE.TextureLoader()
var waterTex = texLoad.load("./tracks/coolcastle/waterreflection.png");
waterTex.wrapS = THREE.RepeatWrapping;
waterTex.wrapT = THREE.RepeatWrapping;
var waterMat = new THREE.ShaderMaterial({
  uniforms: {map:{value:waterTex},time:{value:0}},
  vertexShader: document.getElementById('vertexShader').textContent,
  fragmentShader: document.getElementById('waterShader').textContent
});
//boost
var boostMat =  new THREE.ShaderMaterial({
  uniforms: {map:{value:boostTex},time:{value:0}},
  vertexShader: document.getElementById('vertexShader').textContent,
  fragmentShader: document.getElementById('boostShader').textContent
});


//lighting
directionalLight = new THREE.DirectionalLight(0xffffff, 2)
directionalLight.castShadow = true
scene.add(directionalLight)
directionalLight.position.y += 6
directionalLight.position.z = 2
directionalLight.position.x = -3
directionalLight.lookAt(0, 0, 0)
var directionalLight2 = new THREE.DirectionalLight(0xffffff, 2)
directionalLight2.castShadow = true
scene.add(directionalLight2)
directionalLight2.position.y += 6
directionalLight2.position.z = -4
directionalLight2.position.x = 3
directionalLight2.lookAt(0, 0, 0)
var ambientlight = new THREE.AmbientLight(0x404040) // soft white light
scene.add(ambientlight)

var texLoad = new THREE.TextureLoader()
var shadowTex;
if(trackShadow!="undefined") shadowTex = texLoad.load(trackShadow)
var boostTex = texLoad.load("./tracks/desert/boost2.jpg");
boostTex.wrapS = THREE.RepeatWrapping;
boostTex.wrapT = THREE.RepeatWrapping;

scene.background = new THREE.CubeTextureLoader()
					.setPath( 'tracks/coolcastle/ely_cloudtop-2/' )
					.load( [ 'ft.jpg', 'bk.jpg', 'up.jpg', 'dn.jpg', 'rt.jpg', 'lf.jpg' ] );

//Load model (track)
loader = new THREE.GLTFLoader()
loader.load(trackFile, function(gltf, err) {
  console.log(err);
  root = gltf.scene;
  root.remove(root.getObjectByName("Cube"))
  gltf.scene.traverse(function(node) {
    if(node instanceof THREE.Mesh && node.geometry.attributes.uv2){
      //console.log(node.material.map instanceof THREE.Texture);
      console.log(`${node.name} has 2 uvs`);
      //console.log(node.material.map);
      var uniforms = {
        shadowMap: {value: shadowTex},
        map: {value: node.material.map},
        time: {value:0}
      }
      //uniforms[ "map" ].value.wrapS = uniforms[ "map" ].value.wrapT = THREE.RepeatWrapping;
      var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent
      });
      node.material = material

      //node.customDepthMaterial = depthMat
      //console.log(node.material);
      //node.layers.set(5)
    }else if (node instanceof THREE.Mesh){
      var flatMat =  new THREE.ShaderMaterial({
        uniforms: {map:{value:node.material.map},time:{value:0}},
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('flatShader').textContent
      })
      node.material = flatMat;
    }
  })
  //collision.add(root)
  //floor = [root.getObjectByName("Road"),root.getObjectByName("Offroad"),root.getObjectByName("Death")]
  scene.add(root);
  //walls = root.getObjectByName("Walls")
  count(3)
  finalize();
  animate()
});

loader.load(collisionFile,function(gltf,err){
  console.log(err);
  root = gltf.scene;
  root.traverse(function(node){
    if(node.name[0]=="r"){
      node.name = node.name.toUpperCase();
      node.speed = 1;
      floor.push(node);
    }
    if(node.name[0]=="o"){
      node.name = node.name.toUpperCase();
      node.speed = 0.4;
      floor.push(node);
    }
    if(node.name.substring(0,4)=="fall"){
      node.name = "D" + node.name;
      floor.push(node);
    }
    if(node.name[0]=="w"){
      walls.push(node);
    }
    if(node.name.substring(0,4)=='fast'){
      node.name = "B" + node.name
      boosts.push(node.name);
      floor.push(node);
    }
    node.layers.set(5);
  })
  scene.add(root)
})


function finalize(){
  //double sided leaves
  /*water = scene.getObjectByName("Water")
  water.material = waterMat
  boost = scene.getObjectByName("ef_arrowBumpS")
  boost.material = boostMat;
  /*water = scene.getObjectByName("DWater")
  swater = scene.getObjectByName("DSideWater")
  water.material = waterMat
  swater.material = waterMat
  boostMat.uniforms.map.value = scene.getObjectByName("BCanyonBoost").material.map;
  boosts.forEach(element=>scene.getObjectByName(element).material=boostMat)*/
}

function update(){
  //waterMat.uniforms.time.value += 0.01;
  //boostMat.uniforms.time.value += 0.04;
  //materials.forEach(element=>element.uniforms.time.value+=0.02);

}
