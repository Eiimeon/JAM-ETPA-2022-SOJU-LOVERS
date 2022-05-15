/*##################################################################################################################################################
BOMONT Jérémy (Noé) - Entoin JEAN - ETPA 2021-2022
Le jeu de la jam



##################################################################################################################################################*/
var g = 1500;

var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    input: {
        gamepad: true
    },
    scale: {
        mode : Phaser.Scale.FIT
    },
    scene: [
        // IntroLogos,
        StartScreen,
        PauseMenu,
        Controls,
        MusicAndData,
        Credits,
        L1_0

    ],
    audio: {
        disableWebAudio: false
    },
    //pixelArt : true
};

function restartGame() {
    game.destroy(true);
    game = new Phaser.Game(config);
}

var game = new Phaser.Game(config);

function randomint(min,max){//fonction qui renvois un nombre entier aléatoire entre min et max (max exclus)

    return min+Math.floor(Math.random()*(max-min));
    
}
function randomfloat(min,max){//fonction qui renvois un nombre entier aléatoire entre min et max (max exclus)

    return min+Math.random()*(max-min);
}