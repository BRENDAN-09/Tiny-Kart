var trackFile = "./tracks/alpine/course.glb"
var collisionFile = "./tracks/alpine/kcl.glb"
var trackName = "Cool Castle Canyon"
var trackShadow = "./tracks/blizzard/shadow.png"
var startPos = new THREE.Vector3(117,200,-124)
var startTheta = -1.6
var numLaps = 3
var water, swater, cube, boost
var boosts = []
var materials = [];
var floor = []
var walls = []
var collision = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)
//camera.layers.set(5)

var cp = [
  [-40.5326442247036,5.317837933604693,50.24369283961133,3.675888684379359],
  [-29.97725619396931,52.69980198267862,46.25610180577837,15.63866178587822],
  [-26.693357695518642,87.88442875179294,79.79877932566734,87.41530039487141],
  [-26.693357695518614,91.8720197856259,54.465848051905056,174.90773896073563],
  [-29.74269201550854,89.05724964409674,-98.93912466143334,178.19163745918632],
  [-25.051408446293266,81.55119593335235,-147.2593454243503,124.71100477013258],
  [-22.705766661685658,66.77365269032435,-149.3704230304972,9.539993145898407],
  [-13.323199523255198,52.934366161139394,-69.38403817537733,-69.5081349953784],
  [65.95949279648241,28.7742557796809,-3.4715040279031655,-70.2118275307607],
  [134.92136126394647,-38.07653508163628,31.47855856275038,-104.92732594295347],
  [159.78516418078723,-129.3220005028727,44.61415255655305,-162.39554966584018],
  [132.34115530087806,-263.2581464039678,26.787274993535135,-176.46940037348588],
  [18.57752874740845,-328.23242383759896,18.342964568947707,-172.48180933965293],
  [-54.60649493234929,-313.4548805945709,-57.421265073878445,-182.5680690134657],
  [-102.45758733834478,-313.4548805945709,-114.1857962613829,-177.40765708732894],
  [-105.27235747987393,-315.5659582007178,-240.61588845173364,-330.3435014437458],
  [-72.19880831690645,-324.9485253391483,-112.77841119061827,-426.9839429695798],
  [-37.014181547792134,-328.93611637298125,18.57752874740845,-418.53963254499234],
  [-42.409157652389666,-290.2330269269555,57.74974655035575,-300.08472242230755],
  [-70.59477590653188,-223.33055780050807,79.23398084140427,-225.54695952754855],
  [-95.86175559479335,-162.15787013419092,85.43990567711768,-169.69363600612854],
  [-87.88270937744761,-89.90317383267137,84.11006464089343,-103.20158419491423],
  [62.70085155749294,-3.3868201940004496,-68.86985529742316,-2.536147520369525]
]

var rp = [
  {x:-0.12945586786985072,y:-1.7940557756121533,z:4.427303961902726,theta:1.6},
{x:5.98390806160589,y:-5.346846243471485,z:34.39811664161171,theta:0.9740533280530818},
{x:39.512250186015,y:-7.998100100868815,z:87.37559201886617,theta:1.268393132294454},
{x:30.715782439329345,y:-19.0886161533711,z:150.4136643117906,theta:2.3359496028266133},
{x:-68.19460797460167,y:-43.80487646619433,z:138.65481190819918,theta:4.299245841906556},
{x:-80.2246856452877,y:-45.31386177886038,z:101.46561136176146,theta:4.493870901567968},
{x:-89.08902006553053,y:-51.849370029435974,z:37.03103274982321,theta:4.99430059857624},
{x:-39.26371194404268,y:-51.84937138478757,z:-2.5660835562649797,theta:6.010589436732089},
{x:31.078433377889983,y:-46.31060094389012,z:-20.266933465436395,theta:5.684380949509532},
{x:82.17962783748003,y:-23.40031615705657,z:-71.75775262843801,theta:4.976691458556746},
{x:97.68243733798955,y:-16.00062580481986,z:-146.6602494924966,theta:4.939944151839684},
{x:83.48835508392115,y:-9.692557999631077,z:-223.025427041096,theta:4.024182345918756},
{x:18.644196381634586,y:-13.720752071956381,z:-239.57114682191838,theta:3.200285925072965},
{x:-55.783918217841716,y:-4.602497756951854,z:-244.4018244883695,theta:3.1392023979932877},
{x:-107.58573103108785,y:14.933350627029595,z:-245.8875045090337,theta:3.3839824085297767},
{x:-165.699714603364,y:2.2256514601366097,z:-321.96856555826724,theta:4.8593023961903725},
{x:-85.33973294556516,y:1.1156927237650136,z:-356.953247969296,theta:6.510528292482663},
{x:-12.261694188053857,y:9.561761325203317,z:-368.8977270333275,theta:7.24543440368086},
{x:-7.821301231801506,y:10.267902800954037,z:-294.25777002375145,theta:7.84819549460511},
{x:-5.7143186967104365,y:9.462682226688031,z:-224.86249227149128,theta:7.802758538838614},
{x:-2.209679544254086,y:6.509722411267669,z:-166.67512222440226,theta:7.806220085944525},
{x:1.075846338372468,y:4.292704898562552,z:-97.29228725446515,theta:7.806220085944525},
{x:-0.12945586786985072,y:-1.7940557756121533,z:4.427303961902726,theta:1.6}
]
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

var texLoad = new THREE.TextureLoader()
var shadowTex;
if(trackShadow!="undefined") shadowTex = texLoad.load(trackShadow)
var boostTex = texLoad.load("./tracks/desert/boost2.jpg");
boostTex.wrapS = THREE.RepeatWrapping;
boostTex.wrapT = THREE.RepeatWrapping;

scene.background = new THREE.CubeTextureLoader()
					.setPath( 'tracks/coolcastle/skyBox/' )
					.load( [ 'back.jpeg', 'front.jpeg', 'up.jpeg', 'down.jpeg', 'right.jpeg', 'left.jpeg' ] );


scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );
loader = new THREE.GLTFLoader()
loader.load(trackFile, function(gltf, err) {
  console.log(err);
  root = gltf.scene;
  root.remove(root.getObjectByName("Cube"))
  gltf.scene.traverse(function(node) {
    if(node instanceof THREE.Mesh && node.geometry.attributes.uv2){
      console.log(`${node.name} has 2 uvs`);
      var uniforms = {
        shadowMap: {value: shadowTex},
        map: {value: node.material.map},
        time: {value:0}
      }
      var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent
      });
      node.material = material
    }else if (node instanceof THREE.Mesh){
      var flatMat =  new THREE.ShaderMaterial({
        uniforms: {map:{value:node.material.map},time:{value:0}},
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('flatShader').textContent
      })
      node.material = flatMat;
    }
  })
  scene.add(root);
  count(3)
  finalize();
  animate()
});

loadKcl(collisionFile)


function finalize(){

}

function update(){

}
