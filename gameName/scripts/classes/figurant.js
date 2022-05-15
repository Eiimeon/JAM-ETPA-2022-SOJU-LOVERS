class Figurant extends Phaser.Physics.Arcade.Sprite {
    constructor(_scene, _x = 64, _y = 64) {
        super(_scene, _x, _y, 'fig1');

        _scene.add.existing(this);
        _scene.physics.add.existing(this);

        this.x = _x - 128;
        this.y = _y - 128;
        this.lerpSpeed = 15;
        this.depth = 1; //ultra kill
        this.setOrigin(randomfloat(-0.2,0.2),randomfloat(-0.2,0.2))
        
        this.setScale(randomfloat(0.8,1.1));

        this.anims.create({
            key: 'react',
            frames: this.anims.generateFrameNumbers('fig1', { frames: [1,0] }),
            frameRate: 8,
            repeat: 0
        })
        this.reactTimer = randomint(1,5);
    }

    

    react(delta){
        if(this.reactTimer > 0){
            this.reactTimer -= delta * 0.001;
        }else{
            this.anims.play('react');
            this.reactTimer = randomfloat(1,5);
        }
        //do random stuf
    }

}