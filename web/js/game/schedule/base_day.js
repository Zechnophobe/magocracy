/**
 * Created by jeremyblack on 3/20/16.
 */

Day = function(){
    this.scheduled_workers = [];
    this.events = [];
};

Day.prototype.start_time = 10;
Day.prototype.closing_time = 4;
Day.prototype.name = undefined;
Day.prototype.fully_staffed = function(){
    return self.scheduled_workers.length >= 4;
};
Day.prototype.add_employee = function(employee){
    if (!this.fully_staffed()){
        this.scheduled_workers.push(employee);
    } else {
        console.log("Tried to add too many workers to work a day.");
    }
};