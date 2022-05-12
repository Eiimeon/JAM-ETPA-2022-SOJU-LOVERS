class L1_4 extends levelScene {

    constructor() {
        super({
            key: 'L1_4',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: g },
                    // debug: true
                }
            }
        })
    }

    preload() { }

    create() {

    }

    update(time,delta) {
        this.standardUpdate(time,delta);
    }

}