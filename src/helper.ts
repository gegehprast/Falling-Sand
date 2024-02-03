import p5 from 'p5'

let frameRateDisplay: string = ''
let frameCounter: number = 0

export function showFrameRate(p: p5) {
    frameCounter++

    // update frame rate every 10 frames
    if (frameCounter % 10 === 0) {
        frameRateDisplay = p.frameRate().toFixed()
    }

    p.fill('red')
    p.rect(0, 0, 40, 40)
    p.fill(255)
    p.textSize(20)
    p.text(frameRateDisplay, 20, 20)
}
