let tmpImage: p5.Image

function preload() {
    tmpImage = loadImage("../img/derniereFrameVideo.png")
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
  url: "https://yolact-2cb2a545.hosted-models.runwayml.cloud/v1/",
  token: "qzHJlhrLi6FRjcHFdUmPTQ==",
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
    const base64Image = tmpImage.canvas.toDataURL('image/jpeg', 1.0)
    

    const inputs = {
      "input_image": base64Image
    };
  
  ai.query(inputs).then(outputs => {
    console.log(outputs)
    const { output_image } = outputs;
    img = createImg(output_image)
    
    img.hide()
    // use the outputs in your project
  });


}

function windowResized() {
    p6_ResizeCanvas()
}
