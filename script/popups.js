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
  detail.innerHTML = "<span class='fun' onclick='unpause()'>Resume</span><br><br><br><span class='fun' onclick='location.reload()'>Restart</span> <br><br><br> <a class='fun' href='menu/menu.html'>Quit</a>"
  countDownBox.appendChild(detail)
}

function unpause() {
  detail.remove()
  countDownBox.remove()
  date = new Date()
  adjust += (date.getTime() - ptime)
  paused = false
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
  minSplit = splits[0]
  detail.innerHTML = "Lap 1: " + splits[0] + "s,              "
  for(var i = 1; i < numLaps; i++){
    minSplit = Math.min(minSplit,splits[i]-splits[i-1])
    detail.innerHTML += `Lap ${i+1}: ` + (splits[i]-splits[i-1]).toFixed(2)+ "s,              ";
  }
  detail.innerHTML += `<br><br><br><br>Total Time ${(date.getTime()-stime-adjust)/1000}`
  detail.innerHTML += "<br><br><br> <span class='fun' onclick='location.reload()'>Retry</span><br><br><br><a class='fun' href='menu/menu.html'>Menu</a>"
  //detail.innerHTML = `Wow! Your time was ${((date.getTime()-stime-adjust)/1000).toFixed(3)} seconds!<br><br><br><br>Press the spacebar to play again.`
  countDownBox.appendChild(detail)
  go = false
}
