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

let typoTitre;
let typoNoms;

let noiseZ = 1;
let colorText = 0;

let time = 0;


function draw() {
    blendMode(BLEND)
    translate(width/2, height/2)
    background(0)
    textFont(typoTitre);

    textSize(height / 5);
    textAlign(CENTER, CENTER);

    
    fill(colorText);
    if (colorText<190) {
        colorText +=0.8;
    }
    
    let title = 'Alive';
    text(title, 0, 0);

    textFont(typoNoms);
    textSize(height / 20);
    let names = 'Sirine Bradai & Marie Guillot';
    text(names, 0, 2*height/5);

    resetMatrix()
    blendMode(OVERLAY )
    noiseZ+=0.05
    for (let x=0; x<height; x+=1) {
        //for (let y=0; y< height; y+=10) {
            fill(noise(0.1*x, noiseZ)*256);
            noStroke()
            rect(0, x, width, 1)
       // }
    }

    //p6_SaveImageSequence(100,"jpg");

    

}

// -------------------
//    Initialization
// -------------------


function setup() {
    p6_CreateCanvas()
    typoTitre = loadFont('./font/Sarpanch-Bold.ttf');
    typoNoms = loadFont('./font/TitilliumWeb-ExtraLight.ttf');

}

function windowResized() {
    p6_ResizeCanvas()
}