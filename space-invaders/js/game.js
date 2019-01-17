let gameScreen, input, frames, sprite_frame, level_frame;
let alien_sprites, tank_sprite, city_sprite;
let aliens, direction, tank, bullets, cities;

function main() {
    gameScreen = new GameScreen(504, 600);
    input = new InputHandler();

    let sprite_sheet = new Image();
    sprite_sheet.src = "./assets/invaders.png";

    sprite_sheet.addEventListener("load", function () {
        alien_sprites = [
            [new Sprite(this, 0, 0, 22, 16), new Sprite(this, 0, 16, 22, 16)],
            [new Sprite(this, 22, 0, 16, 16), new Sprite(this, 22, 16, 16, 16)],
            [new Sprite(this, 38, 0, 24, 16), new Sprite(this, 38, 16, 24, 16)],
        ];
        tank_sprite = new Sprite(this, 62, 0, 22, 16);
        city_sprite = new Sprite(this, 84, 8, 36, 24);

        init();
        run();
    })

}

function init() {
    frames = 0;
    sprite_frame = 0;
    level_frame = 20;
    aliens = [];
    direction = 1;
    bullets = [];

    tank = {
        sprite: tank_sprite,
        x: (gameScreen.width - tank_sprite.width) / 2,
        y: gameScreen.height - (30 + tank_sprite.height) / 2,
    }

    // Create 5 Rows of aliens with the corresponding sprites and set to aliens array
    let alien_rows = [1, 0, 0, 2, 2];
    for (let i = 0; i < alien_rows.length; i++) {
        for (let j = 0; j < 10; j++) {
            const enemy = alien_rows[i];

            aliens.push({
                sprites: alien_sprites[enemy],
                width: alien_sprites[enemy][0].width,
                height: alien_sprites[enemy][0].height,
                x: 30 + (j * 30) + [0, 4, 0][enemy],
                y: 30 + (i * 30),
            })
        }
    }
}

function run() {
    let loop = function () {
        update();
        render();
        window.requestAnimationFrame(loop, gameScreen.canvas);
    }
    window.requestAnimationFrame(loop, gameScreen.canvas);
}

function update() {
    if (input.isDown(37)) { tank.x -= 4; }  // MOVE LEFT
    if (input.isDown(39)) { tank.x += 4; }  // MOVE RIGHT
    tank.x = Math.max(Math.min(tank.x, gameScreen.width - (30 + tank.sprite.width)), 30);

    if (input.isPressed(32)) {              // FIRE BULLET
        bullets.push(new Bullet(tank.x + 10, tank.y, -8, 2, 6, "#FFF"))
    }

    for (let i = 0; i < bullets.length; i++) {
        const bullet = bullets[i];
        bullet.update();

        // Destroy bullets after leaving canvas
        if (bullet.y + bullet.height < 0 || bullet.y > gameScreen.height) {
            bullets.splice(i, 1);
            i--;
            continue;
        }
    }

    // Select Random Alien and Shoot Down Toward Player
    if (Math.random() < 0.03 && aliens.length > 0) {
        let shooter = aliens[Math.round(Math.random() * (aliens.length - 1))];

        for (let i = 0; i < aliens.length; i++) {
            let alien = aliens[i];
            
            if (AABBIntersect(shooter.x, shooter.y, shooter.width, 100, alien.x, alien.y, alien.width, alien.height)) {
                shooter = alien;
            }
        }

        bullets.push(new Bullet(
            (shooter.x + shooter.width * 0.5),  // x
            (shooter.y + shooter.height),       // y
            4, 2, 4, "#FFF")                    // velocity, w, h, color
        )
    }

    frames++;
    if (!(frames % level_frame)) {
        sprite_frame = (sprite_frame + 1) % 2;

        let _max = 0, _min = gameScreen.width;

        for (let i = 0; i < aliens.length; i++) {
            let alien = aliens[i];
            alien.x += 30 * direction;

            _max = Math.max(_max, alien.x + alien.width);
            _min = Math.min(_min, alien.x);
        }

        if (_max > gameScreen.width || _min < 30) {
            direction *= -1;

            for (let i = 0; i < aliens.length; i++) {
                let alien = aliens[i];
                alien.x += 30 * direction;
                alien.y += 30;
            }
        }
    }
}

function render() {
    gameScreen.clear();

    for (let i = 0; i < aliens.length; i++) {
        let alien = aliens[i];
        gameScreen.drawSprite(alien.sprites[sprite_frame], alien.x, alien.y);
    }

    gameScreen.ctx.save();
    for (let i = 0; i < bullets.length; i++) {
        const bullet = bullets[i];
        gameScreen.drawBullet(bullet);
    }
    gameScreen.ctx.restore();
    gameScreen.drawSprite(tank.sprite, tank.x, tank.y)
}

main();