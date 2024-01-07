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

// Sprite properties
const [spriteWidth, spriteHeight] = [100, 100];

// Function to draw the map and sprites
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    // Draw the map background
    const w = (canvas.width - map_img.width) / 2;
    const h = (canvas.height - map_img.height) / 2;
    ctx.drawImage(map_img, w, h);//, canvas.width, canvas.height);

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
    isDragging = false;
    selectedSprite = null;
});

// Initial draw call to render the map and sprites
map_img.onload = () => {
    draw();
};

/***********************************************************************/
/* End ChatGPT generated content, MIT licensed content continues below */
/***********************************************************************/

