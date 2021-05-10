let colorImg: p5.Image
let nbImg: p5.Image

// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
   
    Download_Image: () => save(),
}
gui.add(params, "Download_Image")

// -------------------
//       Drawing
// -------------------

let transparence = 0

function draw() {
    image(nbImg, 0, 0, width, height)
    tint(255, transparence)
    transparence+=2
    image(colorImg, 0, 0, width, height)
    p6_SaveImageSequence(128, "jpg")
}

// -------------------
//    Initialization
// -------------------


function preload() {
    colorImg = loadImage("../img/color.png")
    nbImg = loadImage("../img/nb.png")
}

function setup() {
    p6_CreateCanvas()
}

function windowResized() {
    p6_ResizeCanvas()
}