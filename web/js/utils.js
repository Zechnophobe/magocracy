/**
 * Created by jeremyblack on 2/5/16.
 */


extend = function(base_class, super_class){
    base_class.prototype = Object.create(super_class.prototype);
    base_class.prototype.constructor = base_class;
    base_class.super = super_class;
};