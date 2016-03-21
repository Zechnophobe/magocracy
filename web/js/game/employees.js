/**
 * Created by jeremyblack on 3/20/16.
 */

DAYS_OF_THE_WEEK = [
    Saturday,
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday
];


Roster = function(size){
    this.employees = [];
    for (var i = 0; i < size; i++){
        this.employees.push(new Employee());
    }
};


Schedule = function(){
    this.days = [];
};

Schedule.prototype.new_day = function(day){
    this.days.push(day);
};

