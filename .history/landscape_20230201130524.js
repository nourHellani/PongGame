var scale = (window.innerWidth < 640) ? 2 : 1;


// We want to run the game in "fullscreen", so let's use the window's size
// directly as the canvas' style size.
var canvas = document.getElementById('canvas');
canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight + 'px';


// Listen to the window's 'resize' event and set the canvas' size each time
// it changes.
window.addEventListener('resize', function(){
    // If the game hasn't started yet, there's nothing to do here
    if( !ig.system ) { return; }
    
    // Resize the canvas style and tell Impact to resize the canvas itself;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ig.system.resize( window.innerWidth * scale, window.innerHeight * scale );
    

var width = window.innerWidth * scale,
    height = window.innerHeight * scale;
ig.main( '#canvas', MyTitle, 60, width, height, 1, ig.ImpactSplashLoader );