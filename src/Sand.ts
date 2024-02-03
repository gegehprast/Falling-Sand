import p5 from 'p5'
import Particle from './Particle'

const COLOR = {
    HUE: 40,
    SATURATION: 90,
    LIGHTNESS: 60,
}

class Sand extends Particle {
    constructor(p: p5) {
        super(p)

        this.color = varyColor(p)
    }
}

function varyColor(p: p5) {
    const color = p.color(COLOR.HUE, COLOR.SATURATION, COLOR.LIGHTNESS)

    let hue = p.floor(p.hue(color))

    let saturation = p.saturation(color) + p.floor(p.random(-20, 0))
    saturation = p.constrain(saturation, 0, 100)
    
    let lightness = p.lightness(color) + p.floor(p.random(-10, 10))
    lightness = p.constrain(lightness, 0, 100)

    return p.color(hue, saturation, lightness)
}

export default Sand
