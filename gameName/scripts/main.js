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
        L1_0,
        L1_1,
        L1_2,
        L1_3,
        L1_4,
        L1_5,
        L1_6,
        L1_7,
        L1_8,
        L1_9,
        Gym
    ],
    audio: {
        disableWebAudio: false
    }
};


var game = new Phaser.Game(config);

function randomint(min,max){//fonction qui renvois un nombre entier aléatoire entre min et max (max exclus)

    return min+Math.floor(Math.random()*(max-min));
    
}
function randomfloat(min,max){//fonction qui renvois un nombre entier aléatoire entre min et max (max exclus)

    return min+Math.random()*(max-min);
}