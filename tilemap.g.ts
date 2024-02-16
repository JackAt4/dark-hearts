// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile3 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile4 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile5 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile6 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile7 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile8 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile9 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile10 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile11 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "MoonlightShrine":
            case "level1":return tiles.createTilemap(hex`0b000900010103010100000000000001000000010103010101010300000000000000000001010000000101030101000101010301010101010300030200000001010301010001010000000000000000000102000000010103010101010101030101000000000000`, img`
2 2 2 2 2 . . . . . . 
2 . . . 2 2 2 2 2 2 2 
2 . . . . . . . . . 2 
2 . . . 2 2 2 2 2 . 2 
2 2 2 2 2 2 2 2 2 . 2 
2 . . . 2 2 2 2 2 . 2 
2 . . . . . . . . . 2 
2 . . . 2 2 2 2 2 2 2 
2 2 2 2 2 . . . . . . 
`, [myTiles.transparency16,myTiles.tile3,myTiles.tile1,myTiles.tile4], TileScale.Sixteen);
            case "Home":
            case "level2":return tiles.createTilemap(hex`09000800000000000202020202000202020200000001000200000200000002000200000200020202020201020200020000010000000000010000020201020201020000000000000000000000`, img`
. . . . 2 2 2 2 2 
. 2 2 2 2 . . . 2 
. 2 . 2 2 . . . 2 
. 2 . 2 2 . 2 2 2 
2 2 . 2 2 . 2 . . 
2 . . . . . 2 . . 
2 2 2 2 2 2 2 . . 
. . . . . . . . . 
`, [myTiles.transparency16,myTiles.tile2,myTiles.tile5], TileScale.Sixteen);
            case "SchoolF1":
            case "SchoolF1":return tiles.createTilemap(hex`0f000e00000001050101020606020206060201000001000000000000000000000001000001000101020606020206060201000001000100000000000000000000010601000100000000000000000000010000000600000000000000000000030000000300000000000000000000040000000400000000000000000000010000000600000000000000000000010601000100000000000000000000000001000100000000000000000000000001000101020606020206060201000001000000000000000000000001000001050101020606020206060201`, img`
. . 2 2 2 2 2 2 2 2 2 2 2 2 2 
. . 2 . . . . . . . . . . . 2 
. . 2 . 2 2 2 2 2 2 2 2 2 2 2 
. . 2 . 2 . . . . . . . . . . 
2 2 2 . 2 . . . . . . . . . . 
2 . . . 2 . . . . . . . . . . 
2 . . . 2 . . . . . . . . . . 
2 . . . 2 . . . . . . . . . . 
2 . . . 2 . . . . . . . . . . 
2 2 2 . 2 . . . . . . . . . . 
. . 2 . 2 . . . . . . . . . . 
. . 2 . 2 2 2 2 2 2 2 2 2 2 2 
. . 2 . . . . . . . . . . . 2 
. . 2 2 2 2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency16,myTiles.tile6,myTiles.tile7,myTiles.tile8,myTiles.tile9,myTiles.tile10,myTiles.tile11], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "ColumnWall":
            case "tile3":return tile3;
            case "ColumnWallSpecial":
            case "tile1":return tile1;
            case "ColumnWallEye":
            case "tile4":return tile4;
            case "HouseWall":
            case "tile5":return tile5;
            case "HouseDoor":
            case "tile2":return tile2;
            case "SchoolWall":
            case "tile6":return tile6;
            case "SchoolDoor":
            case "tile7":return tile7;
            case "SchoolBigDoorL":
            case "tile8":return tile8;
            case "SchoolBigDoorR":
            case "tile9":return tile9;
            case "SchoolStairs":
            case "tile10":return tile10;
            case "SchoolWindow":
            case "tile11":return tile11;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
