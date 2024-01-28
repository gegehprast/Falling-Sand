import p5 from 'p5'
import Particle from './Particle'
import Empty from './Empty'

class Grid {
    p: p5
    size: number
    rows: number
    cols: number
    grid: Particle[][]

    constructor(p: p5, size: number, width: number, height: number) {
        this.p = p
        this.size = size
        this.rows = width / size
        this.cols = height / size
        this.grid = makeGrid(p, this.rows, this.cols)
    }

    isEmpty = (x: number, y: number) => {
        return this.grid[x]?.[y] instanceof Empty
    }

    set = (x: number, y: number, particle: Particle) => {
        this.grid[x][y] = particle
    }

    clear = () => {
        this.grid = makeGrid(this.p, this.rows, this.cols)
    }

    swap(x1: number, y1: number, x2: number, y2: number) {
        const temp = this.grid[x1][y1]
        this.grid[x1][y1] = this.grid[x2][y2]
        this.grid[x2][y2] = temp
    }

    draw = (p: p5) => {
        for (let x = 0; x < this.rows; x++) {
            for (let y = 0; y < this.cols; y++) {
                p.noStroke()
                p.fill(this.grid[x][y].color)
                p.rect(x * this.size, y * this.size, this.size, this.size)
            }
        }
    }

    updateCell(x: number, y: number) {
        const below = {x: x, y: y + 1}
        const dir = -1
        const belowLeft = {x: x + dir, y: y + 1}
        const belowRight = {x: x - dir, y: y + 1}

        if (this.isEmpty(below.x, below.y)) {
            this.swap(x, y, below.x, below.y)
        } else if (this.isEmpty(belowLeft.x, belowLeft.y)) {
            this.swap(x, y, belowLeft.x, belowLeft.y)
        } else if (this.isEmpty(belowRight.x, belowRight.y)) {
            this.swap(x, y, belowRight.x, belowRight.y)
        }
    }

    update() {
        for (let x = 0; x < this.rows; x++) {
            for (let y = this.cols - 1; y >= 0; y--) {
                this.updateCell(x, y)
            }
        }
    }

    addObject(p: p5, object: Particle) {
        const x = Math.floor(p.mouseX / this.size)
        const y = Math.floor(p.mouseY / this.size)

        if (x < 0 || x >= this.rows || y < 0 || y >= this.cols) {
            return
        }

        this.set(x, y, object)
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
