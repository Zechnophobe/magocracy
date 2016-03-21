/**
 * Created by jeremyblack on 3/20/16.
 */


Sunday = function (){
    Day.call(this);
};

extend(Sunday, Day);
Sunday.prototype.name = 'Sunday';