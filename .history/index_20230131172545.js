let pong;


window.onload = function(){
    console.log('loading');
    pong= document.getElementById("pong");
    pong.style.backgroundColor="#fff";

    
}

window.onresize = function(){
    console.log('resizing');
}

function resizeCanvas(){
    pong.width =window.innerWidth;
    pong.height = win
}