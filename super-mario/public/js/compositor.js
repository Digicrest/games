// responsible for drawing layers in order
export default class Compositor {
    constructor() {
        this.layers = []
    }

    draw(context) {
        this.layers.forEach(layer => {
            layer(context)
        })
    }
}