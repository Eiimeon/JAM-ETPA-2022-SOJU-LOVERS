class levelScene extends Phaser.Scene {

    constructor(config) {
        super(config);

        this.safe1 = new Array(2).fill(new Array);
        this.safe2 = new Array(2).fill(new Array);
        this.safe1Overlap = new Array(2).fill(new Array);
        this.safe2Overlap = new Array(2).fill(new Array);


    }


    buildBetterHitBox(layer, hitboxVar) {
        for (let i = 0; i < layer.height; i++) {
            for (let j = 0; j < layer.width; j++) {
                if (layer.data[i][j].index >= 0) {
                    hitboxVar.push(new SafeZoneBlock(this, j * 64, i * 64, hitboxVar).setOrigin(0, 0));
                }
            }
        }
    }

    buildGamePlaformsFromMap(map, tileset) {
        this.obstacles = map.createLayer('ligne blanche', tileset);
        this.obstacles.setCollisionByExclusion(-1, true);

        map.layers.forEach((layer) => {
            switch (layer.name[0]) {
                case 's':
                    console.log(layer.name[9])
                    map.createLayer(layer.name, tileset);
                    this.buildBetterHitBox(layer, this.safe1[layer.name[9]]);
                    this.buildBetterHitBox(layer, this.safe2[layer.name[9]]);
                    this.buildBetterHitBox(layer, this.safe1Overlap[layer.name[9]]);
                    this.buildBetterHitBox(layer, this.safe2Overlap[layer.name[9]]);
                    break;
            }
        })
        this.figs = [];
        map.getObjectLayer('figurants').objects.forEach((figure)=>{
            var temp = new Figurant(this,figure.x,figure.y);
            this.figs.push(temp);
        });
        console.log(this.figs);
    }

    buildCollisions() {

        // Colliders avec les layers

        this.physics.add.collider(this.player1, this.obstacles);
        this.physics.add.collider(this.player2, this.obstacles);

        this.player1.isSafe = false;
        this.player2.isSafe = false;
        for (let i = 0; i < 2; i++) {
            this.physics.add.collider(this.player1, this.safe1[i]);
            this.physics.add.collider(this.player2, this.safe2[i]);
            //console.log(this.safe1Overlap[i])
            
            this.physics.add.overlap(this.player1, this.safe1Overlap[i], (currPlayer, currSafeBox) => {
                this.player1.safeTimer = 3;
                

            })
            this.physics.add.overlap(this.player2, this.safe2Overlap[i], (currPlayer, currSafeBox) => {
                this.player2.safeTimer = 3;
            })
        }

        // if (this.player1.hasChoco) {
        //     for (let i = 0; i < this.safe1.length; i++) {
        //         this.safe1[i].forEach((safeBox) => {
        //             safeBox.swap();
        //         })
        //         this.safe2Overlap[i].forEach((safeBox) => {
        //             safeBox.swap();
        //         })
        //     }
        // }
        // if (this.player2.hasChoco) {
        //     for (let i = 0; i < this.safe1.length; i++) {
        //         this.safe2[i].forEach((safeBox) => {
        //             safeBox.swap();
        //         })
        //         this.safe1Overlap[i].forEach((safeBox) => {
        //             safeBox.swap();
        //         })
        //     }
        // }
    }

    buildLevel(map, tileset) {

        // Décor

        map.createLayer('fond', tileset);

        // Plateformes

        this.buildGamePlaformsFromMap(map, tileset);

        // Player & Object layers

        this.spawns = map.getObjectLayer('spawns').objects;



        this.player1 = new Chara(this, this.spawns[0].x, this.spawns[0].y, 'marco', false).setOrigin(0, 0);
        this.player1.body.setSize(200, 100);
        this.player1.body.setOffset(3 * 64, 500);
        this.player1.setScale(1 / 3);

        this.player2 = new Chara(this, this.spawns[1].x, this.spawns[1].y, 'denial', true).setOrigin(0, 0);
        this.player2.body.setSize(200, 100);
        this.player2.body.setOffset(3 * 64, 500);
        this.player2.setScale(1 / 3);
        this.choco = new Choco(this,0,0)
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
        this.gameTimer = 50;
        this.nextTagEnd = false;
        //this.time.addEvent({ delay: 300, callbackScope: this, callback: function () { this.juke.start(this.keyA); } });
    }

    standardUpdate(time, delta) {

        for(var i = 0; i<this.figs.length; i++){
            this.figs[i].react(delta);
        }
        // console.log(this.player1.safeTimer,this.player2.safeTimer);
        if(this.gameTimer >= 0){
            this.gameTimer -= delta * 0.001;
            //console.log(this.gameTimer);
        }else{
            this.nextTagEnd = true;
        }
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

        // Update les safes à chaque frame

        for (let i = 0; i<2 ; i++) {
            // console.log('swap');
            this.safe1[i].forEach((safeBox) => {
                safeBox.swap2(1);
            })
            // this.safe1Overlap[i].forEach((safeBox) => {
            //     safeBox.swap2(1);
            // })
            this.safe2[i].forEach((safeBox) => {
                safeBox.swap2(2);
            })
            // this.safe2Overlap[i].forEach((safeBox) => {
            //     safeBox.swap2(2);
            // })
        }

        if((this.player1.x - this.player2.x)**2+(this.player1.y - this.player2.y)**2 < (64*1.2)**2){

            if(!this.player1.dead && !this.player2.dead){
                if(this.nextTagEnd){
                    if(this.player1.hasChoco){
                        this.player2.endGame(this.player1,this.choco); 
                    }else{
                        this.player1.endGame(this.player2,this.choco);
                    }
                }else{
                    if(this.player1.hasChoco){
                        this.player2.tryTag(this.player1,this.choco);
                    }else{
                        this.player1.tryTag(this.player2,this.choco);
                    }
                }
            }else{
                if(this.player1.stunTimer <0 && this.player2.stunTimer <0){
                    this.player1.dead = false;
                    this.player2.dead = false;
                    console.log("DEADDEADDEAD")
                    this.scene.start('StartScreen');

                }

                
            }
        }
        this.choco.updateDisplay(delta,this.player1,this.player2);
    }

    init(_musicScene) {
        this.musicScene = _musicScene;
        this.musicScene.levelScene = this;
        console.log('Nouvelle scene : ' + this.scene.key);
    }

    update(time, delta) { }

}
