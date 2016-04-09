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

/**
 * Each employee has a station that they work at
 * While working a station and not on a special duty, they gain experience for that station, and can level up, becoming
 * better at it.
 *
 * Special duties are things like when a customer demands the manager, helping a lost child, or taking a break. While
 * they do them, they are not useful at all, but can possibly still be stressed out.
 */