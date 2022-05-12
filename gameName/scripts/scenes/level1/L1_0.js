class L1_0 extends levelScene {

    constructor() {
        super({
            key: 'L1_0',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: g },
                    //debug: true
                }
            }
        })
    }

    preload() { }

    create() {
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.add.image(0,0,'placeholderLvl1').setOrigin(0);
    }

    update(time,delta) {
        this.standardUpdate(time,delta);
    }

}