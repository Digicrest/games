import Entity from './entity.js'
import Velocity from './traits/velocity.js'
import Jump from './traits/jump.js'
import { loadMarioSprite } from './sprites.js'

export function createMario() {
    return loadMarioSprite().then(sprite => {
        const mario = new Entity()
    
        mario.draw = function drawMario(context) {
            sprite.draw('idle', context, this.pos.x, this.pos.y)
        }

        mario.addTrait(new Velocity())
        mario.addTrait(new Jump())
        return mario
    })
}