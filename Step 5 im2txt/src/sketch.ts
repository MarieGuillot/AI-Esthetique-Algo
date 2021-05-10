let tmpImage: p5.Image
let textCaption : p5.TEXT

function preload() {
    tmpImage = loadImage("../img/color.png")
}

// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    Download_Image: () => save(),
}
gui.add(params, "Download_Image")

const ai = new rw.HostedModel({
  url: "https://im2txt-63bdf34c.hosted-models.runwayml.cloud/v1/",
  token: "WPvdUSaMUebtl+aeWAbWFw==",
});
  
  let img: p5.Element

  let z = []
  let noiseZ = 1;
  let colorText = 50;
  let typoNoms;
   
  function mouseClicked () {
   
    }

// -------------------
//       Drawing
// -------------------

function draw() {
  background(0)
  blendMode(BLEND)
  
  if (textCaption) {
    fill(colorText);
    if (colorText<190) {
        colorText +=2;
    }
    translate(width/2, height/2)
    textAlign(CENTER, CENTER);
    textFont(typoNoms);
    textSize(height / 20);
    text(textCaption, 0, 0);}
        //p6_SaveImageSequence(3,"jpg");
  

  resetMatrix()
  blendMode(OVERLAY )
  noiseZ+=0.05
  for (let x=0; x<width; x+=1) {
      //for (let y=0; y< height; y+=10) {
          fill(noise(0.1*x, noiseZ)*256);
          noStroke()
          rect(x, 0, 1, height) 
    }
    p6_SaveImageSequence(100,"jpg");
  }
  


// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()

    //ai.info().then(info => console.log(info));

    tmpImage.loadPixels()
    const base64Image = tmpImage.canvas.toDataURL('image/jpeg', 1.0)
    

    const inputs = {
      "image": base64Image
    };
  
  ai.query(inputs).then(outputs => {
    
    const { caption } = outputs;
    textCaption = caption;
    console.log(textCaption)
    
    // use the outputs in your project
  });
  
  typoNoms = loadFont('./font/TitilliumWeb-ExtraLight.ttf');

}

function windowResized() {
    p6_ResizeCanvas()
}
