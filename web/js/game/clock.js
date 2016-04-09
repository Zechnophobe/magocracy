/**
 * Created by jeremyblack on 4/5/16.
 */

Clock = function(interval, callback){
    this.interval = interval;
    this.time = 0;
    this.callback = callback;
    this.timeout = null;
};

Clock.prototype.start = function(){
    var self = this;
    this.timeout = setTimeout(function(){
        self.time += self.interval;
        self.callback();
    }, this.interval)
};

Clock.prototype.stop = function(){
    clearTimeout(this.timeout);

};

Clock.prototype.set = function(time){
    this.time = time;
};

Clock.prototype.adjust = function(adjustment){
    this.time += adjustment;
};