/**
 * Created by jeremyblack on 2/3/16.
 */

Dispatcher = function(){
    this.listeners = {};
};
Dispatcher.prototype.listen = function(event, callback, context){
    var event_info = {callback: callback, context: context};
    if (this.listeners[event] === undefined){
        this.listeners[event] = [event_info];
    } else {
        this.listeners[event].push(event_info);
    }
};

Dispatcher.prototype.trigger = function(event, event_data){
    /**
     * When we get the event, pass through any event data to all listeners
     */
    if (this.listeners[event] !== undefined){
        for (var i = 0; i < this.listeners[event].length; i++){
            var event_info = this.listeners[event][i];
            event_info.callback.call(event_info.context, event_data);
        }
    } else {
        // Nothing, we weren't listening for this event.
    }
};

Dispatcher.prototype.release = function(event){
    this.listeners[event] = [];
};

window.dispatcher = new Dispatcher();