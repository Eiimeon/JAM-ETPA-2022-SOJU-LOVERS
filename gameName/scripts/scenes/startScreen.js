class StartScreen extends Phaser.Scene {
    constructor() {
        super({
            key: 'StartScreen',
        })

    }

    preload() {
        this.load.image('titleScreen', 'assets/images/titleScreen.png');
        this.load.image('start', 'assets/images/protoStart.png');
        this.load.image('controls', 'assets/images/stickerControls.png');
        this.load.image('resume', 'assets/images/protoResume.png');
        this.load.image('mainMenu', 'assets/images/stickerMenu.png');
        this.load.image('controlsMenu', 'assets/images/UI_Controls.png');
        this.load.image('goBack', 'assets/images/stickerGoBack.png');



        this.load.image('placeholderLvl1', 'assets/images/placeholderLvl1.png');
        this.load.image('pause','assets/images/UI_Pause.png');


        this.load.spritesheet('runSheet', 'assets/images/runAnimTestSheet.png', { frameWidth: 1000, frameHeight: 1270 });

        this.load.image('miko','assets/images/miko0.png');
        this.load.image('denial','assets/images/denialProto.png');
        this.load.image('transparent','assets/images/transparent.png');
        this.load.image('box','assets/images/crate.png');

        this.load.image('tileset', 'assets/images/map/tilesetProto.png')
        this.load.tilemapTiledJSON('gym', 'assets/images/map/gym.json');
    }

    create() {
        this.add.image(0, 0, 'titleScreen').setOrigin(0, 0).setScale(1);

        this.start = this.add.image(500,500, 'start') ;
        this.start.setInteractive();
        this.start.on('pointerdown', () => {this.scene.start('MusicAndData')});

        this.controls = this.add.image(500,800, 'controls').setScale(0.3);
        this.controls.setInteractive();
        this.controls.on('pointerdown', () => {this.scene.run('Controls')});


        this.cameras.main.fadeIn(1000);
    }

    update() {}
}   