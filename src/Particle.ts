import p5 from 'p5'

const COLOR = 'hsl(40, 90%, 60%)'

abstract class Particle {
    color: p5.Color

    isEmpty: boolean = false

    constructor(p: p5) {
        this.color = p.color(COLOR)
    }
}

export default Particle
