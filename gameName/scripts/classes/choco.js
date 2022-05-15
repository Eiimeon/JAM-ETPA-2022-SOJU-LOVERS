class Choco extends Phaser.Physics.Arcade.Sprite {
    constructor(_scene, _x = 64, _y = 64) {
        super(_scene, _x, _y, 'choco');

        _scene.add.existing(this);
        _scene.physics.add.existing(this);

        this.x = _x;
        this.y = _y;
        this.lerpSpeed = 15;
        this.setOrigin(0.35,0.5);
        this.setScale(0.5,0.5)
        this.depth = 9999; //ultra kill
        console.log(this);

        this.anims.create({
            key: 'pickup',
            frames: this.anims.generateFrameNumbers('choco', { frames: [1,0] }),
            frameRate: 8,
            repeat: 0
        })
    }

    updateDisplay(delta,p1,p2){

        if(p1.hasChoco){
            this.x = this.lerp(this.x,p1.x +70,delta * 0.001 * this.lerpSpeed);
            this.y= this.lerp(this.y,p1.y-40,delta * 0.001* this.lerpSpeed);
        }else{
            this.x = this.lerp(this.x,p2.x +70,delta * 0.001* this.lerpSpeed);
            this.y= this.lerp(this.y,p2.y -40,delta * 0.001* this.lerpSpeed);
        }

        this.setScale(this.lerp(this._scaleX,0.7,delta * 0.001 *20),this.lerp(this._scaleY,0.7,delta * 0.001 * 15))
    }

    
    getChoco(){
        this.setScale(2,2)
        this.anims.play('pickup')
    }

    lerp (start, end, amt){//fonction qui fait transition entre deux valeur selon un facteur atm
        return (1-amt)*start+amt*end;
    }
}