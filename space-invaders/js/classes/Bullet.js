class Bullet {
    constructor(x, y, vel_y, w, h, color) {
        this.x = x;
        this.y = y;
        this.vel_y = vel_y;
        this.width = w;
        this.height = h;
        this.color = color;
    }

    update() {
        this.y += this.vel_y;
    }
}