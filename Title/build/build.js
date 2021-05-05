var gui = new dat.GUI();
var params = {
    Download_Image: function () { return save(); },
};
gui.add(params, "Download_Image");
var typoTitre;
var typoNoms;
var noiseZ = 1;
var colorText = 0;
var time = 0;
function draw() {
    blendMode(BLEND);
    translate(width / 2, height / 2);
    background(0);
    textFont(typoTitre);
    textSize(height / 5);
    textAlign(CENTER, CENTER);
    fill(colorText);
    if (colorText < 190) {
        colorText += 0.8;
    }
    var title = 'Alive';
    text(title, 0, 0);
    textFont(typoNoms);
    textSize(height / 20);
    var names = 'Sirine Bradai & Marie Guillot';
    text(names, 0, 2 * height / 5);
    resetMatrix();
    blendMode(OVERLAY);
    noiseZ += 0.05;
    for (var x = 0; x < height; x += 1) {
        fill(noise(0.1 * x, noiseZ) * 256);
        noStroke();
        rect(0, x, width, 1);
    }
}
function setup() {
    p6_CreateCanvas();
    typoTitre = loadFont('./font/Sarpanch-Bold.ttf');
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