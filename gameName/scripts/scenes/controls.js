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
        this.add.image(1920 / 2, 1080 / 2, 'controlsMenu');

        
        this.goBackButton = this.add.image(500, 900, 'goBack');
        this.goBackButton.setInteractive();
        this.goBackButton.on('pointerdown', () => this.goBack());
    }

    update() { }
}   