var flags = {
  "00": 1,    //road
  "01": 1,    //slippery road
  "02": 0.5,  //weak off road
  "03": 0.325,//off road
  "04": 0.185,//heavy offroad
  "05": 0.881,//slippery road 2
  "06": "fast",//boost pad
  "07": "fast",//boost ramp
  "08": "fast",//jump pad
  "09": "igno",//item road
  "0a": "fall",//solid fall
  "0b": 1,     //moving water
  "0c": "wall",//wall
  "0d": "wall",//invisible wall
  "0e": "igno",//item wall
  "0f": "wall",//wall 3?
  "10": "fall",//fall boundary
  "11": "cann",//cannon activator
  "12": "igno",//force recalculation?
  "13": "wall",//half pipe ramp
  "14": "wall",//wall
  "15": 1,     //moving road
  "16": 1,     //gravity road
  "17": 1,     //road
  "18": "igno",//sound trigger
  "19": "igno",//unknown
  "1a": "igno",//effect trigger
  "1b": "igno",//unknown
  "1c": "igno",//unknown
  "1d": 1,     //moving road
  "1e": "wall",//special wall
  "1f": "wall" //wall 5?
}

var cannon;


function loadKcl(kclfile){
  loader.load(collisionFile,function(gltf,err){
    console.log("Load KCL: ",err)
    gltf.scene.traverse(function(node){
      if(!(node instanceof THREE.Mesh))return;
      console.log(node.name);
      code = flags[node.name.split("_")[1]]
      if(code==="igno"){

      }else if(code==="cann"){
        console.log("cannon loaded!");
        node.name = "cann"
        walls.push(node)
        cannon = node
      }else if(code==="wall"){
        walls.push(node)
      }else if(code==="fall"){
        node.name = "D" + node.name
        floor.push(node)
        //walls.push(node)
      }else if(code==="fast"){
        node.name = "B" + node.name
        //boosts.push(node.name)
        floor.push(node);
      }else{
        node.speed = parseFloat(code)
        floor.push(node)
      }
      node.layers.set(5)

    })
    scene.add(gltf.scene);
  })
}

function loadVrcorn(){
  loader.load(vrFile,function(gltf,err){
    console.log("Load vrcorn", err);
    gltf.scene.traverse(function(node){
      if (node instanceof THREE.Mesh){
        node.material = flatMat(node.material.map);
      }
    })
    scene.add(gltf.scene);
  })
}
