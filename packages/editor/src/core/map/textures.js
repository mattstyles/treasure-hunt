
import { Texture, Rectangle, settings, SCALE_MODES } from 'pixi.js'

// @TODO use 1x for window.devicePixelRatio === 1
// In our case using the 1x is actually fine as we're nearest neighbour
// blending anyways
import spritesheet from 'assets/cp437@2x.png' // set constants.cellsize to 10
// import spritesheet from '../zx_evolution_8x8@2x.png' // set constants.cellsize to 8

// Pixel scaling, no antialiasing
settings.SCALE_MODE = SCALE_MODES.NEAREST

// Texture size is the size of the atlas, in this case 16 by 16 items
const texSize = [16, 16]

// Cell size refers to the size of each cell in the atlas
const texCellSize = [10, 10]

export const baseTexture = Texture.from(spritesheet)
export const frames = []

for (let v = 0; v < texSize[1]; v++) {
  for (let u = 0; u < texSize[0]; u++) {
    frames.push(new Texture(
      baseTexture,
      new Rectangle(
        (u * texCellSize[0]),
        (v * texCellSize[1]),
        texCellSize[0],
        texCellSize[1]
      )
    ))
  }
}
