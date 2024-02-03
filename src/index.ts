import p5 from 'p5'
import Grid from './Grid'
import Sand from './Sand'
import { showFrameRate } from './helper'

const WIDTH = 1000
const HEIGHT = 1000
const SIZE = 10
const ROWS = Math.floor(WIDTH / SIZE)
const COLS = Math.floor(HEIGHT / SIZE)
const ROF = 10

let grid: Grid

let lastCalledTime = Date.now()

let pauseButton: p5.Element
let nextFrameButton: p5.Element
let addparticleButton: p5.Element

const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(WIDTH, HEIGHT)
        p.colorMode(p.HSL)
        p.background(0)
        p.textAlign(p.CENTER, p.CENTER)

        grid = new Grid(p, ROWS, COLS, SIZE)

        pauseButton = p.createButton('Pause')
        pauseButton.position(10, HEIGHT + 10)
        pauseButton.mousePressed(() => {
            if (p.isLooping()) {
                p.noLoop()
                pauseButton.html('Play')
            } else {
                p.loop()
                pauseButton.html('Pause')
            }
        })

        nextFrameButton = p.createButton('Next Frame')
        nextFrameButton.position(10, HEIGHT + 40)
        nextFrameButton.mousePressed(() => {
            p.draw()
        })

        addparticleButton = p.createButton('Add Particle')
        addparticleButton.position(10, HEIGHT + 70)
        addparticleButton.mousePressed(() => {
            grid.grid[0][0] = new Sand(p)
            grid.grid[grid.rows - 1][0] = new Sand(p)
        })
    }

    p.draw = () => {

        grid.update()

        grid.draw()

        if (p.mouseIsPressed) {
            addSand(p)
        }

        // show frame rate
        showFrameRate(p)

        p.fill('red')
        p.rect(0, 40, 100, 40)
        p.fill(255)
        p.textSize(20)
        const x = Math.floor(p.mouseX / grid.size)
        const y = Math.floor(p.mouseY / grid.size)
        p.text(`${x}, ${y}`, 50, 60)
    }
}

const addSand = (p: p5) => {
    const now = Date.now()

    if (now - lastCalledTime >= ROF) {
        lastCalledTime = now
        
        grid.addParticle(p, new Sand(p))
    }
}


new p5(sketch)
