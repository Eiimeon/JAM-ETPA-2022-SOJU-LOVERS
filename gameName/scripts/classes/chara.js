class Chara extends Phaser.Physics.Arcade.Sprite {

    constructor(_scene, _x = 64, _y = 64, _keyCache, _controlsType) {
        super(_scene, _x, _y, _keyCache);

        _scene.add.existing(this);
        _scene.physics.add.existing(this);

        this.body.useDamping = true;
        this.friction = 0.001;


        this.scene = _scene;

        // Flags
        this.jumpAllowed = true;
        this.dashAllowed = true;
        this.spawnIndex = 0;
        this.controlsType = _controlsType;

        // Paramètres
        this.runSpeed = 500;
        this.dashSpeed = 1000;
        this.dashDuration = 200;

        this.speed = 500;
        this.accelerationFactor = 2;
        this.decelerationFactor = 3;
        this.turnDecelerationFactor = 6;

        this.hasChoco = false;
        this.stunTimer = -1;
        this.dead = false;
        this.safeTimer = 0;
        console.log(this.controlsType)
        if(this.controlsType){
            this.hasChoco = true;
        }



        // Animations
        /*this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('runSheet', { frames: [0, 1, 2, 3, 4, 5] }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('runSheet', { frames: [6] }),
            frameRate: 8,
            repeat: -1
        })*/
    }

    move(delta) {

        if(this.stunTimer < 0 && !this.dead){

        
            if(this.controlsType)
            {
                if(this.scene.cursors.left.isDown){
                    

                    if(this.accelerationX >=0){
                        this.accelerationX -= 0.001 * delta * this.turnDecelerationFactor;
                        
                    }
                    else if(this.accelerationX > -1){
                        this.accelerationX -= 0.001 * delta * this.accelerationFactor;
                    }
                    
                    this.flipX = true;
                }
                else if(this.scene.cursors.right.isDown){


                    if(this.accelerationX <=0)
                    {
                        this.accelerationX += 0.001 * delta * this.turnDecelerationFactor;
                    }
                    else if(this.accelerationX < 1)
                    {
                        this.accelerationX += 0.001 * delta * this.accelerationFactor;
                    }
                        this.flipX = false;

                }else{

                    if(this.accelerationX <= -0.02 ){
                        this.accelerationX += 0.001 * delta * this.decelerationFactor;
                    
                    }else if(this.accelerationX >= 0.02 ){
                        this.accelerationX -= 0.001 * delta * this.decelerationFactor;

                    }else{
                        this.accelerationX = 0;

                    }
                }
                //up and doww
                if(this.scene.cursors.up.isDown){
                    

                    if(this.accelerationY >=0){
                        this.accelerationY -= 0.001 * delta * this.turnDecelerationFactor;
                        
                    }
                    else if(this.accelerationY > -1){
                        this.accelerationY -= 0.001 * delta * this.accelerationFactor;
                    }
                    
                    this.flipX = true;
                    
                }
                else if(this.scene.cursors.down.isDown){


                    if(this.accelerationY <=0)
                    {
                        this.accelerationY += 0.001 * delta * this.turnDecelerationFactor;
                    }
                    else if(this.accelerationY < 1)
                    {
                        this.accelerationY += 0.001 * delta * this.accelerationFactor;
                    }
                        this.flipX = false;
                    
                    
                }else{


                    if(this.accelerationY <= -0.02 ){
                        this.accelerationY += 0.001 * delta * this.decelerationFactor;
                    
                    }else if(this.accelerationY >= 0.02 ){
                        this.accelerationY -= 0.001 * delta * this.decelerationFactor;

                    }else{
                        this.accelerationY = 0;

                    }
        
                }
            }else{

                if(this.scene.keyQ.isDown){
                    
                    if(this.accelerationX >=0){
                        this.accelerationX -= 0.001 * delta * this.turnDecelerationFactor;
                        
                    }
                    else if(this.accelerationX > -1){
                        this.accelerationX -= 0.001 * delta * this.accelerationFactor;
                    }
                    
                    this.flipX = true;
                }
                else if(this.scene.keyD.isDown){


                    if(this.accelerationX <=0)
                    {
                        this.accelerationX += 0.001 * delta * this.turnDecelerationFactor;
                    }
                    else if(this.accelerationX < 1)
                    {
                        this.accelerationX += 0.001 * delta * this.accelerationFactor;
                    }
                        this.flipX = false;

                    
                }else{

                    if(this.accelerationX <= -0.02 ){
                        this.accelerationX += 0.001 * delta * this.decelerationFactor;
                    
                    }else if(this.accelerationX >= 0.02 ){
                        this.accelerationX -= 0.001 * delta * this.decelerationFactor;

                    }else{
                        this.accelerationX = 0;

                    }
                }
                //up and doww
                if(this.scene.keyZ.isDown){
                    

                    if(this.accelerationY >=0){
                        this.accelerationY -= 0.001 * delta * this.turnDecelerationFactor;
                        
                    }
                    else if(this.accelerationY > -1){
                        this.accelerationY -= 0.001 * delta * this.accelerationFactor;
                    }
                    
                    this.flipX = true;
                }
                else if(this.scene.keyS.isDown){


                    if(this.accelerationY <=0)
                    {
                        this.accelerationY += 0.001 * delta * this.turnDecelerationFactor;
                    }
                    else if(this.accelerationY < 1)
                    {
                        this.accelerationY += 0.001 * delta * this.accelerationFactor;
                    }
                        this.flipX = false;

                    
                }else{


                    if(this.accelerationY <= -0.02 ){
                        this.accelerationY += 0.001 * delta * this.decelerationFactor;
                    
                    }else if(this.accelerationY >= 0.02 ){
                        this.accelerationY -= 0.001 * delta * this.decelerationFactor;

                    }else{
                        this.accelerationY = 0;

                    }
        
                }
                
            
            }
        }
        
        this.setVelocityX(this.accelerationX * this.speed);
        this.setVelocityY(this.accelerationY * this.speed);
        if(this.stunTimer >= 0){
            //do stun stuff
            this.stunTimer -= delta;

            this.setTint(0xff0000);
            this.accelerationX = this.lerp(this.accelerationX,0,delta * 0.001 * this.decelerationFactor);
            this.accelerationY = this.lerp(this.accelerationY,0,delta * 0.001 * this.decelerationFactor);
        }else{
            this.setTint(0xffffff);
        }
        if(this.hasChoco){
            this.setVelocityX(this.accelerationX * this.speed);
            this.setVelocityY(this.accelerationY * this.speed);
            this.setTint(0xffff00);
        }else{
            this.setVelocityX(this.accelerationX * this.speed * 1.1);
            this.setVelocityY(this.accelerationY * this.speed * 1.1);
        }
        if(this.safeTimer >= 0){
            this.safeTimer -=1;
        }
    } 

    depthUpdate() {
        this.depth = this.y;
    }


    endGame(tagged){
        if(this.stunTimer <0 && tagged.stunTimer <0 && tagged.safeTimer <0){
            this.hasChoco = true;
            tagged.hasChoco = false;
            tagged.stunTimer = 5000;
            tagged.dead = true;

            if(tagged.x - this.x < 0 ){
                    tagged.accelerationX = -1 * randomfloat(0.5,0.9);

            }
            else{
                tagged.accelerationX = 1 * randomfloat(0.5,0.9);

            }
            if(tagged.y - this.y < 0 ){

                tagged.accelerationY = -1 * randomfloat(0.5,0.9);
            }
            else{
                tagged.accelerationY = 1 * randomfloat(0.5,0.9);
            }
            
        }
    }


    tryTag(tagged){

        if(this.stunTimer <0 && tagged.stunTimer <0 && tagged.safeTimer <0){

            for (let i = 0; i<2 ; i++) {
                console.log('swap');
                this.scene.safe1[i].forEach((safeBox) => {
                    safeBox.swap2(1);
                })
                // this.scene.safe1Overlap[i].forEach((safeBox) => {
                //     safeBox.swap();
                // })
                this.scene.safe2[i].forEach((safeBox) => {
                    safeBox.swap2(2);
                })
                // this.scene.safe2Overlap[i].forEach((safeBox) => {
                //     safeBox.swap();
                // })
            }




            this.hasChoco = true;
            tagged.hasChoco = false;
            tagged.stunTimer = 1500;

            if(tagged.x - this.x < 0 ){
                    tagged.accelerationX = -1 * randomfloat(0.5,0.9);

            }
            else{
                tagged.accelerationX = 1 * randomfloat(0.5,0.9);

            }
            if(tagged.y - this.y < 0 ){

                tagged.accelerationY = -1 * randomfloat(0.5,0.9);
            }
            else{
                tagged.accelerationY = 1 * randomfloat(0.5,0.9);
            }
            
        }
    }



    animate() {
        if (this.body.speed > 0) {
            if (this.body.velocity.x > 0) {
                this.flipX = false;
            }
            if (this.body.velocity.x < 0) {
                this.flipX = true;
            }
            if (this.anims.getName() != 'walk') {
                this.play('walk');
            }        }
        else {
            this.anims.play('idle');
        }
    }

    lerp (start, end, amt){//fonction qui fait transition entre deux valeur selon un facteur atm
        return (1-amt)*start+amt*end;
    }
}