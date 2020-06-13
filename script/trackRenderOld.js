//Global Variables
var scene, camera, renderer, params, directionalLight, axesHelper, loader,
  root, raycaster, shadHelper, up, keys, theta, oldPos, temp,
  container, timeBox, time, countDownBox, countDown, date, stime, go, death,
  nextCp, respawn, ambientlight, paused, ptime, adjust, detail, mushroom,
  lapCount, t


renderer = new THREE.WebGLRenderer()
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

//html stuff
var stats = new Stats();
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
var m = new THREE.Matrix3() // Triangle Rotation Matrix
m.set(
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
)

//Physics Initiation
params = {
  gravity: new THREE.Vector3(0, -0.01, 0),
  roadActivationDistance: 1.501,
  roadActivationDir: new THREE.Vector3(0, -1, 0),
  camDir: new THREE.Vector3(0, 3, 3),
  forwards: new THREE.Vector3(0, 0, -1),
  vehicleOffset: new THREE.Vector3(0, 1.5, 0),
  up: new THREE.Vector3(0, 1, 0),
  damper: new THREE.Vector3(1, 0.4, 1),
  maxSpeed: 0.8,
  acceleration: 0.1,
  maxTSpeed: 0.05,
  tAcceleration: 0.03,
  maxOffroadSpeed: 0.1,
  backSpeed: 0.1,
  lagCam: 0.1,
  hCamDist: 4,
  vCamDist: 2,
  offRoadForgiveness: 0.1,
  offroadDecay: 0.8,
  handling: 0.06,
  wallRadius: 0.1,
  breaks: 0.07,
  wallOffSet: new THREE.Vector3(0, 0.5, 0),
  wallSlowDown: -0.3,
  wallKickBack: 0.1,
  mushroomspeed: 1.3,
  mushroomacceleration: 0.03,
  mushroomLength: 1500,
  cameraOffSet: new THREE.Vector3(0, 1.2, 0),
  maxDrifT: 0.024,
  minDrifT: 0.01,
  dAcceleration: 1,
  miniTTriggerTime: 90,
  miniTLength: 600,
  trickHeight: 0.2,
  trickBoostTime: 1200,
  boostTime: 20,
  roadWallLim: 0.6
};
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
  boostTime: 0
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



//Control Initiation
keys = [] //moved to countDown

//Initiate "Kart"
var kart = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), new THREE.MeshLambertMaterial());
kart.position.y = startPos.y
kart.position.x = startPos.x
kart.position.z = startPos.z
kartState.theta = startTheta
kart.castShadow = true
oldPos.copy(kart.position)
scene.add(kart)

document.addEventListener("mousedown", function(e) {
  if (!go) return;
  if (!paused) pause()
})

//axesHelper.matrixWorld = kart.matrixWorld

function count(sec) {
  if (sec == 0) {
    countDownBox.innerHTML = "GO!"
    date = new Date()
    stime = date.getTime()
    ptime = date.getTime()
    setTimeout(count, 1000, sec - 1)
    document.addEventListener("keydown", handleKD)
    document.addEventListener("keyup", handleKU)
    return;
  }
  if (sec == -1) {
    countDownBox.remove();
    go = true
    return;
  }
  countDownBox.innerHTML = sec.toString()
  setTimeout(count, 1000, sec - 1)
}
t = 0
//Main Loop
function animate() {
  t++;
  update();
  if (t - kartState.boostTime > params.boostTime) {
    kartState.boosting = false
  }
  kart.material.color.setHex(0xFFFFFF)
  if (kartState.drifting == "left" || kartState.drifting == "right") {
    if (t - kartState.driftTime > params.miniTTriggerTime) {
      kart.material.color.setHSL(0.8 + (Math.sin(t * 0.2)) * 0.05, 0.77, 0.3)
    } else {
      kart.material.color.setHSL(0.57 + (Math.sin(t * 0.2)) * 0.05, 0.77, 0.3)
    }
  }
  if (kartState.mushrooming || kartState.miniT || kartState.trickBoost || kartState.boosting) {
    kart.material.color.setHSL(0.05 + (Math.sin(t * 0.2)) * 0.05, 0.77, 0.3)
  }

  /*if (kartState.mushrooming || kartState.miniT || kartState.trickBoost || kartState.boosting) {
    kart.material.color.setHSL(0.05 + (Math.sin(t * 0.2)) * 0.05, 0.77, 0.3)
  } else {
    if (kartState.drifting == "left" || kartState.drifting == "right") {
      if (t - kartState.driftTime > params.miniTTriggerTime) {
        kart.material.color.setHSL(0.8 + (Math.sin(t * 0.2)) * 0.05, 0.77, 0.3)
      } else {
        kart.material.color.setHSL(0.57 + (Math.sin(t * 0.2)) * 0.05, 0.77, 0.3)
      }
    } else {
      kart.material.color.setHex(0xFFFFFF)
    }
  }*/
  if (kartState.tricking) {
    kart.rotation.x += 0.2
    kart.rotation.z += 0.1
  } else {
    kart.rotation.x = 0
    kart.rotation.z = 0
  }
  if (paused) {
    requestAnimationFrame(animate)
  } else {
    stats.begin();
    temp.copy(kart.position)
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
    kart.rotation.y = -kartState.theta
    params.forwards.z = Math.sin(kartState.theta)
    params.forwards.x = Math.cos(kartState.theta)
    //Apply Physics
    raycaster.set(kart.position.clone().add(params.vehicleOffset), params.roadActivationDir)
    var intersection = raycaster.intersectObjects(floor, true)[0];
    //console.log(intersection);
    if (intersection != undefined) {
      handleRoad(intersection)
    }
    if (intersection == undefined || intersection.distance >= params.roadActivationDistance) {
      //Apply Gravity
      kart.position.add(kart.position.clone().sub(oldPos).add(params.gravity));
    }
    //Walls
    v = kart.position.clone().sub(temp)
    raycaster.set(kart.position.clone().add(params.wallOffSet), v.clone().normalize())
    var intersection = raycaster.intersectObjects(walls, true)[0];
    if (intersection != undefined && intersection.distance < v.length() + params.wallRadius) {
      var n = intersection.face.normal.clone()
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
    var i = intersect(temp.x, temp.z, kart.position.x, kart.position.z, cp[nextCp][0], cp[nextCp][1], cp[nextCp][2], cp[nextCp][3]);
    if (i && i != -1) { //wth is going on???
      console.log(`{x:${kart.position.x},y:${kart.position.y+1},z:${kart.position.z},theta:${kartState.theta}}`);
      //console.log(`checkpoint ${nextCp} is TRIGGERED`);
      nextCp++;
      if (nextCp > cp.length - 1) {
        nextCp = 0
        lapCount++
        if (lapCount > numLaps) finish()
      }
    }
    //Draw It!
    cameraState.theta += (kartState.theta - cameraState.theta) * params.lagCam;
    //TODO: Adaptive Camera Angle?
    camera.position.copy(kart.position.clone().add(new THREE.Vector3(-Math.cos(cameraState.theta) * params.hCamDist, params.vCamDist, -Math.sin(cameraState.theta) * params.hCamDist)))
    camera.lookAt(kart.position.clone().add(params.cameraOffSet))

    renderer.render(scene, camera)
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

function finish() {
  timeBox.remove()
  document.removeEventListener("keydown", handleKD)
  document.removeEventListener("keydown", handleKD)
  document.addEventListener("keydown", function(e) {
    if (e.keyCode == 32) location.reload()
  })
  countDownBox = document.createElement("div")
  countDownBox.id = "finishBG"
  document.body.appendChild(countDownBox)
  finisht = document.createElement("div")
  finisht.id = "finisht"
  finisht.innerHTML = "Finish!"
  countDownBox.appendChild(finisht)

  detail = document.createElement("div")
  detail.id = "detail"
  document.body.appendChild(detail)
  detail = document.createElement("div")
  detail.id = "detail"
  detail.innerHTML = `Wow! Your time was ${((date.getTime()-stime-adjust)/1000).toFixed(3)} seconds!<br><br><br><br>Press the spacebar to play again.`
  countDownBox.appendChild(detail)
  go = false
}

function pause() {
  date = new Date()
  ptime = date.getTime()
  paused = true
  countDownBox = document.createElement("div")
  countDownBox.id = "finishBG"
  document.body.appendChild(countDownBox)
  finisht = document.createElement("div")
  finisht.id = "finisht"
  finisht.innerHTML = "Paused!"
  countDownBox.appendChild(finisht)

  detail = document.createElement("div")
  detail.id = "detail"
  document.body.appendChild(detail)
  detail = document.createElement("div")
  detail.id = "detail"
  detail.innerHTML = "<span onclick='unpause()'>Resume</span><br><br><br><span onclick='location.reload()'>Restart</span> "
  countDownBox.appendChild(detail)
}

function unpause() {
  detail.remove()
  countDownBox.remove()
  date = new Date()
  adjust += (date.getTime() - ptime)
  paused = false
}

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

function handleRoad(intersection){
  //console.log(Math.abs(kart.position.clone().sub(oldPos).y));
  if (intersection.distance < params.roadActivationDistance) {
    if (kartState.tricking) {
      console.log("WEE HEE");
      kartState.trickBoost = true
      kartState.tricking = false
      setTimeout(stopTrickBoost, params.trickBoostTime)
    }
    //Collision
    kartState.road = (intersection.object.name[0] != 'O' && intersection.object.parent.name[0] != 'o')
    kartState.canTrick = (intersection.object.name[0] == 'B'||intersection.object.name[0] == 't')
    //console.log(intersection.object.name,kartState.canTrick);
    if (intersection.object.name[0] == 'B') {
      kartState.boosting = true
      kartState.boostTime = t
    }
    if (intersection.object.name[0] == 'D' || intersection.object.parent.name[0] == 'D') {
      kart.position.x = rp[nextCp - 1].x
      kart.position.y = rp[nextCp - 1].y
      kart.position.z = rp[nextCp - 1].z
      kartState.theta = rp[nextCp - 1].theta
      cameraState.theta = ((rp[nextCp - 1].theta) + Math.PI)
      kartState.speed = 0
      oldPos.copy(kart.position)
      temp.copy(kart.position)
    } else {
      var n = intersection.face.normal.clone()
      n.transformDirection(intersection.object.matrixWorld)
      kart.position.copy(intersection.point.clone().add(params.up.multiplyScalar(0.001)))
      b = (new THREE.Vector3(1, n.x / -n.y, 0)).normalize() //x
      c = (new THREE.Vector3(0, n.z / -n.y, 1)).normalize() //z
      //var m = new THREE.Matrix3() // Triangle Rotation Matrix
      kartState.matrix.set(
        b.x, n.x, c.x,
        b.y, n.y, c.y,
        b.z, n.z, c.z
      )
      if (kartState.mushrooming || kartState.miniT || kartState.trickBoost || kartState.boosting) {
        kartState.speed += (params.mushroomspeed - kartState.speed) * params.mushroomacceleration;
      } else {
        if (keys[38]) {
          kartState.speed += (params.maxSpeed - kartState.speed) * params.acceleration;
        } else {
          if (keys[40]) {
            kartState.speed += (-params.backSpeed - kartState.speed) * params.breaks;
          }
          kartState.speed *= 0.98
        }
        if (!kartState.road && !(kartState.mushrooming || kartState.miniT || kartState.trickBoost || kartState.boosting)) {
          if (keys[38]) {
            kartState.speed += (params.maxOffroadSpeed - kartState.speed) * params.offRoadForgiveness;
          } else {
            kartState.speed *= params.offroadDecay;
          }
        }
      }
      kart.position.add(params.forwards.clone().applyMatrix3(kartState.matrix).multiplyScalar(kartState.speed))
      //Tricking
      if (kartState.canTrick && keys[68]) {
        kart.position.add(n.multiplyScalar(params.trickHeight))
        kartState.canTrick = false
        kartState.tricking = true
        console.log("WOOOO HOOO");
      }
    }
  }
}
