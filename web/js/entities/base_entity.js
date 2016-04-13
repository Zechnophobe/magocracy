var Entity = function(x, y, width, height, display){

    this.x = x;
    this.y = y;
    this.destination_x = undefined;
    this.destination_y = undefined;
    this.destination_node = undefined;

    this.width = width;
    this.height = height;

    // If an entity is 'bounded' that means do not let it move outside the play area.
    this.bounded = true;

    // if an entity collides, that means it cannot move 'onto' something else that collides.
    this.collides = true;

    // Whether this entity should actually show up visually.
    this.display = display;
    window.dispatcher.listen('tick', this.update, this);
};

Entity.prototype.sprite = null;

Entity.prototype.speed = 0;

Entity.prototype.update = function(timedelta){
    this.render()
};

Entity.prototype.arrive_at_destination = function(){
    if (this.destination_node !== undefined){
        this.calculate_route(this.destination_node);
    }
};

Entity.prototype.render = function(){
    if (this.destination_x != undefined) {
        if (this.x != this.destination_x || this.y != this.destination_y){
            this.continue_move(); // TODO
        } else {
            this.destination_x = undefined;
            this.destination_y = undefined;
            this.arrive_at_destination();
        }
    }

};

Entity.prototype.in_region = function(region){
    return true;
};

Entity.prototype.at_destination_node = function(){
    return false;
};


Entity.prototype.calculate_route = function(target_node){
    if (this.at_destination_node()){
        this.destination_node = undefined;
        return;
    }
    if (this.in_region(target_node.region())) {
        this.destination_x = target_node.x;
        this.destination_y = target_node.y;
        return;
    }
    var closest = null;
    var closest_distance = 0;
    for (var node in target_node.region().entry_nodes){
        if (closest === null || distance(node, this) < closest_distance){
            closest = node;
            closest_distance = distance(closest, this);
        }
    }
    if (closest !== null){
        this.destination_x = closest.x;
        this.destination_y = closest.y;
        return;
    }
    console.log("ERROR: Tried to go to node with no valid entry nodes." + target_node);
};

Entity.prototype.make_selected = function(){
    window.dispatcher.release_event('mouseup', this.clicked);
    window.dispatcher.listen('mouseup', this.clicked, this);
};

Entity.prototype.clicked = function(event){
    this.destination_x = event.x;
    this.destination_y = event.y;
};

Entity.prototype.continue_move =  function(){
    this.rotate_towards(this.destination_x, this.destination_y);
    this.animate_to(this.destination_x, this.destination_y);
};

Entity.prototype.rotate_towards = function(x, y){
    var angle = Math.atan2(y - this.y, x - this.x);
    if (angle < 0){
        angle += 360;
    }
    this.sprite.rotate_to(angle);
};

Entity.prototype.animate_to = function(x, y){
    this.sprite.go_to(x, y)
};

var BFFSprite = function(sprite_location){
    var animation = new createjs.SpriteSheet({
        animations: {
            walk: [0,28]
        },
        images: [sprite_location],
        frames: {
            regX: 50,
            regY: 50,
            height: 100,
            width: 100
        }
    });
    this.sprite = new createjs.Sprite(animation);
};

BFFSprite.prototype.rotation = function(new_rotation){
    if (new_rotation === undefined){
        return this.sprite.rotation;
    }
    this.sprite.rotation = new_rotation;

};

BFFSprite.prototype.rotate_to = function(new_rotation){
    createjs.Tween.get( this.sprite, { loop: false }).to({rotation:new_rotation}, 500, createjs.Ease.linear);
};

BFFSprite.prototype.go_to = function(x, y, interval){
    createjs.Tween.get( this.sprite, { loop: false}).to({y:y, x:x}, interval, createjs.Ease.linear);
};