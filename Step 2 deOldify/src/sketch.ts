// -------------------
//  Parameters and UI
// -------------------
let tmpImage: p5.Image
function preload() {
    tmpImage = loadImage("img/old.png")
}
//const base64Image = tmpImage.canvas.toDataURL()


const gui = new dat.GUI()
const params = {
    Ellipse_Size: 30,
    Download_Image: () => save(),
}
gui.add(params, "Ellipse_Size", 0, 100, 1)
gui.add(params, "Download_Image")

const ai = new rw.HostedModel({
    url: "https://deoldify-adc4e64d.hosted-models.runwayml.cloud/v1",
  token: "PKOqb8Tnp0znteIEhJqdTw==",
 });

// -------------------
//       Drawing
// -------------------


function draw() {
    if (outImage)
    image(outImage, 0, 0, width, height)
}

// -------------------
//    Initialization
// -------------------

let img: p5.Element
//const z = []

let outImage: p5.Element

 function setup() {
    p6_CreateCanvas()
    tmpImage.loadPixels()
    const base64Image = tmpImage.canvas.toDataURL()
    

    const inputs = {
        "image": base64Image,
        "render_factor": 20
    };


    ai.query(inputs).then(outputs => {
        const { image  } = outputs;
        outImage=createImg(image);
        outImage.hide()
      });
    }


function windowResized() {
    p6_ResizeCanvas()
}