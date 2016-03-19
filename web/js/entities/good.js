/**
 * Created by jeremyblack on 2/5/16.
 */


Good = function(sprite, good_name, cost, rarity){
    this.good_name = good_name;
    this.cost = cost;
    this.rarity = rarity;
    Entity.call(this, 0, 0, sprite, 0, 0, false)
};
extend(Good, Entity);

TrickleMeElmer = function(){
    Good.call(this, graphics.WATER_BLOCK, 'Trickle Me Elmer', 100, 3);
};
extend(TrickleMeElmer, Good);

FancyWatch = function(){
    Good.call(this, graphics.PRINCESS_SPRITE, 'Fancy Watch', 120, 1);
};
extend(FancyWatch, Good);


GoodList = [
    TrickleMeElmer,
    FancyWatch
];

random_good = function(){
  return new GoodList[Math.floor(Math.random() * GoodList.length)]
};