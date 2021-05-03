// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    Ellipse_Size: 30,
    Download_Image: () => save(),
}
gui.add(params, "Ellipse_Size", 0, 100, 1)
gui.add(params, "Download_Image")

// -------------------
//       Drawing
// -------------------

let typoTitre;
let typoNoms;

function draw() {
    background(0)
    textFont(typoTitre);

    textSize(height / 5);
    textAlign(CENTER, CENTER);

    translate(width/2, height/2)
    fill(256);
    let title = 'Alive';
    text(title, 0, 0);

    textFont(typoNoms);
    textSize(height / 20);
    let names = 'Sirine Bradai & Marie Guillot';
    text(names, 0, 2*height/5);

}

// -------------------
//    Initialization
// -------------------


function setup() {
    p6_CreateCanvas()
    typoTitre = loadFont('./font/Thegoldsmithvintage-gXOY.otf');
    typoNoms = loadFont('./font/TitilliumWeb-ExtraLight.ttf');
}

function windowResized() {
    p6_ResizeCanvas()
}