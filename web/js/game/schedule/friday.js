/**
 * Created by jeremyblack on 3/20/16.
 */


Friday = function (){
    Day.call(this);
};

extend(Friday, Day);
Friday.prototype.name = 'Black Friday';
Friday.prototype.start_time = 8;
Friday.prototype.closing_time = 20;