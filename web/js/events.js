/**
 * Created by jeremyblack on 2/3/16.
 */

Dispatcher = function(){
    this.listeners = {};
};
Dispatcher.prototype.listen = function(event, callback, context){
    if (this.listeners[event] === undefined){
        this.listeners[event] = [[callback, context]];
    } else {
        this.listeners[event].push([callback, context]);
    }
};

Dispatcher.prototype.trigger = function(event, event_data){
    if (this.listeners[event] !== undefined){
        for (var i = 0; i < this.listeners[event].length; i++){
            var callback = this.listeners[event][i][0];
            var context = this.listeners[event][i][1];
            callback.call(context, event_data);
        }
    }
};

Dispatcher.prototype.release = function(event){
    this.listeners[event] = [];
};

window.dispatcher = new Dispatcher();