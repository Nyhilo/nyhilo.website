/* The first half of this file is modified from generated ChatGPT code.     */
/* I don't feel comfortable licensing this section under the MIT license    */
/* provided for this whole project, so copy at your own risk. Continuation  */
/* of the license is marked by a block comment header down below.           */
/* ~Nyhilo, Jan 2024                                                        */

// Get the canvas element and its 2D context
const canvas = document.getElementById('map');
const ctx = canvas.getContext('2d');

// Resize the canvas to the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Background map image
const map_img = new Image();
map_img.src = mapBaseImg; // Replace with your image path

// Canvas offset for positioning elements relative to the bg image.
// This is set in the .onload callback below
let canvasOffset = {};

// Active sprite data is tracked separately from loaded sprite data
let sprites = [];

// Sprite properties
const [spriteWidth, spriteHeight] = [50, 50];

// Function to draw the map and sprites
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    // Draw the map background
    ctx.drawImage(map_img, canvasOffset.x, canvasOffset.y);//, canvas.width, canvas.height);

    // Draw sprites
    sprites.forEach(sprite => {
        ctx.drawImage(sprite.image, sprite.x, sprite.y, spriteWidth, spriteHeight);
    });
}

// Function to check if a sprite is clicked
function isSpriteClicked(sprite, mouseX, mouseY) {
    return (
        mouseX >= sprite.x &&
        mouseX <= sprite.x + spriteWidth &&
        mouseY >= sprite.y &&
        mouseY <= sprite.y + spriteHeight
    );
}

// Variables to track dragging state
let isDragging = false;
let selectedSprite = null;
let offsetX = 0;
let offsetY = 0;

// Event listeners for mouse down, move, and up
canvas.addEventListener('mousedown', e => {
    const mouseX = e.clientX - canvas.getBoundingClientRect().left;
    const mouseY = e.clientY - canvas.getBoundingClientRect().top;

    sprites.forEach(sprite => {
        if (isSpriteClicked(sprite, mouseX, mouseY)) {
            isDragging = true;
            selectedSprite = sprite;
            offsetX = mouseX - sprite.x;
            offsetY = mouseY - sprite.y;
        }
    });
});

canvas.addEventListener('mousemove', e => {
    if (isDragging) {
        const mouseX = e.clientX - canvas.getBoundingClientRect().left;
        const mouseY = e.clientY - canvas.getBoundingClientRect().top;

        selectedSprite.x = mouseX - offsetX;
        selectedSprite.y = mouseY - offsetY;

        draw(); // Redraw canvas with updated sprite positions
    }
});

canvas.addEventListener('mouseup', () => {
    if (!isDragging)
        return;

    isDragging = false;
    selectedSprite.relative_x = selectedSprite.x - canvasOffset.x;
    selectedSprite.relative_y = selectedSprite.y - canvasOffset.y;

    selectedSprite = null;
});

/***********************************************************************/
/* End ChatGPT generated content, MIT licensed content continues below */
/***********************************************************************/

const passkeyInput = document.getElementById('passkey-input')
const responseSpan = document.getElementById('response')

function saveSprites() {
    const spriteData = sprites.map((sprite) => {
        return {
            user: sprite.user,
            x: sprite.relative_x,
            y: sprite.relative_y
        }
    })

    // AJAX request using vanilla JavaScript
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'savesprites/', true); // Replace '/your-saveSprite-url/' with your actual URL
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
    xhr.setRequestHeader('passkey', passkeyInput.value);
    xhr.onload = function() {
        if (xhr.status >= 500)
            showResponse("An error occurred. See console for details.", false);
        else
            showResponse(xhr.responseText, xhr.status === 200);
    };

    // Send the request
    xhr.send(JSON.stringify(spriteData));
}


window.onresize = (e) => {
    updateOffsets();
    draw();
}

// Initial draw call to render the map and sprites
map_img.onload = () => {
    sprites = [];
    spritesBase.forEach((sprite) => {
        sprites.push({
            user: sprite.user,
            relative_x: sprite.x, // The unoffset position relative to the background
            relative_y: sprite.y,
            image: sprite.image
        });
    });

    updateOffsets();
    draw();
};

function updateOffsets() {
    // Resize the canvas to the window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Save offsets for positioning elements
    canvasOffset = {
        x: (canvas.width - map_img.width) / 2,
        y: (canvas.height - map_img.height) / 2
    };

    // Update sprite position offsets
    sprites.forEach(sprite => {
        sprite.x = sprite.relative_x + canvasOffset.x;
        sprite.y = sprite.relative_y + canvasOffset.y;
    });
}

// https://stackoverflow.com/a/56341485
async function loadBackground() {
    let img;

    await new Promise(resolve => {
        img = new Image();
        img.onload = resolve;
        img.src = mapBaseImg;
    });

    return img;
}

function showResponse(response, isSuccess) {
    if (isSuccess)
        responseSpan.style.color = 'blue';
    else
        responseSpan.style.color = 'red';

    responseSpan.textContent = response;

    responseSpan.style.display = 'block';

    setTimeout(function() {
        responseSpan.classList.add('fade-out');
    }, 1500);

    setTimeout(function() {
        responseSpan.style.display = 'none'; // Hides the element after the fade-out effect
        responseSpan.classList.remove('fade-out')
    }, 2500);
}
