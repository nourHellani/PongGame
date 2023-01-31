let pong;

window.onload = function () {
  console.log("loading");
  pong = document.getElementById("pong");
  pong.style.backgroundColor = "#fff";
  resizeCanvas();
};

window.onresize = function () {
  console.log("resizing");
  resizeCanvas();
};

function resizeCanvas() {
  pong.width = window.innerWidth;
  pong.height = window.innerHeight;
}
function prepareDocument(){
    document.body.style.padding="0px";
    document
}

