class L1_2 extends levelScene {

    constructor() {
        super({
            key: 'L1_2',
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

    }

    update(time,delta) {
        this.standardUpdate(time,delta);
    }

}