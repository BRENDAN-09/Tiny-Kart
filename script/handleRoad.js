var eu = new THREE.Euler();

function handleRoad(intersection){
  if(intersection.object.name=="cann")console.log("CANOOOON!");
  //console.log(Math.abs(kart.position.clone().sub(oldPos).y));
  if (intersection.distance < params.roadActivationDistance) {
    if (kartState.tricking) {
      console.log("WEE HEE");
      kartState.trickBoost = true
      kartState.tricking = false
      setTimeout(stopTrickBoost, params.trickBoostTime)
    }
    //Collision
    //kartState.road = (intersection.object.name[0] != 'O' && intersection.object.parent.name[0] != 'o')
    kartState.canTrick = (intersection.object.name[0] == 'B'||intersection.object.name[0] == 't')
    //console.log(intersection.object.name,kartState.canTrick);
    if (intersection.object.name[0] == 'B') {
      kartState.boosting = true
      kartState.boostTime = t
    }
    if (intersection.object.name[0] == 'D' || intersection.object.parent.name[0] == 'D') {
      if(rp[0] instanceof Array){
      kart.position.x = rp[cp[nextCp-1][4]][0]
      kart.position.y = rp[cp[nextCp-1][4]][1]
      kart.position.z = rp[cp[nextCp-1][4]][2]
      kartState.theta = rp[cp[nextCp-1][4]][3]
      cameraState.theta = (rp[cp[nextCp-1][4]][3] + Math.PI)
    }else{
        kart.position.x = rp[nextCp-1].x
        kart.position.y = rp[nextCp-1].y
        kart.position.z = rp[nextCp-1].z
        kartState.theta = rp[nextCp-1].theta
        //cameraState.theta = (([nextCp-1][4]))
      }
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
      kartState.temp.set(
        b.x, n.x, c.x,0,
        b.y, n.y, c.y,0,
        b.z, n.z, c.z,0,
        0,   0,   0,  1
      )
      kartState.matrix.setFromMatrix4(kartState.temp);
      //console.log();
      kartState.quat.rotateTowards(q.setFromRotationMatrix(kartState.temp),(1.0-Math.abs(kartState.quat.dot(q)))*6)
      if (kartState.mushrooming || kartState.miniT || kartState.trickBoost || kartState.boosting) {
        kartState.speed += (params.mushroomspeed - kartState.speed) * params.mushroomacceleration;
      } else {
        if (keys[38]) {
          kartState.speed += (params.maxSpeed*intersection.object.speed - kartState.speed) * params.acceleration;
        } else {
          if (keys[40]) {
            kartState.speed += (-params.backSpeed*intersection.object.speed - kartState.speed) * params.breaks;
          }
          kartState.speed *= 0.98
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
