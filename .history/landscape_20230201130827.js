var isPortrait = function() {
    // we can't rely on window.orientation, because some devices
    // report 0deg rotation for landscape mode :/
    // Check for screen dimensions instead
    return (!ig.ua.mobile || window.innerHeight > window.innerWidth);
};

var checkOrientation = function() {    
    if( isPortrait() ) {
        // all good
    }
    else {
        // display rotate message
    }
};

// Listen to resize and orientationchange events
window.addEventListener( 'orientationchange', checkOrientation, false );
window.addEventListener( 'resize', checkOrientation, false );