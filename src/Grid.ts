import p5 from 'p5'
import Particle from './Particle'
import Empty from './Empty'

class Grid {
    p: p5
    size: number
    rows: number
    cols: number
    grid: Particle[][]
    updated: [number, number][] = []

    constructor(p: p5, rows: number, cols: number, size: number) {
        this.p = p
        this.rows = rows
        this.cols = cols
        this.size = size
        this.grid = makeGrid(p, this.rows, this.cols)
    }

    isEmpty(particle: Particle) {
        return particle?.isEmpty
    }

    draw = () => {
        for (const [i, j] of this.updated) {
            const particle = this.grid[i][j]

            if (particle.isEmpty) {
                this.p.fill(0)
                this.p.rect(i * this.size, j * this.size, this.size, this.size)
                continue
            }
            
            this.p.noStroke()
            this.p.fill(this.p.hue(particle.color), this.p.saturation(particle.color), this.p.lightness(particle.color))

            this.p.rect(i * this.size, j * this.size, this.size, this.size)
        }

        this.updated = []
    }

    swap(x1: number, y1: number, x2: number, y2: number) {
        const temp = this.grid[x1][y1]
        this.grid[x1][y1] = this.grid[x2][y2]
        this.grid[x2][y2] = temp
    }

    update() {
        // we loop by column first and we loop backwards so that
        // later particles doesn't overwrite earlier particles
        for (let j = this.cols - 1; j >= 0; j--) {
            for (let i = 0; i < this.rows; i++) {
                if (this.grid[i][j].isEmpty) {
                    continue
                }

                const below = this.grid[i][j + 1]
                const dir = this.p.random(1) > 0.5 ? 1 : -1
                const belowLeft = this.grid[i - dir]?.[j + 1]
                const belowRight = this.grid[i + dir]?.[j + 1]

                if (below?.isEmpty) {
                    this.swap(i, j, i, j + 1)
                    
                    this.updated.push([i, j + 1])
                } else if (belowLeft?.isEmpty) {
                    this.swap(i, j, i - dir, j + 1)

                    this.updated.push([i - dir, j + 1])
                } else if (belowRight?.isEmpty) {
                    this.swap(i + dir, j + 1, i, j)

                    this.updated.push([i + dir, j + 1])
                }

                this.updated.push([i, j])
            }
        }
    }

    addParticle(p: p5, particle: Particle) {
        const radius = 2
        const probability = 0.4
        const x = Math.floor(p.mouseX / this.size)
        const y = Math.floor(p.mouseY / this.size)

        for (let i = x - radius; i <= x + radius; i++) {
            for (let j = y - radius; j <= y + radius; j++) {
                if (p.random(1) < probability) {
                    if (i < 0 || i >= this.rows || j < 0 || j >= this.cols) {
                        continue
                    }

                    this.grid[i][j] = particle
                }
            }
        }
    }
}

function makeGrid(p: p5, rows: number, cols: number) {
    const arr = new Array(rows)

    for (let i = 0; i < rows; i++) {
        arr[i] = new Array(cols)

        for (let j = 0; j < cols; j++) {
            arr[i][j] = new Empty(p)
        }
    }

    return arr
}

export default Grid
