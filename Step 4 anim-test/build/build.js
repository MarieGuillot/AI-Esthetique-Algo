var tmpImage;
var tmpImage2;
function preload() {
    tmpImage = loadImage("../img/color.jpg");
    tmpImage2 = loadImage("../img/download.jpg");
}
var gui = new dat.GUI();
var params = {
    Download_Image: function () { return save(); },
};
gui.add(params, "Download_Image");
var ai = new rw.HostedModel({
    url: "https://first-order-motion-model-2b09c958.hosted-models.runwayml.cloud/v1/",
    token: "HYa/FxB3DqNoz/C8YfTjkg==",
});
var img;
var z = [];
function mouseClicked() {
}
function draw() {
    if (img)
        image(img, 0, 0, width, height);
}
function setup() {
    p6_CreateCanvas();
    ai.info().then(function (info) { return console.log(info); });
    tmpImage.loadPixels();
    var base64Image = tmpImage.canvas.toDataURL();
    var base64Image2 = tmpImage2.canvas.toDataURL();
    var inputs = {
        "driving_image": base64Image2,
        "source_image": base64Image,
        "crop_square": true,
        "use_relative_movement": true
    };
    ai.query(inputs).then(function (outputs) {
        var image = outputs.image;
        img = createImg(image);
        console.log(outputs);
    });
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