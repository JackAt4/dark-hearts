@namespace
class SpriteKind:
    HUD = SpriteKind.create()
    MiniMenu = SpriteKind.create()
    StatusBar = SpriteKind.create()
    Ball = SpriteKind.create()
    Booth = SpriteKind.create()
    Mouse = SpriteKind.create()
    Crosshair = SpriteKind.create()
    Moon = SpriteKind.create()

def on_up_pressed():
    move(1, 1)
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def positionIf(CheckCol: number, CheckRow: number, CheckAngle: number):
    global location
    location = mySprite.tilemap_location()
    if location.column == CheckCol and location.row == CheckRow:
        Render.set_view_angle_in_degree(CheckAngle)
        return True
    else:
        return False

def on_a_pressed():
    moon_phase()
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def talkStart(person: Image, text: str, speed: number):
    UI.set_image(assets.image("""
        UIBlank
    """))
    Interaction.set_image(person)
    Interaction.set_position(scene.screen_width() / 2, scene.screen_height() / 2)
    Interaction.change_scale(1, ScaleAnchor.MIDDLE)
    animation.run_image_animation(UI, assets.animation("""
        ChatStart
    """), 50, False)
    index = 0
    while index <= len(text):
        index += 1

def on_left_pressed():
    global angle
    for index2 in range(45):
        angle += -2
        Render.set_view_angle_in_degree(angle)
        pause(1)
    if angle == -90:
        angle = 270
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def WallChecks():
    global location
    location = mySprite.tilemap_location()
    if tiles.tile_at_location_is_wall(tiles.get_tile_location(location.column + 1, location.row)) and angle == 0:
        return False
    elif tiles.tile_at_location_is_wall(tiles.get_tile_location(location.column, location.row + 1)) and angle == 90:
        return False
    elif tiles.tile_at_location_is_wall(tiles.get_tile_location(location.column - 1, location.row)) and angle == 180:
        return False
    elif tiles.tile_at_location_is_wall(tiles.get_tile_location(location.column, location.row - 1)) and angle == 270:
        return False
    else:
        return True

def on_right_pressed():
    global angle
    for index3 in range(45):
        angle += 2
        Render.set_view_angle_in_degree(angle)
        pause(1)
    if angle == 360:
        angle = 0
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def positionChecks():
    if positionIf(6, 9, 0):
        talkStart(assets.image("""
            PersonTest
        """), "Hey there!", 2)
def moon_phase():
    global moonPhase
    moonPhase += 1
    if moonPhase == 17:
        moonPhase = 0
    UI.set_image(UIAnimation[moonPhase])

def on_down_pressed():
    move(-1, 1)
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def on_menu_pressed():
    Render.toggle_view_mode()
controller.menu.on_event(ControllerButtonEvent.PRESSED, on_menu_pressed)

def talkEnd():
    scene.set_background_image(assets.image("""
        MyBackground
    """))
    move(-1, 1)
    sprites.destroy(Interaction)
    UI.set_image(UIAnimation[moonPhase])
def move(speed2: number, delay: number):
    global angle, steps
    if speed2 < 0:
        angle = angle + 180
        if angle >= 360:
            angle = angle - 360
    if angle == 0:
        if WallChecks():
            for index4 in range(16 / abs(speed2)):
                mySprite.x += abs(speed2)
                pause(delay)
            steps += 1
    elif angle == 90:
        if WallChecks():
            for index5 in range(16 / abs(speed2)):
                mySprite.y += abs(speed2)
                pause(delay)
            steps += 1
    elif angle == 180:
        if WallChecks():
            for index6 in range(16 / abs(speed2)):
                mySprite.x += abs(speed2) * -1
                pause(delay)
            steps += 1
    elif angle == 270:
        if WallChecks():
            for index7 in range(16 / abs(speed2)):
                mySprite.y += abs(speed2) * -1
                pause(delay)
            steps += 1
    if speed2 < 0:
        angle = angle - 180
        if angle >= 360:
            angle = angle - 360
        elif angle < 0:
            angle = angle + 360
    if steps == 20:
        steps = 0
        moon_phase()
    positionChecks()
steps = 0
location: tiles.Location = None
moonPhase = 0
UIAnimation: List[Image] = []
UI: Sprite = None
Interaction: Sprite = None
angle = 0
mySprite: Sprite = None
mySprite = Render.get_render_sprite_variable()
Render.move_with_controller(0, 0, 0)
scene.set_background_image(assets.image("""
    MyBackground
"""))
tiles.set_current_tilemap(tilemap("""
    level1
"""))
tiles.place_on_tile(mySprite, tiles.get_tile_location(2, 2))
angle = 0
Render.set_view_angle_in_degree(angle)
Interaction = sprites.create(assets.image("""
    UIBlank
"""), SpriteKind.HUD)
UI = sprites.create(assets.image("""
    UIBlank
"""), SpriteKind.HUD)
UIAnimation = assets.animation("""
    Moon_Phases
""")
UI.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
Interaction.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
moonPhase = 0
UI.set_image(UIAnimation[0])
Interaction.z = 4
UI.z = 5