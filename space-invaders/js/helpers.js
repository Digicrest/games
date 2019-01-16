// Helper Functions

// Screen
function Screen(width, height) {
    this.width = width;
    this.height = height;

    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.ctx = this.canvas.getContext("2d");
}

Screen.prototype.drawSprite = function(sprite, x, y) {
    this.ctx.drawImage(sprite.image, sprite.x, sprite.y, sprite.width, sprite.height, x, y);
}

// Sprite
function Sprite (image, x, y, w, h) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}

// Input Handler
function InputHandler() {
    this.down = {};
    this.pressed = {};

    let _this = this;

    document.addEventListener("keydown", e => {
        _this.down[e.keyCode] = true;
    });
    
    document.addEventListener("keyup", e => {
        delete _this.down[e.keyCode];
        delete _this.pressed[e.keyCode];
    });

};

InputHandler.prototype.isDown = function(code) {
    return this.down[code];
}
InputHandler.prototype.isPressed = function (code) {
    if(this.pressed[code]) {
        return false;
    } else if (this.down[code]) {
        return this.pressed[code] = true;
    }
    return false;
}