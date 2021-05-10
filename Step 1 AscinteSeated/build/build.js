var gui = new dat.GUI();
var params = {
    Ellipse_Size: 30,
    Download_Image: function () { return save(); },
};
gui.add(params, "Ellipse_Size", 0, 100, 1);
gui.add(params, "Download_Image");
var ai = new rw.HostedModel({
    url: "https://ascinte-seated-38632546.hosted-models.runwayml.cloud/v1/",
    token: "km9FKgA9Nx7oqaXvrIwhqQ==",
});
var img;
var z = [];
var troncat = 37;
function draw() {
    if (img) {
        image(img, 0, 0, width, height);
    }
}
var frameNB = 0;
var NB_FRAMES_TO_EXPORT = 120;
function make_request() {
    var inputs = {
        "z": z,
        "truncation": troncat
    };
    ai.query(inputs).then(function (outputs) {
        var image = outputs.image;
        img = createImg(image);
        img.hide();
        if (frameNB < 36) {
            troncat -= 1;
        }
        else {
            troncat -= 0.99 / 84;
        }
        p5.prototype.downloadFile(image, frameNB.toString(), "png");
        frameNB++;
        if (frameNB < NB_FRAMES_TO_EXPORT) {
            make_request();
        }
    });
}
function setup() {
    p6_CreateCanvas();
    for (var i = 0; i < 512; i++) {
        z[i] = Math.random() * (-i) * noise(i) * i;
    }
    var inputs = {
        "z": z,
        "truncation": troncat
    };
    ai.query(inputs).then(function (outputs) {
        var image = outputs.image;
        img = createImg(image);
        img.hide();
    });
    ai.info().then(function (info) { return console.log(info); });
    console.log(z);
}
function windowResized() {
    p6_ResizeCanvas();
}
var __ASPECT_RATIO = 0.75;
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