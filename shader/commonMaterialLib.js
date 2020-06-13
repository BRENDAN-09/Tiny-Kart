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

var boostMat =  new THREE.ShaderMaterial({
  uniforms: {time:{value:0}},
  vertexShader: document.getElementById('vertexShader').textContent,
  fragmentShader: document.getElementById('boostShader').textContent
});

function shadowMat(mainTex, shadowTex){
  var uniforms = {
    shadowMap: {value: shadowTex},
    map: {value: mainTex},
    time: {value:0}
  }
  return new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent
  })
}

function flatMat(tex,disp=new THREE.Vector2(0,0)){
  return new THREE.ShaderMaterial({
    uniforms: {map:{value:tex},time:{value:0},disp:{value:disp}},
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('flatShader').textContent
  })
}
