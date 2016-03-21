/**
 * Created by jeremyblack on 3/20/16.
 */



Wednesday = function (){
    Day.call(this);
};

extend(Wednesday, Day);
Wednesday.prototype.name = 'Wednesday';
Wednesday.prototype.start_time = 8;
Wednesday.prototype.closing_time = 5;