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