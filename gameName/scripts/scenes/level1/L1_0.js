class L1_0 extends levelScene {

    constructor() {
        super({
            key: 'L1_0',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    
                    //debug: true
                }
            }
        })
    }

    preload() { }

    create() {
        const MAP = this.make.tilemap({ key: 'gym' });
        const TILESET = MAP.addTilesetImage('proto', 'tileset');

        this.buildLevel(MAP, TILESET);
    }

    update(time, delta) {
        this.standardUpdate(time, delta);
    }

}