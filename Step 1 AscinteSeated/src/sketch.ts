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

const ai = new rw.HostedModel({
  url: "https://ascinte-seated-38632546.hosted-models.runwayml.cloud/v1/",
  token: "km9FKgA9Nx7oqaXvrIwhqQ==",
});
  
  let img: p5.Element

  let z = []

  let troncat = 37
   
  /*function mouseClicked () {

    troncat -= 0.1

    const inputs = {
        "z": z,
        "truncation": troncat
      };

    ai.query(inputs).then(outputs => {
        const { image } = outputs;
        img = createImg(image)
        img.hide()
        // use the outputs in your project
      });
  }*/

// -------------------
//       Drawing
// -------------------

function draw() {
    if (img) {
      image(img, 0, 0, width, height);
      }
}

// -------------------
//    Initialization
// -------------------
let frameNB = 0
const NB_FRAMES_TO_EXPORT = 120

function make_request() {
    const inputs = {
      "z": z,
      "truncation": troncat
    };
    ai.query(inputs).then(outputs => {
        const { image } = outputs
        img = createImg(image)
        img.hide()
        
        if (frameNB<36) {
          troncat -= 1
        } else {
          troncat -= 0.99/84
        }
        p5.prototype.downloadFile(image, frameNB.toString(), "png")
        frameNB++
        if (frameNB < NB_FRAMES_TO_EXPORT) {
          make_request()
        }
    });
}

function setup() {
    p6_CreateCanvas()

    for (let i = 0; i<512; i++) {
        z[i] = Math.random()*(-i)*noise(i)*i
    }

    //// You can use the info() method to see what type of input object the model expects
    // model.info().then(info => console.log(info));
    const inputs = {
    "z": z,
    "truncation": troncat
  };
  ai.query(inputs).then(outputs => {
    const { image } = outputs;
    img = createImg(image)
    img.hide()
    // use the outputs in your project
  });

  ai.info().then(info => console.log(info));
  console.log(z);

  //make_request()
}

function windowResized() {
    p6_ResizeCanvas()
}