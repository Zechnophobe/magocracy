/**
 * Created by jeremyblack on 3/20/16.
 */



Tuesday = function (){
    Day.call(this);
};

extend(Tuesday, Day);
Tuesday.prototype.name = 'Tuesday';
Tuesday.prototype.start_time = 9;
Tuesday.prototype.closing_time = 5;