import p5 from 'p5'
import Particle from './Particle'

class Empty extends Particle {
    constructor(p: p5) {
        super(p)

        this.color = p.color(0, 0, 0)
        this.isEmpty = true
    }
}

export default Empty
