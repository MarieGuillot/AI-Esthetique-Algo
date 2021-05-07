var tmpImage;
var textCaption;
function preload() {
    tmpImage = loadImage("../img/color.jpg");
}
var gui = new dat.GUI();
var params = {
    Download_Image: function () { return save(); },
};
gui.add(params, "Download_Image");
var ai = new rw.HostedModel({
    url: "https://im2txt-b2bbb314.hosted-models.runwayml.cloud/v1/",
    token: "bdVAwUUmqCUzAlxw3ZoERQ==",
});
var img;
var z = [];
var noiseZ = 1;
var colorText = 0;
function mouseClicked() {
}
function draw() {
    background(0);
    blendMode(BLEND);
    if (textCaption) {
        fill(colorText);
        if (colorText < 190) {
            colorText += 0.8;
        }
        translate(width / 2, height / 2);
        textAlign(CENTER, CENTER);
        textFont(typoNoms);
        textSize(height / 20);
        text(textCaption, 0, 0);
    }
    resetMatrix();
    blendMode(OVERLAY);
    noiseZ += 0.05;
    for (var x = 0; x < width; x += 1) {
        fill(noise(0.1 * x, noiseZ) * 256);
        noStroke();
        rect(x, 0, 1, height);
    }
}
function setup() {
    p6_CreateCanvas();
    tmpImage.loadPixels();
    var base64Image = tmpImage.canvas.toDataURL('image/jpeg', 1.0);
    var inputs = {
        "image": base64Image
    };
    ai.query(inputs).then(function (outputs) {
        var caption = outputs.caption;
        textCaption = caption;
        console.log(textCaption);
    });
    typoNoms = loadFont('./font/TitilliumWeb-ExtraLight.ttf');
}
function windowResized() {
    p6_ResizeCanvas();
}
var __ASPECT_RATIO = 1;
var __MARGIN_SIZE = 25;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map