/**
 * Created by jeremyblack on 2/5/16.
 */


Good = function(){
    Entity.call(this, 0, 0, 50, 50, false)
};
extend(Good, Entity);
Good.prototype.good_name = 'Unnamed Good';
Good.prototype.cost = 0;
Good.prototype.rarity = 0;
Good.prototype.paid_for = false;

TrickleMeElmer = function(){
    this.sprite = graphics.WATER_BLOCK;
    Good.call(this);
    this.good_name = 'Trickle Me Elmer';
    this.cost = 100;
    this.rarity = 10;
};
extend(TrickleMeElmer, Good);
TrickleMeElmer.prototype.good_name = 'Trickle Me Elmer';
TrickleMeElmer.prototype.cost = 100;
TrickleMeElmer.prototype.rarity = 10;
TrickleMeElmer.prototype.sprite = graphics.WATER_BLOCK;

FancyWatch = function(){
    this.sprite = graphics.GRASS_BLOCK;
    Good.call(this);
    this.good_name = 'Fancy Watch';
    this.cost = 300;
    this.rarity = 2;
};
extend(FancyWatch, Good);
FancyWatch.prototype.good_name = 'Fancy Watch';
FancyWatch.prototype.cost = 300;
FancyWatch.prototype.rarity = 2;
FancyWatch.prototype.sprite = graphics.GRASS_BLOCK;


GoodList = [
    TrickleMeElmer,
    FancyWatch
];

random_good = function(){
    var rarity_sum = 0;
    for (var i = 0; i < GoodList.length; i++){
        rarity_sum += GoodList[i].prototype.rarity;
    }
    var random_value = rand(0, rarity_sum);

    var finder_sum = 0;
    for (i = 0; i < GoodList.length; i++){
        finder_sum += GoodList[i].prototype.rarity;
        if (finder_sum > random_value){
            return new GoodList[i];
        }
    }
};