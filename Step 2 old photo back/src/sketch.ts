let tmpImage: p5.Image

function preload() {
    tmpImage = loadImage("../img/start.png")
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
  url: "https://bringing-old-photos-back-to-life-81a5e281.hosted-models.runwayml.cloud/v1/",
  token: "f/HYs2WXtack6sOb/RN/oA==",
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
}

// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()

    ai.info().then(info => console.log(info));

    tmpImage.loadPixels()
    const base64Image = tmpImage.canvas.toDataURL()
    

  const inputs = {
      "source_imgs": base64Image,
      "scratch_remove": true,
  };
  
  ai.query(inputs).then(outputs => {
    const { image } = outputs;
    img = createImg(image)
    img.hide()
    // use the outputs in your project
  });


}

function windowResized() {
    p6_ResizeCanvas()
}