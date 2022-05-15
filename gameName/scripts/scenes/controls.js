class Controls extends Phaser.Scene {
    constructor() {
        super({
            key: 'Controls',
        })
    }

    goBack() {
        this.scene.sleep();
    }


    init () {
        console.log('Controles');
    }

    preload() { }
    
    create() {
        this.bg = this.add.image(1920 / 2, 1080 / 2, 'controlsMenu');
        this.bg.setScale(0.4)

        this.goBackButton = this.add.image(525, 900, 'goBack').setScale(0.25);
        this.goBackButton.setInteractive();
        this.goBackButton.on('pointerdown', () => this.goBack());
    }

    update() { }
}   