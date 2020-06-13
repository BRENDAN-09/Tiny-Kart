//Global Variables
var scene, camera, renderer, params, directionalLight, axesHelper, loader,
  root, raycaster, shadHelper, up, keys, theta, oldPos, temp,
  container, timeBox, time, countDownBox, countDown, date, stime, go, death,
  nextCp, respawn, ambientlight, paused, ptime, adjust, detail, mushroom,
  lapCount, t, m, mi, stats, kart, kartState, splits, composer, glow, q,
  upQuat


function run() {
  console.log("Track Initiation!");
  renderer = new THREE.WebGLRenderer({antialias:true})
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
  splits = []
  composer = new THREE.EffectComposer(renderer)
  composer.addPass(new THREE.RenderPass(scene, camera));
  upQuat = new THREE.Quaternion();

  //html stuff
  stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  container.appendChild(stats.dom);
  timeBox = document.createElement("div")
  timeBox.id = "info"
  timeBox.alight = "right"
  document.body.appendChild(timeBox)
  countDownBox = document.createElement("div")
  countDownBox.id = "countDown"
  document.body.appendChild(countDownBox)
  lapCount = 0
  paused = false
  go = false
  //identity matrix
  m = new THREE.Matrix3() // Triangle Rotation Matrix


  //Physics Initiation
  kartState = {
    speed: 0.0,
    theta: Math.PI,
    tSpeed: 0.0,
    road: true,
    matrix: m,
    mushrooming: false,
    drifting: "no",
    miniT: false,
    canTrick: false,
    tricking: false,
    trickBoost: false,
    boosting: false,
    boostTime: 0,
    euler: new THREE.Euler(),
    quat: new THREE.Quaternion(),
    temp: new THREE.Matrix4(),
    cannon: false
  }
  cameraState = {
    theta: 0.0
  }
  params.length = params.gravity.length()
  raycaster = new THREE.Raycaster()
  up = new THREE.Vector3(0, 1, 0)
  oldPos = new THREE.Vector3()
  temp = new THREE.Vector3()
  respawn = new THREE.Vector3()
  nextCp = 0
  adjust = 0
  mushroom = 3
  lapCount = 1
  q = new THREE.Quaternion();



  //Control Initiation
  keys = [] //moved to countDown

  //Initiate "Kart"
  kart = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), THREE.KartMat);
  kart.position.y = startPos.y
  kart.position.x = startPos.x + Math.random()*0.01
  kart.position.z = startPos.z + Math.random()*0.01
  kartState.theta = startTheta + Math.PI/2
  oldPos.copy(kart.position)
  scene.add(kart)

  document.addEventListener("mousedown", function(e) {
    if (!go) return;
    if (!paused) pause()
  })
}
//axesHelper.matrixWorld = kart.matrixWorld

t = 0
//Main Loop
function animate() {
  t++;
  update();
  if (t - kartState.boostTime > params.boostTime) {
    kartState.boosting = false
  }
  THREE.KartMat.uniforms.color.value.setHex(0xFFFFFF)
  if (kartState.drifting == "left" || kartState.drifting == "right") {
    if (t - kartState.driftTime > params.miniTTriggerTime) {
      THREE.KartMat.uniforms.color.value.setHSL(0.8 + (Math.sin(t * 0.2)) * 0.05, 0.77, 0.3)
    } else {
      THREE.KartMat.uniforms.color.value.setHSL(0.57 + (Math.sin(t * 0.2)) * 0.05, 0.77, 0.3)
    }
  }
  if (kartState.mushrooming || kartState.miniT || kartState.trickBoost || kartState.boosting) {
    THREE.KartMat.uniforms.color.value.setHSL(0.05 + (Math.sin(t * 0.2)) * 0.05, 0.77, 0.3)
  }

  /*if (kartState.mushrooming || kartState.miniT || kartState.trickBoost || kartState.boosting) {
    THREE.KartMat.uniforms.color.value.setHSL(0.05 + (Math.sin(t * 0.2)) * 0.05, 0.77, 0.3)
  } else {
    if (kartState.drifting == "left" || kartState.drifting == "right") {
      if (t - kartState.driftTime > params.miniTTriggerTime) {
        THREE.KartMat.uniforms.color.value.setHSL(0.8 + (Math.sin(t * 0.2)) * 0.05, 0.77, 0.3)
      } else {
        THREE.KartMat.uniforms.color.value.setHSL(0.57 + (Math.sin(t * 0.2)) * 0.05, 0.77, 0.3)
      }
    } else {
      THREE.KartMat.uniforms.color.value.setHex(0xFFFFFF)
    }
  }*/
  //if(t%60==0)console.log(kart.position.clone().sub(cannon.position).length());


  if (kartState.tricking) {
    kartState.euler.x += 0.2
    kartState.euler.z += 0.1
  } else {
    kartState.euler.x = 0
    kartState.euler.z = 0
  }
  if (paused) {
    requestAnimationFrame(animate)
  } else {
    stats.begin();
    temp.copy(kart.position)
    if(kartState.cannon){
      kart.position.add(cannonDest.clone().sub(kart.position).normalize().multiplyScalar(1.5))
    }
    if(kartState.cannon && kart.position.clone().sub(cannonDest).length()<1){
      console.log("cannon gone :()");
      kart.position.copy(cannonDest);
      //temp.copy(cannonDest.clone().sub(temp).normalize().multiplyScalar(0.1));
      kartState.cannon = false;
    }
    date = new Date()
    if (go) timeBox.innerHTML = `Time: ${((date.getTime()-stime-adjust)/1000).toFixed(3)}<br><br><br><br>Mushrooms: ${mushroom}/3<br><br><br><br>Laps: ${lapCount}/${numLaps}`
    //get input
    if (kartState.drifting == "no") {
      if (keys[37]) {
        kartState.tSpeed -= (params.maxTSpeed - Math.abs(kartState.tSpeed)) * params.tAcceleration;
      } else {
        if (keys[39]) {
          kartState.tSpeed += (params.maxTSpeed - Math.abs(kartState.tSpeed)) * params.tAcceleration;
        } else {
          kartState.tSpeed *= 0.5
        }
      }
    } else {
      if (kartState.drifting == "left") {
        if (keys[39]) {
          kartState.tSpeed += (-params.minDrifT - kartState.tSpeed) * params.dAcceleration;
        } else {
          kartState.tSpeed += (-params.maxDrifT - kartState.tSpeed) * params.dAcceleration;
        }
      } else {
        if (keys[39]) {
          kartState.tSpeed += (params.maxDrifT - kartState.tSpeed) * params.dAcceleration;
        } else {
          kartState.tSpeed += (params.minDrifT - kartState.tSpeed) * params.dAcceleration;
        }
      }
    }

    kartState.theta += kartState.tSpeed
    kartState.euler.y = -kartState.theta
    params.forwards.z = Math.sin(kartState.theta)
    params.forwards.x = Math.cos(kartState.theta)
    //Apply Physics
    raycaster.set(kart.position.clone().add(params.vehicleOffset), params.roadActivationDir)
    var intersection = raycaster.intersectObjects(floor, false)[0];
    //console.log(intersection);
    if (!kartState.cannon&&intersection != undefined) {
      handleRoad(intersection)
    }
    if (!kartState.cannon&&(intersection == undefined || intersection.distance >= params.roadActivationDistance)) {
      //Apply Gravity
      if (keys[38]) {
        kart.position.add(kart.position.clone().sub(oldPos).add(params.strongGravity));
      } else {
        kart.position.add(kart.position.clone().sub(oldPos).add(params.gravity));
      }
      kartState.quat.rotateTowards(upQuat, 0.01)

    }
    //Walls
    v = kart.position.clone().sub(temp)
    raycaster.set(kart.position.clone().add(params.wallOffSet), v.clone().normalize())
    var intersection = raycaster.intersectObjects(walls, true)[0];


    if (!kartState.cannon&&intersection != undefined && intersection.distance < v.length() + params.wallRadius) {
      var n = intersection.face.normal.clone()
      console.log(intersection.object.name);
      if(intersection.object.name==="cann"){
        kartState.cannon = true;
        console.log("Cannoooon!");
      }
      n.transformDirection(intersection.object.matrixWorld)
      oldPos.copy(intersection.point)
      let t = (intersection.point.add(n.multiplyScalar(params.wallKickBack)))
      kart.position.x = t.x
      kart.position.y = t.y
      kart.position.z = t.z
      kartState.speed *= params.wallSlowDown
    } else {
      oldPos.copy(temp)
    }
    //cp
    handleCp()
    //Draw It!
    cameraState.theta += (kartState.theta - cameraState.theta) * params.lagCam;
    //TODO: Adaptive Camera Angle?
    camera.position.copy(kart.position.clone().add(new THREE.Vector3(-Math.cos(cameraState.theta) * params.hCamDist, params.vCamDist, -Math.sin(cameraState.theta) * params.hCamDist)))
    camera.lookAt(kart.position.clone().add(params.cameraOffSet))
    THREE.KartMat.uniforms.mat.value.makeRotationFromQuaternion(kartState.quat)
    THREE.KartMat.uniforms.steer.value.makeRotationFromEuler(kartState.euler)
    composer.render()
    requestAnimationFrame(animate)
    stats.end()
  }
}

function printv(v) {
  console.log(v.x + "  " + v.y + "  " + v.z);
}


function handleKU(e) {
  keys[e.keyCode] = false
  if (e.keyCode == 69) {
    kartState.drifting = "no"
    if (t - kartState.driftTime > params.miniTTriggerTime) {
      kartState.miniT = true
      setTimeout(stopMiniT, params.miniTLength)
    }
    kartState.driftTime = t
  }
}

function handleKD(e) {
  keys[e.keyCode] = true
  if (!kartState.mushrooming && e.keyCode == 32 && mushroom > 0) {
    kartState.mushrooming = true;
    mushroom--
    setTimeout(stopMushy, params.mushroomLength)
  }
  if (kartState.drifting == "no" && e.keyCode == 69) {
    kartState.drifting = "yes"
  }
  if (kartState.drifting == "yes") {
    if (keys[37]) kartState.drifting = "left"
    if (keys[39]) kartState.drifting = "right"
    kartState.driftTime = t
  }
}



function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener( 'resize', onWindowResize, false );

function stopMushy() {
  kartState.mushrooming = false;
}

function stopMiniT() {
  kartState.miniT = false;
}

function stopTrickBoost() {
  kartState.trickBoost = false
}

function stopBoost() {
  kartState.trickBoost = false
}

function handleCp(){
  var i = intersect(temp.x, temp.z, kart.position.x, kart.position.z, cp[nextCp][0], cp[nextCp][1], cp[nextCp][2], cp[nextCp][3]);
  if (i && i != -1) { //wth is going on???
    if(nextCp==0){
      lapCount++
      splits.push(((date.getTime() - stime - adjust) / 1000))
      if (lapCount > numLaps) finish()
    }
    //console.log(`{x:${kart.position.x},y:${kart.position.y+1},z:${kart.position.z},theta:${kartState.theta}}`);
    //console.log(`checkpoint ${nextCp} is TRIGGERED`);
    nextCp++;
    if (nextCp > cp.length - 1) {
      nextCp = 0
    }
  }
}
