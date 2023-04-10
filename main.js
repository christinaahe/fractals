// TRI
function getYoffset(frameheight, triS) {
    let triHeight = ((Math.sqrt(3))/2) * triS
    return ((frameheight - triHeight)/2)
}

const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500;
const MARGINS = {left: 50, right: 50, top: getYoffset(FRAME_HEIGHT, 400), bottom: getYoffset(FRAME_HEIGHT, 400)};
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;
const FRAME1 = d3.select("#fractal1")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame");

function triArea(s) {
    return (Math.sqrt(3) / 4) * (s**2);
}

// adds triangle to frame
function addTri(tri, frame, color) {
    let shape = d3.symbol()
                    .type(d3.symbolTriangle)
                    .size(triArea(tri['s']));
    if (color) {
        triCol = color;
    }
    else {
        triCol = tri['color']
    }
    let triId = 'tri' + triCount.toString()
    triCount++
    frame.append('path')
        .attr("d", shape)
        .attr("id", triId)
        .attr("stroke", triCol)
        .attr('fill', triCol)
        .attr('transform', (d) => {return "translate(" + tri['x'] + "," + tri['y'] + ")";})
}

function addTriLayer() {
    let newTriangles = []
    for (let i = 0; i < triangles.length; i++) {
        let tri = triangles[i][0]
        let margins = triangles[i][1]

        let s = tri['s']
        let smallS = s/2
        // top
        let tri1 = {'color': 'green', 's': smallS, 'x': (margins.x + smallS), 'y': (margins.y + (smallS / Math.sqrt(3)))}
        let tri1Offset = {x: (margins.x + (smallS / 2)), y: margins.y }

        // bottom left
        let tri2 = {'color': 'green', 's': smallS, 'x': (margins.x + (smallS / 2)), 'y': (margins.y + ((smallS * Math.sqrt(3)) / 2) + (smallS / Math.sqrt(3)))}
        let tri2Offset = {x: margins.x, y: (margins.y + (Math.sqrt(3) * (smallS/2)))}
        
        // bottom right
        let tri3 = {'color': 'green', 's': smallS, 'x': (margins.x + (3 * (smallS / 2))), 'y': (margins.y + ((smallS * Math.sqrt(3)) / 2) + (smallS / Math.sqrt(3)))}
        let tri3Offset = {x: (margins.x + smallS), y: (margins.y + (Math.sqrt(3) * (smallS/2)))}


        addTri(tri, FRAME1, 'white')
        addTri(tri1, FRAME1)
        addTri(tri2, FRAME1)
        addTri(tri3, FRAME1)


        newTriangles.push([tri1, tri1Offset], [tri2, tri2Offset], [tri3, tri3Offset])
      }
    triLayers ++
    triangles = newTriangles

}

function resetTri() {
    for (let i = 0; i < triCount; i++) {
        id = '#tri' + i.toString()
        FRAME1.select(id).remove()
    }
    triCount = 0
    triLayers = 1
    addTri(triangle, FRAME1)
    triangles = [[triangle, triangleOffset]]
}

let triangle = {'color': 'green', 's': VIS_WIDTH, 'x': (FRAME_WIDTH / 2), 'y': MARGINS.top + (VIS_WIDTH/Math.sqrt(3))}
let triangleOffset = {x: MARGINS.left, y: MARGINS.top}
let triCount = 0
let triLayers = 1

addTri(triangle, FRAME1)
let triangles = [[triangle, triangleOffset]]

function clickTriDim() {
    let dimension = Math.log(3) / Math.log(2)
    let newText = "N = 3<br>r = 1/2<br>Dimension = " + (Math.round(dimension*1000)/1000).toString();
    let triTextDiv = document.getElementById("triTextDiv");
    triTextDiv.innerHTML = newText
}

function resetTriDim() {
    let dimension = Math.log(triLayers) / Math.log(2)
    let newText = "N = " + triLayers.toString();
    let triTextDiv = document.getElementById("triTextDiv");
    triTextDiv.innerHTML = newText
}
document.getElementById('addTriLayer').addEventListener('click', clickTriDim);
document.getElementById('resetTri').addEventListener('click', resetTriDim);

// HEX

const FRAME2 = d3.select("#fractal2")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame");

function hexArea(s) {
    return (3 * Math.sqrt(3) / 2) * (s**2);
}

function addHex(hex, frame, color, rotate) {
    let shape = d3.symbol()
                    .size(hexArea(hex['s']))
                    .type(hexagonSymbol);
    if (color) {
        hexCol = color;
    }
    else {
        hexCol = hex['color'];
    }

    if (rotate) {
        hexTrans = "translate(" + hex['x'] + "," + hex['y'] + ") rotate(" + rotate + ")";
    }
    else {
        hexTrans = "translate(" + hex['x'] + "," + hex['y'] + ")";
    }
    let hexId = 'hex' + hexCount.toString()
    hexCount++
    frame.append('path')
        .attr("d", shape)
        .attr("id", hexId)
        .attr('fill', hexCol)
        .attr('transform', hexTrans)
}

function addHexLayer() {
    let newHexagons = []
    for (let i = 0; i < hexagons.length; i++) {
        let hex = hexagons[i][0]
        let margins = hexagons[i][1]

        let s = hex['s']
        let smallS = s/3
        // hexagons
        // top left
        let hex1 = {'color': 'pink', 's': smallS, 'x': (margins.x + (2 * smallS)), 'y': (margins.y + ((Math.sqrt(3) * smallS)/2))}
        let hex1Offset = {x: (margins.x + smallS), y: margins.y}

        // top right
        let hex2 = {'color': 'pink', 's': smallS, 'x': (margins.x + (4 * smallS)), 'y': (margins.y + ((Math.sqrt(3) * smallS)/2))}
        let hex2Offset = {x: (margins.x + (3 * smallS)), y: margins.y}
        
        // left
        let hex3 = {'color': 'pink', 's': smallS, 'x': (margins.x + smallS), 'y': hex['y']}
        let hex3Offset = {x: margins.x, y: (margins.y + (Math.sqrt(3) * smallS))}

        // right
        let hex4 = {'color': 'pink', 's': smallS, 'x': (margins.x + (5 * smallS)), 'y': hex['y']}
        let hex4Offset = {x: (margins.x + (4 * smallS)), y: (margins.y + (Math.sqrt(3) * smallS))}

        // bottom left
        let hex5 = {'color': 'pink', 's': smallS, 'x': (margins.x + (2 * smallS)), 'y': (hex['y'] + (Math.sqrt(3) * smallS))}
        let hex5Offset = {x: (margins.x + smallS), y: (margins.y + (2 * Math.sqrt(3) * smallS))}

        // bottom right
        let hex6 = {'color': 'pink', 's': smallS, 'x': (margins.x + (4 * smallS)), 'y': (hex['y'] + (Math.sqrt(3) * smallS))}
        let hex6Offset = {x: (margins.x + (3 * smallS)), y: (margins.y + (2 * Math.sqrt(3) * smallS))}

        // center
        let hex7 = {'color': 'pink', 's': smallS, 'x': hex['x'], 'y': hex['y']}
        let hex7Offset = {x: (margins.x + (2 * smallS)), y: (margins.y + (Math.sqrt(3) * smallS))}




        addHex(hex, FRAME2, 'white')
        addHex(hex1, FRAME2)
        addHex(hex2, FRAME2)
        addHex(hex3, FRAME2)
        addHex(hex4, FRAME2)
        addHex(hex5, FRAME2)
        addHex(hex6, FRAME2)
        // addHex(hex7, FRAME2)
        // , [hex7, hex7Offset]
        newHexagons.push([hex1, hex1Offset], [hex2, hex2Offset], [hex3, hex3Offset], [hex4, hex4Offset], [hex5, hex5Offset], [hex6, hex6Offset])
      }
    hexLayers ++
    hexagons = newHexagons

}

function resetHex() {
    for (let i = 0; i < hexCount; i++) {
        id = '#hex' + i.toString()
        FRAME2.select(id).remove()
    }
    hexCount = 0
    hexLayers = 1
    addHex(hexagon, FRAME2)
    hexagons = [[hexagon, hexagonOffset]]
}

let hexCount = 0
let hexagon = {'color': 'pink', 'x': (FRAME_WIDTH/2), 'y': (FRAME_HEIGHT/2) , 's': VIS_WIDTH/2}
let hexagonOffset = {x: MARGINS.left, y: MARGINS.top}
addHex(hexagon, FRAME2)
let hexagons = [[hexagon, hexagonOffset]]
let hexLayers = 1

function clickHexDim() {
    let dimension = Math.log(6) / Math.log(3)
    let newText = "N = 6<br>r = 1/2<br>Dimension = " + (Math.round(dimension*1000)/1000).toString();
    let hexTextDiv = document.getElementById("hexTextDiv");
    hexTextDiv.innerHTML = newText
}

function resetHexDim() {
    let newText = "N = " + hexLayers.toString();
    let hexTextDiv = document.getElementById("hexTextDiv");
    hexTextDiv.innerHTML = newText
}
document.getElementById('addHexLayer').addEventListener('click', clickHexDim);
document.getElementById('resetHex').addEventListener('click', resetHexDim);


// SQUARE

const FRAME3 = d3.select("#fractal3")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame");

function sqArea(s) {
    return (s**2);
}

function addSq(sq, frame, color, rotate) {
    let shape = d3.symbol()
                    .size(sqArea(sq['s']))
                    .type(d3.symbolSquare);
    if (color) {
        sqCol = color;
    }
    else {
        sqCol = sq['color'];
    }

    if (rotate) {
        sqTrans = "translate(" + sq['x'] + "," + sq['y'] + ") rotate(" + rotate + ")";
    }
    else {
        sqTrans = "translate(" + sq['x'] + "," + sq['y'] + ")";
    }
    let sqId = 'sq' + sqCount.toString()
    sqCount++
    frame.append('path')
        .attr("d", shape)
        .attr("id", sqId)
        .attr("stroke", sqCol)
        .attr('fill', sqCol)
        .attr('transform', sqTrans)
}

function addSqLayer() {
    let sq = squares[0]
    let margins = squares[1]

    let s = sq['s']
    let smallS = Math.sqrt(2) * s/2
    // squares
    // top left
    let sq1 = {'color': 'indigo', 's': smallS, 'x': sq['x'], 'y': sq['y']}
    let sq1Offset = {x: (margins.x + smallS), y: margins.y}
    let col = sq1['color']
    if (sqLayers % 2 == 1) {
        col = 'white'
    }

    addSq(sq1, FRAME3, col, 45*sqLayers)

    squares = [sq1, sq1Offset]
    sqLayers ++

}

function resetSq() {
    for (let i = 0; i < sqCount; i++) {
        id = '#sq' + i.toString()
        FRAME3.select(id).remove()
    }
    sqCount = 0
    sqLayers = 1
    addSq(square, FRAME3)
    squares = [square, squareOffset]
}

let sqCount = 0
let square = {'color': 'indigo', 'x': (FRAME_WIDTH/2), 'y': (FRAME_HEIGHT/2) , 's': VIS_WIDTH}
let squareOffset = {x: MARGINS.left, y: MARGINS.top}
addSq(square, FRAME3)
let squares = [square, squareOffset]
let sqLayers = 1

function clickSqDim() {
    let dimension = Math.log(1) / Math.log((2/Math.sqrt(2)))
    let newText = "N = 1<br>r = &#8730;2 / 2<br>Dimension = " + dimension.toString();
    let sqTextDiv = document.getElementById("sqTextDiv");
    sqTextDiv.innerHTML = newText
}

function resetSqDim() {
    let newText = "N = " + sqLayers.toString();
    let sqTextDiv = document.getElementById("sqTextDiv");
    sqTextDiv.innerHTML = newText
}
document.getElementById('addSqLayer').addEventListener('click', clickSqDim);
document.getElementById('resetSq').addEventListener('click', resetSqDim);


const FRAME4 = d3.select("#fractal4")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame");


function addSq2(sq, frame, color, rotate) {
    let shape = d3.symbol()
                    .size(sqArea(sq['s']))
                    .type(d3.symbolSquare);
    if (color) {
        sqCol = color;
    }
    else {
        sqCol = sq['color'];
    }

    if (rotate) {
        sqTrans = "translate(" + sq['x'] + "," + sq['y'] + ") rotate(" + rotate + ")";
    }
    else {
        sqTrans = "translate(" + sq['x'] + "," + sq['y'] + ")";
    }
    let sqId2 = 'sq2' + sqCount2.toString()
    sqCount2++
    frame.append('path')
        .attr("d", shape)
        .attr("id", sqId2)
        .attr("stroke", sqCol)
        .attr('fill', sqCol)
        .attr('transform', sqTrans)
}
function addSqLayer1() {
    let sq = squares2[0]
    let margins = squares2[1]

    let s = sq['s']
    let smallS = Math.sqrt(2) * s/2
    // squares
    // top left
    let sq1 = {'color': 'indigo', 's': smallS, 'x': sq['x'], 'y': sq['y']}
    let sq1Offset = {x: (margins.x + smallS), y: margins.y}
    let col = sq1['color']
    if (sqLayers2 % 2 == 1) {
        col = 'white'
    }

    addSq(sq1, FRAME4, col, 45*sqLayers)

    squares2 = [sq1, sq1Offset]
    sqLayers2 ++

}
function addSqLayer2() {
    for (let i = 0; i < 2; i++) {
        let sq = squares2[0]
        let margins = squares2[1]

        let s = sq['s']
        let smallS = Math.sqrt(2) * s/2
        // squares
        // top left
        let sq1 = {'color': 'indigo', 's': smallS, 'x': sq['x'], 'y': sq['y']}
        let sq1Offset = {x: (margins.x + smallS), y: margins.y}
        let col = sq1['color']
        if (sqLayers2 % 2 == 1) {
            col = 'white'
        }

        addSq2(sq1, FRAME4, col, 45*sqLayers2)

        squares2 = [sq1, sq1Offset]
        sqLayers2 ++
    }

}

function resetSq2() {
    for (let i = 0; i < sqCount2; i++) {
        id = '#sq2' + i.toString()
        FRAME4.select(id).remove()
    }
    sqCount2 = 0
    sqLayers2 = 1
    squares2 = [square2, squareOffset2]
    addSq2(square2, FRAME4)
    addSqLayer1()
}

let sqCount2 = 0
let square2 = {'color': 'indigo', 'x': (FRAME_WIDTH/2), 'y': (FRAME_HEIGHT/2) , 's': VIS_WIDTH}
let squareOffset2 = {x: MARGINS.left, y: MARGINS.top}
let squares2 = [square, squareOffset]
let sqLayers2 = 1
addSq2(square2, FRAME4)
addSqLayer1()


function clickSqDim2() {
    let dimension = Math.log(1) / Math.log(2)
    let newText = "N = 1<br>r = 1/2<br>Dimension = " + dimension.toString();
    let sq2TextDiv = document.getElementById("sq2TextDiv");
    sq2TextDiv.innerHTML = newText
}

function resetSqDim2() {
    let newText = "N = 1";
    let sq2TextDiv = document.getElementById("sq2TextDiv");
    sq2TextDiv.innerHTML = newText
}
document.getElementById('addSqLayer2').addEventListener('click', clickSqDim2);
document.getElementById('resetSq2').addEventListener('click', resetSqDim2);
