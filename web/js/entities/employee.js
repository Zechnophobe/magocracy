/**
 * Created by jeremyblack on 2/5/16.
 */


Employee = function(){
    Entity.call(this, 0, 0, graphics.BOY_SPRITE, width, height, true);
    this.sanity = rand(60, 100);
    this.reliability = rand(70, 97);
    this.desperation = rand(35, 60);
    this.compassion = rand(0, 100);
    this.available = true;
    this.skills = {
        stock: 3,
        clean: 3,
        cashier: 3,
        help: 3,
        greet: 3
    };
};
extend(Employee, Entity);


Employee.prototype.take_break = function(duration){
    this.available = false;
    var self = this;
    setTimeout(function(){
        self.available = true;
    }, duration * 1000);
};

Employee.prototype.go_home = function(){
    this.available = false;
};

Employee.prototype.update = function(timedelta){
  if (this.available){
      Entity.prototype.call(this, timedelta)
  }
};