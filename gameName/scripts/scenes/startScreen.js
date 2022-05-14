class StartScreen extends Phaser.Scene {
    constructor() {
        super({
            key: 'StartScreen',
        })

    }

    preload() {
        this.load.image('titleScreen', 'assets/images/titleScreen.png');
        this.load.image('placeholderLvl1', 'assets/images/placeholderLvl1.png');
        this.load.image('pause','assets/images/pause.png');

        this.load.spritesheet('runSheet', 'assets/images/runAnimTestSheet.png', { frameWidth: 1000, frameHeight: 1270 });

        this.load.image('miko','assets/images/miko0.png');

        this.load.image('tileset', 'assets/images/map/tilesetProto.png')
        this.load.tilemapTiledJSON('gym', 'assets/images/map/gym.json');
    }

    create() {
        this.add.image(0, 0, 'titleScreen').setOrigin(0, 0).setScale(1);
        this.cameras.main.fadeIn(1000);
    }

    update() {
        var keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        if (keySpace.isDown) {
            this.scene.start('MusicAndData');
        }
    }
}   