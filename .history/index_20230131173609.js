let pong;

window.onload = function () {
  console.log("loading");
  pong = document.getElementById("pong");
  pong.style.backgroundColor = "#fff";
  prepareDocument();
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
function prepareDocument() {
  document.body.style.padding = "0px";
  document.body.style.margin = "0px";
}
function drawRect(){
    let ctx = pong.getContext("2d");
    let width = pong.width * 0.2;
    let height = pong.width * 0.2;
}
