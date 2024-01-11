from PIL import Image
from io import BytesIO
import base64
import re
from datetime import datetime
from pathlib import Path
from nyhilosite.settings import C15_GAMESTATE_IMAGE, C15_ARCHIVE_DIR


def overlay_sprites(background_path, sprite_list):
    # Open the background image
    background_image = Image.open(background_path).convert('RGBA')

    for sprite in sprite_list:
        # Decode base64-encoded image data
        encoded = re.sub(r'data:image/.+;base64,', '', sprite.image)
        image_data = base64.b64decode(encoded)

        # Open the sprite image using PIL
        sprite_image = Image.open(
            BytesIO(image_data)).convert('RGBA').resize((50, 50))

        # Paste the sprite onto the background at the specified coordinates
        background_image.paste(
            sprite_image, (sprite.x, sprite.y), sprite_image)

    background_image.save(C15_GAMESTATE_IMAGE)

    Path(C15_ARCHIVE_DIR).mkdir(exist_ok=True)
    timestamp = datetime.utcnow().strftime('%Y-%m-%d_%H%M%S')
    background_image.save(
        f'{C15_ARCHIVE_DIR}gamestate_{timestamp}.png')
    return background_image
