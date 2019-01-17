// Helper Functions

// Screen
class GameScreen {
    constructor(width, height) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.width = width;
        this.canvas.height = this.height = height;

        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
    }

    drawSprite(sprite, x, y) {
        this.ctx.drawImage(
            sprite.image, 
            sprite.x, sprite.y, 
            sprite.width, sprite.height, 
            x, y, sprite.width, sprite.height
        );
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}

// Sprite
class Sprite {
    constructor(img, x, y, w, h) {
        this.image = img;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
}

// Input Handler
class InputHandler {
    constructor() {
        this.down = {};
        this.pressed = {};

        document.addEventListener("keydown", e => {
            this.down[e.keyCode] = true;
        });

        document.addEventListener("keyup", e => {
            delete this.down[e.keyCode];
            delete this.pressed[e.keyCode];
        });
    }

    isDown(code) {
        return this.down[code];
    }

    isPressed(code) {
        if (this.pressed[code]) { return false; } 
        else if (this.down[code]) { return this.pressed[code] = true; }
        return false;
    }
}