var trackFile = "./tracks/cotton/course2.glb"
var collisionFile = "./tracks/cotton/kcl.glb"
var trackName = "Cotton Plant Forest"
var trackShadow = "./tracks/cotton/Shadow2.png"
var startPos = new THREE.Vector3(183,50,-50)
var startTheta = -1.6
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
[126.28088000000001,-63.84084,408.995184,-63.84084],
[121.64952000000001,-75.38888800000001,369.046408,-231.230232],
[113.67144,-83.0596,230.545688,-332.853592],
[77.972072,-81.36216,84.75224,-339.009032],
[12.430328,-79.10210400000001,12.430328,-349.17928000000006],
[-73.451952,-71.191896,-72.32192,-329.968816],
[-127.69336,-59.891591999999996,-120.9132,-302.848096],
[-209.48520000000002,-96.68544,-180.27816,-283.385032],
[-284.295592,-216.43584,-236.377128,-258.35144],
[-329.08984000000004,-254.33576800000003,-319.651032,-321.53568800000005],
[-375.84272,-228.77856,-436.294872,-267.93359200000003],
[-383.84616,-176.67128,-445.89487199999996,-151.59616],
[-328.600096,-141.35536,-354.78344,-76.14288],
[-244.58728,-99.36384,-292.21016,-46.807311999999996],
[-147.07808,-44.377016000000005,-296.692,57.056160000000006],
[-126.79144000000001,-31.697864000000003,-195.258872,176.24016],
[-106.84072,-37.441288,-29.162032,180.04384],
[-34.233696,-67.199472,-17.750808000000003,177.50807999999998],
[51.984496,-38.037432,-3.803744,177.50807999999998],
[103.96896000000001,-27.89412,116.64816,180.04384],
[117.06175999999999,-31.835752,272.601592,153.417688],
[129.32728,-43.109096,368.687376,51.984496]]

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
					.setPath( 'tracks/cotton/ely_hills2/' )
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
  count(3);
  finalize();
  animate();
});

loadKcl(collisionFile)


function finalize(){
  //double sided leaves
  scene.getObjectByName("Tex023").material.side = THREE.DoubleSide
  scene.getObjectByName("Boost").material = boostMat
  scene.getObjectByName("water").material = waterMat
  scene.getObjectByName("Vtaki").material = waterMat
  scene.getObjectByName("crystal").material = boostMat
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
  waterMat.uniforms.time.value += 0.01;
  boostMat.uniforms.time.value += 0.04;
  //materials.forEach(element=>element.uniforms.time.value+=0.02);

}
