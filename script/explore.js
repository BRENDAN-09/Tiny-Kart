var renderer,clock,controls,container;

function run(){
  renderer = new THREE.WebGLRenderer({
    preserveDrawingBuffer: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.setClearColor(0x16bff7, 0);
  container = document.createElement('div');
  document.body.appendChild(container);
  container.appendChild(renderer.domElement)
  camera.position.y = 10
  camera.position.z = 4
  camera.lookAt(0, 0, 0)
  clock = new THREE.Clock();



controls = new THREE.FirstPersonControls( camera, renderer.domElement );
controls.movementSpeed = 100;
controls.lookSpeed = 0.1;

window.addEventListener("keydown",function(e){
  if(e.code=="Space"){
    var image = renderer.domElement.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.


    window.location.href=image; // it will save locally
  }
})

}


function count(){
  //do nothing
}


function animate(){
  controls.update( clock.getDelta() );
  update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
