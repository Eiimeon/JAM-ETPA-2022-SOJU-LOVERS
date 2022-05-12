class L1_5 extends levelScene {

    constructor() {
        super({
            key: 'L1_5',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: g },
                    debug: true
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