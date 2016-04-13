/**
 * Created by jeremyblack on 2/5/16.
 */
Shopper = function(x, y, width, height){
    Entity.call(this, x, y, width, height, true);
    this.shopping_list = [];
    this.basket = [];
    this.difficulty = 0.5;
    this.stress = 0;
    this.generate_goods();
    this.sprite = new BFFSprite(graphics.DUDE);
};


extend(Shopper, Entity);
Shopper.prototype.speed = 120;

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

Shopper.prototype.acquire_good = function(good){
    /**
     * Give a shopper a good.
     */
    this.basket.push(good)
};

Shopper.prototype.pay_for_good = function (good){
    /**
     * pays for a good the shopper currently has in their inventory.
     */
    for (var i = 0; i < this.basket.length; i++){
        if (this.basket[i] == good){
            good.paid_for = true;
        }
    }
};