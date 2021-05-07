let tmpImage: p5.Image
let tmpImage2: p5.Image

function preload() {
    tmpImage = loadImage("../img/color.jpg")
    tmpImage2 = loadImage("../img/download.jpg")
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
  url: "https://first-order-motion-model-2b09c958.hosted-models.runwayml.cloud/v1/",
  token: "HYa/FxB3DqNoz/C8YfTjkg==",
});
  
  let img: p5.Element

  let z = []
   
  function mouseClicked () {
   
    }

// -------------------
//       Drawing
// -------------------

function draw() {
    if (img)
        image(img, 0, 0, width, height)
        //p6_SaveImageSequence(3,"jpg");

}

// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()

    ai.info().then(info => console.log(info));

    tmpImage.loadPixels()
    const base64Image = tmpImage.canvas.toDataURL()
    const base64Image2 = tmpImage2.canvas.toDataURL()
    

    const inputs = {
      "driving_image": base64Image2,
      "source_image": base64Image,
      "crop_square": true,
      "use_relative_movement": true
    };
  
  ai.query(inputs).then(outputs => {
    const { image } = outputs;
    img = createImg(image)
    console.log(outputs)
    //img.hide()
    // use the outputs in your project
  });


}

function windowResized() {
    p6_ResizeCanvas()
}
