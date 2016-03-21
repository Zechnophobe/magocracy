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

Entity.prototype.update_acceleration = function(){
    var decay_direction = 1;
    if (this.impulse_up){
        this.acceleration_y = Math.max(-this.max_acceleration,this.acceleration_y - this.impulse_factor)
    } else if (this.impulse_down){
        this.acceleration_y = Math.min(this.max_acceleration, this.acceleration_y + this.impulse_factor)
    } else if (this.speed_y != 0) {
        if (this.speed_y > 0){
            this.acceleration_y = -0.8 * this.max_acceleration;
            this.acceleration_y = Math.max(-this.speed_y, this.acceleration_y);
        } else {
            this.acceleration_y = 0.8 * this.max_acceleration;
            this.acceleration_y = Math.min(-this.speed_y, this.acceleration_y);
        }
    } else {
        this.acceleration_y = 0;
    }

    if (this.impulse_left){
        this.acceleration_x = Math.max(-this.max_acceleration, this.acceleration_x - this.impulse_factor)
    } else if (this.impulse_right){
        this.acceleration_x = Math.min(this.max_acceleration, this.acceleration_x + this.impulse_factor)
    } else if (this.speed_x != 0) {
        if (this.speed_x > 0){
            this.acceleration_x = -0.8 * this.max_acceleration;
            this.acceleration_x = Math.max(-this.speed_x, this.acceleration_x);
        } else {
            this.acceleration_x = 0.8 * this.max_acceleration;
            this.acceleration_x = Math.min(-this.speed_x, this.acceleration_x);
        }
    } else {
        this.acceleration_x = 0;
    }
};


Entity.prototype.update_speed = function(){
    this.speed_x = Math.min(this.max_speed, this.speed_x + this.acceleration_x);
    this.speed_y = Math.min(this.max_speed, this.speed_y + this.acceleration_y);
};

Entity.prototype.update_position = function(){

    var new_position = this.loc_x + this.speed_x;
    if (this.bounded){
        new_position = Math.min(new_position, window.renderer.width() - this.width);
        new_position = Math.max(new_position, 0);
    }

    this.loc_x = new_position;

    new_position = this.loc_y + this.speed_y;
    if (this.bounded){
        new_position = Math.min(new_position, window.renderer.height() - this.height);
        new_position = Math.max(new_position, 0);
    }

    this.loc_y = new_position;
};

Entity.prototype.update = function(timedelta){
    this.update_acceleration();
    this.update_speed();
    this.update_position();
    this.render()
};

Entity.prototype.render = function(){
    if (this.display){
        window.renderer.render_entity(this);
    }

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

Entity.prototype.start_accelerate_left = function(){
    this.impulse_right = false;
    this.impulse_left = true;
};

Entity.prototype.start_accelerate_right = function(){
    this.impulse_right = true;
    this.impulse_left = false;
};

Entity.prototype.start_accelerate_up = function(){
    this.impulse_up = true;
    this.impulse_down = false;
};

Entity.prototype.start_accelerate_down = function(){
    this.impulse_up = false;
    this.impulse_down = true;
};

Entity.prototype.stop_accelerate_left = function(){
    this.impulse_left = false;
    this.acceleration_x = 0;
};

Entity.prototype.stop_accelerate_right = function(){
    this.impulse_right = false;
    this.acceleration_x = 0;
};

Entity.prototype.stop_accelerate_up = function(){
    this.impulse_up = false;
    this.acceleration_y = 0;
};

Entity.prototype.stop_accelerate_down = function(){
    this.impulse_down = false;
    this.acceleration_y= 0;
};