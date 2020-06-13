function load(path,callback,call2){
  t = 0;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(this.readyState==4 && this.status == 200){
      callback(xhttp.responseText,call2);
    }
  }
  xhttp.open("GET",path,true);
  xhttp.send();
}

var rb = "\u005Cright)";
var lb = "\u005cleft(";
var xb = `h${lb}x${rb}`

function loadLineList(path,callback){
  load(path, processLineList,callback);
}
function processLineList(xml,callback){
  lines = [];
  console.warn("SUCESS in loading the xml!!!");
  console.log(xml);
  //set up parser
  var parser = new window.DOMParser();
  //parse the xml
  var svg = parser.parseFromString(xml,"text/xml");
  //find the path elements
  paths = svg.getElementsByTagName("line");
  //iterate through the paths
  for(var i = 0; i < paths.length; i++){
    //load path data
    //console.log(paths[i]);
    var x1 = parseFloat(paths[i].getAttribute("x1"));
    var y1 = parseFloat(paths[i].getAttribute("y1"));
    var x2 = parseFloat(paths[i].getAttribute("x2"));
    var y2 = parseFloat(paths[i].getAttribute("y2"));
    container.innerHTML+=(`[${x1},${y1},${x2},${y2}],<br>`)
    lines.push([x1,y1,x2,y2])

  }

  //var circles =
  callback(lines)
}

function printq(p1x,p1y,p2x,p2y,p3x,p3y){
  var x=`q_x${lb}t,${lb}${p1x,p2x}${rb},${lb}${p1x,p2x},${rb}${lb}${p1x,p2x}${rb}${rb}`;
  var y=`q_y${lb}t,${lb}${p1y,p2y}${rb},${lb}${p1y,p2y},${rb}${lb}${p1y,p2y}${rb}${rb}`;
  return (`${lb}${x},${y}${rb}`);
}

function printc(p1x,p1y,p2x,p2y,p3x,p3y,p4x,p4y){
  var x=`${lb}t,${lb}${p1x}, ${p1y}${rb}, ${lb}${p2x}, ${p2y}${rb}, ${lb}${p3x}, ${p3y}${rb}, ${lb}${p4x}, ${p4y}${rb}${rb}`;
  //var y=`c_y${lb}t,${lb}${p1y,p2y}${rb},${lb}${p1y,p2y},${rb}${lb}${p1y,p2y}${rb},${lb}${p4x,p4x}${rb}${rb}`;
  return (`${lb}c_i${x},c_j${x}${rb}`);
}

function printl(prevx,prevy,x,y){
  /*if(prevx==x){
      var domain = `\u005Cleft\u005C\u007B ${Math.min(prevy,y)}< y <${Math.max(y,prevy)}\u005Cright\u005C\u007D`;
    return `x=${prevx}\u005C ${domain}`
  }
  var m = (y-prevy)/(x-prevx);
  var b = (prevy-m*prevx);
  //y=-0.27722x+175\ \left\{3<x\ <100\right\}
  var domain = `\u005Cleft\u005C\u007B ${Math.min(prevx,x)}< x <${Math.max(prevx,x)}\u005Cright\u005C\u007D`
  return (`y=${m}x+${b}\u005C ${domain}`);*/
  return(`${lb}l_i${lb}t,${prevx},${x}${rb},l_j${lb}t,${prevy},${y}${rb}${rb}`)
}
