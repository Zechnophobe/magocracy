/**
 * Created by jeremyblack on 3/20/16.
 */
Monday = function (){
    Day.call(this);
};

extend(Monday, Day);
Monday.prototype.name = 'Monday';
Monday.prototype.start_time = 9;