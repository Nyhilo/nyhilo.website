const data = {};

// Much of this was copied with permission from github.com/CodeTriangle/cycle-12-map
// Thank you Trungle
window.onload = (event) => {
    data.mapElement = document.getElementById('map');
    data.imgsElement = document.getElementById("images");
    data.c = data.mapElement.getContext("2d");

    // Set full window canvas size
    resizeCanvas();

    window.onresize = (e) => {
        resizeCanvas();
    }
}

// resize the canvas to the screen size
function resizeCanvas() {
    // you have to set the `width` and `height` html attributes to resize a canvas.
    const newWidth = data.mapElement.width = window.innerWidth;
    const newHeight = data.mapElement.height = window.innerHeight;

    data.mapWidth = newWidth;
    data.mapHeight = newHeight;

    drawCanvas();
}

// draw on the canvas
function drawCanvas() {
    // fill background
    data.c.fillStyle = "#333";
    data.c.fillRect(0, 0, data.mapWidth, data.mapHeight);

    // draw the map
    // create the html element
    const tile = document.createElement("img");
    tile.setAttribute('src', mapBaseImg);
    data.imgsElement.appendChild(tile);



    tile.onload = (e) => {
        //  debugger;
        const w = (data.mapWidth - tile.naturalWidth) / 2;
        const h = (data.mapHeight - tile.naturalHeight) / 2;
        data.c.drawImage(
            tile,
            w, h
        );
    }

    // // for each location, draw it at the right place
    // // notably, y had to be inverted because canvas' y counts from the top
    // // corner and i wanted normal quandrants.
    // for (const loc of Object.values(data.locations)) {
    //     let [x, y] = mapToScreenCoords(loc.x, loc.y);
    //     data.c.drawImage(
    //         loc.element,
    //         x,
    //         y,
    //         data.tileWidth,
    //         data.tileHeight
    //     );
    // }

    // if (data.hasOwnProperty("previewedCoords")) {
    //     const [px, py] = data.previewedCoords;
    //     drawHover(px, py, screenCoords=false, style="#6C9");
    //     drawLineToPreview();
    // }
}
