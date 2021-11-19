var svgElement = null;
var draw = null;
var scaleX = 1;
var zoomValue = 0;
function xmlToString(xmlData) {

    var xmlString;
    //IE
    if (window.ActiveXObject) {
        xmlString = xmlData.xml;
    }
    // code for Mozilla, Firefox, Opera, etc.
    else {
        xmlString = (new XMLSerializer()).serializeToString(xmlData);
    }
    return xmlString;
}

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var dynamicDiv = document.createElement('div');
            dynamicDiv.innerHTML = this.responseText;
            var svg1 = dynamicDiv.querySelector('svg');
            var i = 2;
            var stageId = '_x3' + i + '_';
            var floorElement = document.getElementById(i);
            floorElement.innerHTML = "<svg id='svg-" + i + "'></svg>";
            var svgElement = document.getElementById('svg-' + i);
            cloneAttributes(svgElement, svg1);

            dynamicDiv.querySelectorAll('g[id*=_x3]').forEach((element, j) => {
                if (element.id != undefined && element.id.indexOf(stageId) > -1) {
                    var elementId = element.id.substr(0, 5);
                    if (elementId == stageId) {
                        svgElement.append(element);
                    }
                }
            });
            dynamicDiv.remove();
        }
    };
    xhttp.open("GET", "Plan.xml", true);
    xhttp.send();
}


function cloneAttributes(element, sourceNode) {
    let attr;
    let attributes = Array.prototype.slice.call(sourceNode.attributes);
    while (attr = attributes.pop()) {
        element.setAttribute(attr.nodeName, attr.nodeValue);
    }
}
loadDoc();

