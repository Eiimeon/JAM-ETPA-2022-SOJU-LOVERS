class PauseMenu extends Phaser.Scene {
    constructor() {
        super({
            key: 'PauseMenu',
        })
        this.canPressP = false;
    }

    resumeGame() {
        this.musicScene.scene.resume();
        this.musicScene.levelScene.scene.resume();
        this.scene.sleep();
    }

    endGame() {
        this.musicScene.scene.stop();
        this.musicScene.levelScene.scene.stop();
        this.scene.run('StartScreen');
        this.scene.sleep();
    }

    toggleControls() {
        this.scene.run('Controls');
        this.scene.bringToTop('Controls');
    }

    preload() { }

    create() {
        this.musicScene = this.scene.get('MusicAndData');
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.time.addEvent({delay : 500, callback : () => {this.canPressP = true}});

        this.add.image(1920 / 2, 1080 / 2, 'pause');
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        this.resume = this.add.image(500, 300, 'resume');
        this.resume.setInteractive();
        this.resume.on('pointerdown', () => this.resumeGame());

        this.controls = this.add.image(500, 600, 'controls');
        this.controls.setInteractive();
        this.controls.on('pointerdown', () => this.toggleControls());

        this.mainMenu = this.add.image(500, 900, 'mainMenu');
        this.mainMenu.setInteractive();
        this.mainMenu.on('pointerdown', () => this.endGame());
    }

    update() {
        if (this.keyP.isDown && this.canPressP) {
            this.resumeGame();
        }
    }
}   