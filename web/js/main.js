/**
 * Created by jeremyblack on 2/3/16.
 */



// Global list of all entities for updating, rendering, etc.
document.addEventListener('keyup', function(e) {
    e.preventDefault();
    window.dispatcher.trigger('keyup:' + window.allowedKeys[e.keyCode])
});
document.addEventListener('keydown', function(e) {
    e.preventDefault();
    window.dispatcher.trigger('keydown:' + window.allowedKeys[e.keyCode])
});
