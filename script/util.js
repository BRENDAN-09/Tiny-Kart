function createContext(){
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);
}

//(a,b)--x-->>>>(c,d)---->>>(r,s) *** (e,f)--y-->>(g,h)---->>(r,s)
function intersect(e,f,r,s,a,b,p,q) {
  var c = p-a, d = q-b, g=r-e, h = s-f;
  var z = (c*h-d*g);
  if (z == 0)return -1;
  var x = -(a*h-b*g-e*h+f*g)/(c*h-d*g);
  var y = -(a*d-b*c+c*f-d*e)/(c*h-d*g);
  //console.log(a+x*c==e+y*g);//MUST BE TRUE!!!
  //console.log(b+x*d==f+y*h);
  return (x>-2&&x<2&&y>-2&&y<2)
};
