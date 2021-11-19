var width = window.innerWidth;
var height = window.innerHeight;
var flipvalue = 1;

// first we need Konva core things: stage and layer
var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height
});

var layer = new Konva.Layer();
stage.add(layer);

var isPaint = false;
var mode = 'brush';
var lastLine;

stage.on('mousedown touchstart', function (e) {
    isPaint = true;
    var width = document.getElementById('container').offsetWidth;
    var pos = stage.getPointerPosition();
    var xPos = flipvalue == 1 ? pos.x : width - pos.x;
    lastLine = new Konva.Line({
        stroke: '#df4b26',
        strokeWidth: 5,
        globalCompositeOperation:
            mode === 'brush' ? 'source-over' : 'destination-out',
        points: [xPos, pos.y],
        draggable: true,
        keepRatio: true,
    });
    layer.add(lastLine);
});

stage.on('mouseup touchend', function () {
    isPaint = false;
});

// and core function - drawing
stage.on('mousemove touchmove', function () {
    if (!isPaint) {
        return;
    }
    var width = document.getElementById('container').offsetWidth;
    const pos = stage.getPointerPosition();
    var xPos = flipvalue == 1 ? pos.x : width - pos.x;
    var newPoints = lastLine.points().concat([xPos, pos.y]);
    lastLine.points(newPoints);
    layer.batchDraw();
});

// var select = document.getElementById('tool');
// select.addEventListener('change', function () {
//     mode = select.value;
// });

function myFunction(event) {
    document.getElementsByClassName('konvajs-content')[0].width = event.currentTarget.outerWidth;
    document.getElementsByClassName('konvajs-content')[0].height = event.currentTarget.outerHeight;
    document.getElementsByTagName('canvas')[0].setAttribute('width', event.currentTarget.outerWidth)
    document.getElementsByTagName('canvas')[0].setAttribute('height', event.currentTarget.outerHeight);
    stage.width = event.currentTarget.outerWidth;
    stage.height = event.currentTarget.outerHeight;
    stage.batchDraw();
}

window.addEventListener("resize", myFunction);

function copy() {
    var json = stage.toJSON();
    document.getElementById('container').remove();
    var stage1 = Konva.Node.create(json, 'container1');
}

function flip() {
    flipvalue = flipvalue * -1;
    document.getElementById('container').style['-webkit-transform'] = 'scale(' + flipvalue + ',1)';
    document.getElementById('container').style['transform'] = 'scale(' + flipvalue + ',1);';
}