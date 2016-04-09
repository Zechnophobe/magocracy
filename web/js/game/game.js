/**
 * Created by jeremyblack on 3/20/16.
 */


var Game = function() {
    this.employee_roster = new Roster(12);
    this.store_funds = 100;
    this.schedule = new Schedule();
    this.day_of_week = 0;
    for (var i = 0; i < DAYS_OF_THE_WEEK.length; i++){
        var new_day = new DAYS_OF_THE_WEEK[i];
        this.schedule.new_day(new_day);
    }
    // On the first day the player just gets the first 4 random employees. Streamlines the game start and
    // defers the 'hard' decision of who should work to after a player has a little better understanding of the
    // game.
    this.schedule.days[0].add_employee(this.employee_roster.employees[0]);
    this.schedule.days[0].add_employee(this.employee_roster.employees[1]);
    this.schedule.days[0].add_employee(this.employee_roster.employees[2]);
    this.schedule.days[0].add_employee(this.employee_roster.employees[3]);
};

Game.prototype.next_day = function(){
    this.day_of_week += 1;
};