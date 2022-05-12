class MusicAndData extends Phaser.Scene {
    constructor() {
        super({
            key: 'MusicAndData',
        })
    }

    preload() { }

    create() {
        this.scene.run('L1_0',this);
        this.levelScene = this.scene.get('L1_0');
    }

    update() { }
}   