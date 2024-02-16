namespace SpriteKind {
    export const HUD = SpriteKind.create()
    export const Moon = SpriteKind.create()
}
function tilemapLoad (tilemap2: number, entrance: number) {
    if (tilemap2 == 1) {
        if (entrance == 1) {
            inCutscene = true
            UI.setImage(assets.image`UIBlank`)
            music.stopAllSounds()
            color.startFade(color.originalPalette, color.Black, 500)
            color.pauseUntilFadeDone()
            scene.setBackgroundImage(assets.image`Background_L`)
            tiles.setCurrentTilemap(tilemap`Home`)
            tiles.placeOnTile(mySprite, tiles.getTileLocation(2, 2))
            angle = 90
            Render.setViewAngleInDegree(90)
            decoration1.setImage(assets.image`Computer`)
            decoration2.setImage(assets.image`Bed`)
            tiles.placeOnTile(decoration1, tiles.getTileLocation(3, 3))
            tiles.placeOnTile(decoration2, tiles.getTileLocation(3, 2))
            decoration1.setScale(0.3, ScaleAnchor.Middle)
            decoration2.setScale(0.5, ScaleAnchor.Middle)
            animation.runImageAnimation(
            UI,
            assets.animation`WakingUp`,
            100,
            false
            )
            color.startFade(color.Black, color.originalPalette, 500)
            music.play(music.createSong(assets.song`Dawn`), music.PlaybackMode.InBackground)
            pause(5000)
            music.stopAllSounds()
            music.play(music.createSoundEffect(
            WaveShape.Noise,
            120,
            120,
            255,
            255,
            6500,
            SoundExpressionEffect.None,
            InterpolationCurve.Linear
            ), music.PlaybackMode.UntilDone)
            pause(3000)
            color.startFade(color.originalPalette, color.Black, 500)
            color.pauseUntilFadeDone()
            animation.runImageAnimation(
            UI,
            assets.animation`Blank`,
            500,
            false
            )
            tilemap_num = 1
            inCutscene = false
            music.stopAllSounds()
            color.startFade(color.Black, color.originalPalette, 500)
        }
    } else if (tilemap2 == 2) {
        if (entrance == 1) {
            inCutscene = true
            color.startFade(color.originalPalette, color.Black, 500)
            color.pauseUntilFadeDone()
            scene.setBackgroundImage(assets.image`Background_M`)
            tiles.setCurrentTilemap(tilemap`SchoolF1`)
            tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 7))
            decoration1.setImage(assets.image`SchoolSigns`)
            decoration2.setImage(assets.image`SchoolSigns`)
            tiles.placeOnTile(decoration1, tiles.getTileLocation(5, 1))
            tiles.placeOnTile(decoration2, tiles.getTileLocation(5, 12))
            tilemap_num = 2
            inCutscene = false
            color.startFade(color.Black, color.originalPalette, 500)
        }
    }
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    move(1, 1)
})
function positionIf (CheckCol: number, CheckRow: number, CheckAngle: number, Check: boolean) {
    location = mySprite.tilemapLocation()
    if (!(Check)) {
        if (location.column == CheckCol && location.row == CheckRow) {
            Render.setViewAngleInDegree(CheckAngle)
            return true
        } else {
            return false
        }
    } else {
        if (location.column == CheckCol && location.row == CheckRow && angle == CheckAngle) {
            return true
        } else {
            return false
        }
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(inCutscene) && controller.A.isPressed()) {
        positionChecks(true)
    }
})
function talkStart (person: Image, text: string, speed: number, portrait: Image) {
    inCutscene = true
    UI.setImage(assets.image`UIBlank`)
    Interaction.setImage(person)
    Interaction.setPosition(scene.screenWidth() / 2, scene.screenHeight() / 2)
    Interaction.changeScale(1, ScaleAnchor.Middle)
    talkSprite = sprites.create(portrait, SpriteKind.HUD)
    talkSprite.setFlag(SpriteFlag.RelativeToCamera, true)
    talkSprite.setPosition(130, 63)
    animation.runImageAnimation(
    UI,
    assets.animation`ChatStart`,
    50,
    false
    )
    chatText = ""
    textSprite = textsprite.create("")
    textSprite.setFlag(SpriteFlag.RelativeToCamera, true)
    textSprite.setPosition(6, 88)
    textSprite.setCharsPerLine(25)
    pause(200)
    renderText(text, speed)
    pauseUntil(() => !(controller.A.isPressed()))
    pauseUntil(() => controller.A.isPressed())
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(inCutscene)) {
        for (let index = 0; index < 45; index++) {
            angle += -2
            Render.setViewAngleInDegree(angle)
            pause(1)
        }
        if (angle == -90) {
            angle = 270
        }
    }
})
function talk (person: Image, text: string, speed: number, portrait: Image) {
    chatText = ""
    textSprite.setText("")
    talkSprite.setImage(portrait)
    renderText(text, speed)
    pauseUntil(() => !(controller.A.isPressed()))
    pauseUntil(() => controller.A.isPressed())
}
function WallChecks () {
    location = mySprite.tilemapLocation()
    if (tiles.tileAtLocationIsWall(tiles.getTileLocation(location.column + 1, location.row)) && angle == 0) {
        return false
    } else if (tiles.tileAtLocationIsWall(tiles.getTileLocation(location.column, location.row + 1)) && angle == 90) {
        return false
    } else if (tiles.tileAtLocationIsWall(tiles.getTileLocation(location.column - 1, location.row)) && angle == 180) {
        return false
    } else if (tiles.tileAtLocationIsWall(tiles.getTileLocation(location.column, location.row - 1)) && angle == 270) {
        return false
    } else {
        return true
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(inCutscene)) {
        for (let index = 0; index < 45; index++) {
            angle += 2
            Render.setViewAngleInDegree(angle)
            pause(1)
        }
        if (angle == 360) {
            angle = 0
        }
    }
})
function renderText (text: string, speed: number) {
    for (let index = 0; index <= text.length; index++) {
        if (text.charAt(index) == "/") {
            pause(200)
        } else if (text.charAt(index) == "-") {
            chatText = "" + chatText + " "
            textSprite.setText(chatText)
        } else if (text.charAt(index) == " ") {
            chatText = "" + chatText + text.charAt(index)
            textSprite.setText(chatText)
            pause(speed)
        } else {
            chatText = "" + chatText + text.charAt(index)
            textSprite.setText(chatText)
            pause(speed)
            music.play(music.createSoundEffect(WaveShape.Triangle, 415, 316, 255, 255, 25, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        }
    }
}
function positionChecks (interact: boolean) {
    if (!(interact)) {
        if (tilemap_num == 0) {
            if (positionIf(4, 6, 180, false)) {
                cutscene(1)
            }
        } else if (tilemap_num == 2) {
            if (positionIf(5, 1, 0, false) || positionIf(5, 12, 0, false)) {
                talkStart(assets.image`UIBlank`, "School hasn't started yet", 50, assets.image`UIBlank`)
                talk(assets.image`UIBlank`, "I have no reason to go --here", 50, assets.image`UIBlank`)
                talkEnd()
                move(-1, 1)
            }
        }
    } else {
        if (tilemap_num == 1) {
            if (positionIf(2, 5, 90, true)) {
                talkStart(assets.image`UIBlank`, "My brother's bedroom", 50, assets.image`UIBlank`)
                talk(assets.image`UIBlank`, "He's returning soon", 50, assets.image`UIBlank`)
                talkEnd()
            } else if (positionIf(5, 5, 90, true)) {
                talkStart(assets.image`UIBlank`, "My parent's bedroom", 50, assets.image`UIBlank`)
                talkEnd()
            } else if (positionIf(5, 5, 0, true)) {
                talkStart(assets.image`UIBlank`, "The bathroom", 50, assets.image`UIBlank`)
                talk(assets.image`UIBlank`, "I guess I'll look in the mirror", 50, assets.image`UIBlank`)
                talkEnd()
                inCutscene = true
                color.startFade(color.originalPalette, color.Black, 500)
                color.pauseUntilFadeDone()
                Cutscene.setImage(assets.image`Mirror`)
                color.startFade(color.Black, color.originalPalette)
                color.pauseUntilFadeDone()
                talkStart(assets.image`UIBlank`, "I look the same with thisschool outfit on", 50, assets.image`UIBlank`)
                talk(assets.image`UIBlank`, "It doesn't look bad -----though", 50, assets.image`UIBlank`)
                talk(assets.image`UIBlank`, "./././", 50, assets.image`UIBlank`)
                talk(assets.image`UIBlank`, "Something is// off// with ---my reflection", 50, assets.image`UIBlank`)
                talk(assets.image`UIBlank`, "I'm in a hurry,/ I'll ----check it out later", 50, assets.image`UIBlank`)
                talkEnd()
                color.startFade(color.originalPalette, color.Black)
                color.pauseUntilFadeDone()
                Cutscene.setImage(assets.image`UIBlank`)
                color.startFade(color.Black, color.originalPalette, 500)
                inCutscene = false
            } else if (positionIf(1, 5, 180, true)) {
                talkStart(assets.image`UIBlank`, "The Backdoor", 50, assets.image`UIBlank`)
                talk(assets.image`UIBlank`, "I'm leaving through the -front", 50, assets.image`UIBlank`)
                talkEnd()
            } else if (positionIf(2, 2, 0, true)) {
                talkStart(assets.image`UIBlank`, "My bed", 50, assets.image`UIBlank`)
                talk(assets.image`UIBlank`, "I'm not going back to ---sleep", 50, assets.image`UIBlank`)
                talkEnd()
            } else if (positionIf(2, 3, 0, true)) {
                talkStart(assets.image`UIBlank`, "I'll check my email", 50, assets.image`UIBlank`)
                talk(assets.image`UIBlank`, "./././", 50, assets.image`UIBlank`)
                talk(assets.image`UIBlank`, "\"You have [1] unread ----email\"", 50, assets.image`UIBlank`)
                talkEnd()
                inCutscene = true
                Cutscene.setImage(assets.image`Email1`)
                pauseUntil(() => !(controller.A.isPressed()))
                pauseUntil(() => controller.A.isPressed())
                Cutscene.setImage(assets.image`UIBlank`)
                inCutscene = false
                talkStart(assets.image`UIBlank`, "Guess I'll be meeting ---with him after school.", 50, assets.image`UIBlank`)
                talkEnd()
            } else if (positionIf(7, 1, 0, true)) {
                talkStart(assets.image`UIBlank`, "I should head to school", 50, assets.image`UIBlank`)
                talk(assets.image`UIBlank`, "Wouldn't want to be late", 50, assets.image`UIBlank`)
                talkEnd()
                tilemapLoad(2, 1)
                talkStart(assets.image`UIBlank`, "Opening Ceremony should -be going on", 50, assets.image`UIBlank`)
                talk(assets.image`UIBlank`, "It should be straight ---ahead", 50, assets.image`UIBlank`)
                talkEnd()
            }
        } else if (tilemap_num == 2) {
            if (positionIf(3, 7, 0, true) || positionIf(3, 6, 0, true)) {
                cutscene(2)
            } else if (positionIf(3, 1, 270, true) || positionIf(3, 12, 90, true)) {
                talkStart(assets.image`UIBlank`, "I don't need to go ------upstairs", 50, assets.image`UIBlank`)
                talkEnd()
            }
        }
    }
}
function moon_phase () {
    moonPhase += 1
    if (moonPhase == 17) {
        moonPhase = 0
    }
    UI.setImage(UIAnimation[moonPhase])
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    move(-1, 1)
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    tilemapLoad(1, 1)
})
function cutscene (num: number) {
    if (num == 1) {
        talkStart(assets.image`Wizard`, "Hmm?", 50, assets.image`WizardFace`)
        talk(assets.image`Wizard`, "So //you're the one who has/arrived...", 40, assets.image`WizardFace`)
        talk(assets.image`Wizard`, "You have been called here/due to//.//.//.// certain        circumstances.", 40, assets.image`WizardFace`)
        talk(assets.image`Wizard`, "There is an evil /entity/ -in your world.", 40, assets.image`WizardFace`)
        talk(assets.image`Wizard`, "Usually //it's my job to --deal with something like that,", 40, assets.image`WizardFace`)
        talk(assets.image`Wizard`, "But I'm unable to go to -your world and contact is//difficult,", 40, assets.image`WizardFace`)
        talk(assets.image`Wizard`, "And so I've met with you /here.", 40, assets.image`WizardFace`)
        talk(assets.image`Wizard`, "My time in here //with you// is running out.", 40, assets.image`WizardFace`)
        talk(assets.image`Wizard`, "I will meet with you ----again...", 40, assets.image`WizardFace`)
        talk(assets.image`Wizard`, "Farewell...", 40, assets.image`WizardFace`)
        talk(assets.image`Wizard`, "Let the moonlight guide -you home...", 40, assets.image`WizardFace`)
        talkEnd()
        tilemapLoad(1, 1)
    } else if (num == 2) {
        inCutscene = true
        color.startFade(color.originalPalette, color.Black)
        color.pauseUntilFadeDone()
        Cutscene.setImage(assets.image`Black`)
        color.setPalette(
        color.originalPalette
        )
        talkStart(assets.image`UIBlank`, "Although slightly late, -I arrived at the opening ceremony", 50, assets.image`UIBlank`)
        talk(assets.image`UIBlank`, "The principal welcomes --everyone and everyone ---gets their school emblem", 50, assets.image`UIBlank`)
        talk(assets.image`UIBlank`, "The ceremony eventually -ends", 50, assets.image`UIBlank`)
        talk(assets.image`UIBlank`, "I decided to go to the --restroom for a little bit", 50, assets.image`UIBlank`)
        talk(assets.image`UIBlank`, "./././", 50, assets.image`UIBlank`)
        talk(assets.image`UIBlank`, "I was about to leave, butsomeone grabbed my ------shoulder.", 50, assets.image`UIBlank`)
        talk(assets.image`UIBlank`, "Before I could turn to --see who it was,", 50, assets.image`UIBlank`)
        talk(assets.image`UIBlank`, "They pulled me and I fellonto the floor.", 50, assets.image`UIBlank`)
        talk(assets.image`UIBlank`, "I could no longer hear --the talking in the ------hallway.", 50, assets.image`UIBlank`)
        talk(assets.image`UIBlank`, "The room around me looks off./././", 50, assets.image`UIBlank`)
        talk(assets.image`UIBlank`, "./././", 50, assets.image`UIBlank`)
        talk(assets.image`UIBlank`, "There's no one in sight", 50, assets.image`UIBlank`)
        talk(assets.image`UIBlank`, "Where am I?", 50, assets.image`UIBlank`)
        talkEnd()
        Cutscene.setImage(assets.image`myImage`)
    }
}
function talkEnd () {
    sprites.destroy(Interaction)
    sprites.destroy(textSprite)
    sprites.destroy(talkSprite)
    UI.setImage(UIAnimation[moonPhase])
    if (story == 0) {
        UI.setImage(assets.image`UIBlank`)
    }
    pauseUntil(() => !(controller.A.isPressed()))
    inCutscene = false
}
function move (speed2: number, delay: number) {
    if (!(inCutscene)) {
        if (speed2 < 0) {
            angle = angle + 180
            if (angle >= 360) {
                angle = angle - 360
            }
        }
        if (angle == 0) {
            if (WallChecks()) {
                for (let index = 0; index < 16 / Math.abs(speed2); index++) {
                    mySprite.x += Math.abs(speed2)
                    pause(delay)
                }
                steps += 1
            }
        } else if (angle == 90) {
            if (WallChecks()) {
                for (let index = 0; index < 16 / Math.abs(speed2); index++) {
                    mySprite.y += Math.abs(speed2)
                    pause(delay)
                }
                steps += 1
            }
        } else if (angle == 180) {
            if (WallChecks()) {
                for (let index = 0; index < 16 / Math.abs(speed2); index++) {
                    mySprite.x += Math.abs(speed2) * -1
                    pause(delay)
                }
                steps += 1
            }
        } else if (angle == 270) {
            if (WallChecks()) {
                for (let index = 0; index < 16 / Math.abs(speed2); index++) {
                    mySprite.y += Math.abs(speed2) * -1
                    pause(delay)
                }
                steps += 1
            }
        }
        if (speed2 < 0) {
            angle = angle - 180
            if (angle >= 360) {
                angle = angle - 360
            } else if (angle < 0) {
                angle = angle + 360
            }
        }
        if (steps == 20) {
            steps = 0
            moon_phase()
        }
        positionChecks(false)
    }
}
let textSprite: TextSprite = null
let chatText = ""
let talkSprite: Sprite = null
let location: tiles.Location = null
let inCutscene = false
let story = 0
let tilemap_num = 0
let moonPhase = 0
let UIAnimation: Image[] = []
let UI: Sprite = null
let Cutscene: Sprite = null
let Interaction: Sprite = null
let decoration2: Sprite = null
let decoration1: Sprite = null
let steps = 0
let angle = 0
let mySprite: Sprite = null
mySprite = Render.getRenderSpriteVariable()
Render.moveWithController(0, 0, 0)
scene.setBackgroundImage(assets.image`Background_M`)
tiles.setCurrentTilemap(tilemap`MoonlightShrine`)
tiles.placeOnTile(mySprite, tiles.getTileLocation(2, 2))
angle = 0
steps = 21
decoration1 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Food)
decoration2 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Food)
Interaction = sprites.create(assets.image`UIBlank`, SpriteKind.HUD)
Cutscene = sprites.create(assets.image`UIBlank`, SpriteKind.HUD)
UI = sprites.create(assets.image`UIBlank`, SpriteKind.HUD)
UIAnimation = assets.animation`Moon_Phases`
UI.setFlag(SpriteFlag.RelativeToCamera, true)
Cutscene.setFlag(SpriteFlag.RelativeToCamera, true)
Interaction.setFlag(SpriteFlag.RelativeToCamera, true)
moonPhase = 0
tilemap_num = 0
story = 0
Interaction.z = 4
Cutscene.z = 4
UI.z = 5
music.play(music.createSong(assets.song`HomeOfTheMoonlitButterfly`), music.PlaybackMode.LoopingInBackground)
