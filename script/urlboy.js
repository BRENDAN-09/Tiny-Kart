var entryLoc = (window.location.search.substring(3))
var script = document.getElementById("entryScript")
console.log(script)
script.src = "tracks/"+entryLoc+"/entry.js"
script.onload = run
