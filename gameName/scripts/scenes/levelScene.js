class levelScene extends Phaser.Scene {

    constructor(config) {
        super(config);
    }


    buildBetterHitBox(layer, hitboxVar, beatmap) {
        for (let i = 0; i < layer.height; i++) {
            for (let j = 0; j < layer.width; j++) {
                if (layer.data[i][j].index >= 0) {
                    hitboxVar.push(new RythmPlat(this, j * 64, i * 64, 'transparent', beatmap).setOrigin(0, 0));
                    if (layer.name = '4beats/deathbox41') {
                    }
                }
            }
        }
    }

    buildGamePlaformsFromMap(map, tileset) {
        this.obstacles = map.createLayer('ligne blanche', tileset);
        this.obstacles.setCollisionByExclusion(-1, true);


    }

    buildCollisions() {

        // Colliders avec les layers

        this.physics.add.collider(this.player1, this.obstacles);
        this.physics.add.collider(this.player2, this.obstacles);
        this.physics.add.collider(this.player1, this.player2);
    }

    buildLevel(map, tileset) {

        // Décor

        map.createLayer('fond', tileset);

        // Plateformes

        this.buildGamePlaformsFromMap(map, tileset);

        // Player & Object layers

        this.spawns = map.getObjectLayer('spawns').objects;


        this.player1 = new Chara(this, this.spawns[0].x, this.spawns[0].y, 'miko', 'cursors').setOrigin(0, 0);
        this.player1.setSize(350, 200);
        this.player1.body.setOffset(4 * 64 + 32, 900);
        this.player1.setScale(1 / 7);

        this.player2 = new Chara(this, this.spawns[1].x, this.spawns[1].y, 'denialProto', 'zqsd').setOrigin(0, 0);
        this.player2.setSize(350, 200);
        this.player2.body.setOffset(4 * 64 + 32, 900);
        this.player2.setScale(1 / 7);

        // Collisions

        this.buildCollisions();

        //this.buildCollisions();

        // Camera
        var cam = this.cameras.main;
        //cam.startFollow(this.player);
        cam.setBounds(0, 0, map.width, map.height, true, true, true); // Empêche de voir sous le sol notamment
        cam.setZoom(0.7);

        this.cameras.main.fadeIn(1000);


        // Touches utilisées
        this.cursors = this.input.keyboard.createCursorKeys(); // Flèches directionnelles 

        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // Touche espace 
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        //this.time.addEvent({ delay: 300, callbackScope: this, callback: function () { this.juke.start(this.keyA); } });
    }

    standardUpdate(time, delta) {
        if (this.keyP.isDown) {
            console.log('pause');
            this.scene.run('PauseMenu');
            this.scene.bringToTop('PauseMenu');
            this.scene.pause();
            this.musicScene.scene.pause();
        }

        this.player1.move(delta);
        this.player1.animate();

        this.player2.move(delta);
        this.player2.animate();

        this.player1.depthUpdate();
        this.player2.depthUpdate();
    }

    init(_musicScene) {
        this.musicScene = _musicScene;
        this.musicScene.levelScene = this;
        console.log('Nouvelle scene : ' + this.scene.key);
    }

    update(time, delta) { }
}
