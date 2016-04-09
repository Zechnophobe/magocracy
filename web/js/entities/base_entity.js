var Entity = function(x, y, width, height, display){

    this.speed_x = 0;
    this.speed_y = 0;

    this.acceleration_x = 0;
    this.acceleration_y = 0;

    this.max_speed = 10;
    this.max_acceleration = .05;

    this.impulse_up = false;
    this.impulse_down = false;
    this.impulse_left = false;
    this.impulse_right = false;

    this.impulse_factor = .01;

    this.loc_x = x;
    this.loc_y = y;

    this.width = width;
    this.height = height;

    // If an entity is 'bounded' that means do not let it move outside the play area.
    this.bounded = true;

    // if an entity collides, that means it cannot move 'onto' something else that collides.
    this.collides = true;

    this.display = display;
    window.dispatcher.listen('tick', this.update, this);
};

Entity.prototype.sprite = null;

Entity.prototype.update = function(timedelta){
    this.render()
};

Entity.prototype.render = function(){
    if (this.display){
        window.renderer.render_entity(this);
    }

};

Entity.prototype.in_region = function(region){
  return false;
};


Entity.prototype.go_to_node = function(target_node){
    if (this.in_region(target_node.region())) {
        this.go_to_location(target_node.x, target_node.y);
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
        this.go_to_location(closest.x, closest.y);
        return;
    }
    console.log("ERROR: Tried to go to node with no valid entry nodes." + target_node);
};

Entity.prototype.make_selected = function(){
    window.dispatcher.release('keyup:left');
    window.dispatcher.release('keyup:right');
    window.dispatcher.release('keyup:up');
    window.dispatcher.release('keyup:down');

    window.dispatcher.release('keydown:left');
    window.dispatcher.release('keydown:right');
    window.dispatcher.release('keydown:up');
    window.dispatcher.release('keydown:down');

    window.dispatcher.listen('keydown:up', this.start_accelerate_up, this);
    window.dispatcher.listen('keydown:down', this.start_accelerate_down, this);
    window.dispatcher.listen('keydown:left', this.start_accelerate_left, this);
    window.dispatcher.listen('keydown:right', this.start_accelerate_right, this);

    window.dispatcher.listen('keyup:up', this.stop_accelerate_up, this);
    window.dispatcher.listen('keyup:down', this.stop_accelerate_down, this);
    window.dispatcher.listen('keyup:left', this.stop_accelerate_left, this);
    window.dispatcher.listen('keyup:right', this.stop_accelerate_right, this);
};
