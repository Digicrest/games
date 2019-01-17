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

    drawBullet(bullet) {
        this.ctx.fillStyle = bullet.color;
        this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }
}