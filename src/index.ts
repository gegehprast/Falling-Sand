import p5 from 'p5'
import Grid from './Grid'
import Sand from './Sand'

const WIDTH = 400
const HEIGHT = 500
const SIZE = 10

let grid: Grid

let lastCalledTime = Date.now()

const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(WIDTH, HEIGHT)
        p.colorMode(p.HSL)

        grid = new Grid(p, SIZE, WIDTH, HEIGHT)
    }

    p.draw = () => {
        p.background(0)

        grid.draw(p)

        grid.update()

        if (p.mouseIsPressed) {
            addSand(p)
        }
    }
}

const addSand = (p: p5) => {
    const now = Date.now()

    if (now - lastCalledTime >= 100) {
        lastCalledTime = now
        
        grid.addObject(p, new Sand(p))
    }
}


new p5(sketch)
