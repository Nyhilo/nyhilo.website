from PIL import Image
from io import BytesIO
import base64
import re

def generate_gamestate_map(background, sprite_list):
    # Open the background image
    background_image = convert_base64_to_PIL(background.imageData)

    for sprite in sprite_list:
        # Decode base64-encoded image data
        sprite_image = convert_base64_to_PIL(sprite.imageData).resize((50, 50))

        # Paste the sprite onto the background at the specified coordinates
        background_image.paste(sprite_image, (sprite.x, sprite.y), sprite_image)

    return convert_PIL_to_base64(background_image)


def get_gamestate_map(gamestateModel):
    return convert_base64_to_PIL(gamestateModel.imageData)


def convert_base64_to_PIL(b64_string):
    '''Expects an html encoded base64 string. with "data:image/" etc.'''
    encoded = re.sub(r'data:image/.+;base64,', '', b64_string)
    data = base64.b64decode(encoded)
    image = Image.open(BytesIO(data)).convert('RGBA')

    return image


def convert_PIL_to_base64(image):
    buffer = BytesIO()
    image.save(buffer, format='PNG')
    b64_string = base64.b64encode(buffer.getvalue()).decode("utf-8")
    print(b64_string[0:100])
    return f'data:image/png;base64,{b64_string}'
