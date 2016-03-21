/**
 * Created by jeremyblack on 3/20/16.
 */


var Game = function() {
    this.employee_roster = new Roster(12);
    this.store_funds = 100;
    this.schedule = new Schedule();
    this.day_of_week = null;
};

Game.prototype.prepare_next_day = function(){
    if (this.day_of_week !== null){
        this.day_of_week += 1;
    } else {
        this.day_of_week = 0;
    }
    var new_day = new DAYS_OF_THE_WEEK[this.day_of_week];
    this.schedule.new_day(new_day);

};