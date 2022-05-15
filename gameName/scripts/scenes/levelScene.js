class levelScene extends Phaser.Scene {

    constructor(config) {
        super(config);

        this.safe1 = new Array();
        this.safe2 = new Array();
        this.safe1Overlap = new Array();
        this.safe2Overlap = new Array();


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
            if (layer.name == 'safe') {
                map.createLayer(layer.name, tileset);
                this.buildBetterHitBox(layer, this.safe1);
                this.safe1 = new SafeZone(this, this.safe1, 1);
                this.buildBetterHitBox(layer, this.safe2);
                this.safe2 = new SafeZone(this, this.safe2, 2);
                this.buildBetterHitBox(layer, this.safe1Overlap);
                this.safe1Overlap = new SafeZone(this, this.safe1Overlap, 1, this.safe1);
                this.buildBetterHitBox(layer, this.safe2Overlap);
                this.safe2Overlap = new SafeZone(this, this.safe2Overlap, 2, this.safe2);

                this.safe1.blocks.forEach((block) => {
                    block.setTexture('box');
                })

                // this.safe1Overlap.colliderVersion = this.safe1;
                // console.log(this.safe1Overlap);
                // this.safe2Overlap.colliderVersion = this.safe2;

                console.log(this.safe1);
                // console.log(this.safe1Overlap[0]==this.safe1Overlap[1]);
            }
        });
        // for (let i = 0 ; i < 3 ; i++) {
        //     var layerName = 'safe'+i;
        //     console.log(layerName);
        //     var objects = map.getObjectLayer(layerName).objects; 
        //     objects.forEach((currObject) => {
        //         // console.log(this.safe1[i]);
        //         this.safe1[i].push( new SafeZoneBlock(this,currObject.x,currObject.y).setOrigin(0));
        //         this.safe2[i].push( new SafeZoneBlock(this,currObject.x,currObject.y).setOrigin(0));
        //         this.safe1Overlap[i].push( new SafeZoneBlock(this,currObject.x,currObject.y).setOrigin(0));
        //         this.safe2Overlap[i].push( new SafeZoneBlock(this,currObject.x,currObject.y).setOrigin(0));                
        //     })
        //     this.safe1[i]= new SafeZone(this,this.safe1[i],1);
        //     this.safe2[i]= new SafeZone(this,this.safe2[i],2);
        //     this.safe1Overlap[i]= new SafeZone(this,this.safe1Overlap[i],1,this.safe1[i]);
        //     this.safe2Overlap[i]= new SafeZone(this,this.safe2Overlap[i],2,this.safe2[i]);
        // } 
    }

    buildCollisions() {

        // Colliders avec les layers

        this.physics.add.collider(this.player1, this.obstacles);
        this.physics.add.collider(this.player2, this.obstacles);

        this.player1.isSafe = false;
        this.player2.isSafe = false;
        for (let i = 0; i < 1; i++) {
            this.physics.add.collider(this.player1, this.safe1.blocks);
            this.physics.add.collider(this.player2, this.safe2.blocks);
            this.physics.add.overlap(this.player1, this.safe1Overlap.blocks, (currPlayer, currSafeBox) => {
                this.player1.safeTimer = 3;

                // console.log(currSafeBox.parent.colliderVersion);

                // currSafeBox.parent.colliderVersion.hasPlayerOnIt = true;

            })
            this.physics.add.overlap(this.player2, this.safe2Overlap.blocks, (currPlayer, currSafeBox) => {
                // console.log('overlap');
                this.player2.safeTimer = 3;

                // console.log(currSafeBox.parent);

                // currSafeBox.parent.colliderVersion.hasPlayerOnIt = true;
            })
        }
    }

    buildLevel(map, tileset) {

        // Décor

        map.createLayer('fond', tileset);

        // Plateformes

        this.buildGamePlaformsFromMap(map, tileset);

        // Player & Object layers

        this.spawns = map.getObjectLayer('spawns').objects;


        this.player1 = new Chara(this, this.spawns[0].x, this.spawns[0].y, 'miko', false).setOrigin(0, 0);
        this.player1.body.setSize(350, 200);
        this.player1.body.setOffset(4 * 64 + 32, 900);
        this.player1.setScale(1 / 7);

        this.player2 = new Chara(this, this.spawns[1].x, this.spawns[1].y, 'denial', true).setOrigin(0, 0);
        this.player2.body.setSize(350, 200);
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

        this.text = this.add.text(350, 250, '', { font: '64px Courier', fill: '#00ff00' });
        this.score1 = 0;
        this.score2 = 0;
        this.gameTimer = 60;
        this.nextTagEnd = false;

        // this.safe1.blocks.forEach((block) => {
        //     block.setTexture('box');
        // })
    }

    standardUpdate(time, delta) {

        this.text.setText([
            'Score Marco : '+ this.score1,
            'Score Hélène : '+ this.score2
        ])

        // console.log(this.player1.safeTimer,this.player2.safeTimer);
        if (this.gameTimer >= 0) {
            this.gameTimer -= delta * 0.001;
            // console.log(this.gameTimer);
        } else {
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
        //this.player1.animate();

        this.player2.move(delta);
        //this.player2.animate();

        this.player1.depthUpdate();
        this.player2.depthUpdate();

        // Update les safes à chaque frame

        this.safe1.update(delta);
        this.safe2.update(delta);

        console.log(this.safe1.blocks[0].y)

        // Tag 
        if ((this.player1.x - this.player2.x) ** 2 + (this.player1.y - this.player2.y) ** 2 < (64 * 1.2) ** 2) {

            if (!this.player1.dead && !this.player2.dead) {
                if (this.nextTagEnd) {
                    if (this.player1.hasChoco) {
                        this.player2.endGame(this.player1);
                    } else {
                        this.player1.endGame(this.player2);
                    }
                } else {
                    if (this.player1.hasChoco) {
                        this.player2.tryTag(this.player1);
                    } else {
                        this.player1.tryTag(this.player2);
                    }
                }
            } else {
                if (this.player1.stunTimer < 0 && this.player2.stunTimer < 0) {
                    this.player1.dead = false;
                    this.player2.dead = false;
                    console.log("DEADDEADDEAD")
                    this.scene.start('StartScreen');
                }
            }
        }
    }

    init(_musicScene) {
        this.musicScene = _musicScene;
        this.musicScene.levelScene = this;
        console.log('Nouvelle scene : ' + this.scene.key);
    }

    update(time, delta) { }

}
