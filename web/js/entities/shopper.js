/**
 * Created by jeremyblack on 2/5/16.
 */
Shopper = function(x, y, sprite, width, height){
    Entity.call(this, x, y, sprite, width, height);
    this.shopping_list = [];
    this.difficulty = 0.5;
    this.stress = 0;
    this.generate_goods();
};

extend(Shopper, Entity);

Shopper.prototype.generate_goods = function(){
    /**
     * Add one or more goods to this shoppers shopping list.
     * A standard shopper can have up to things on their list.
     * @type {*[]}
     */
    this.shopping_list = [random_good()];
    while (Math.random() <= this.difficulty - 0.1 * this.shopping_list.length){
        this.shopping_list.push(random_good())
    }
};