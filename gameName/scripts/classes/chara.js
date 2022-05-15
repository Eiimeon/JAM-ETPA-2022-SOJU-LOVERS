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
        this.touchTimer = 0;
        console.log(this.controlsType)
        if(this.controlsType){
            this.hasChoco = true;
        }
        this.setOrigin(0.5,0.5)
        this.score = 0;


        // Animations
        if(this.controlsType){
                this.anims.create({
                key: 'run',
                frames: this.anims.generateFrameNumbers('marco', { frames: [0, 1, 2, 6] }),
                frameRate: 6,
                repeat: -1
            })

            this.anims.create({
                key: 'idle',
                frames: this.anims.generateFrameNumbers('marco', { frames: [1] }),
                frameRate: 4,
                repeat: -1
            })

            
            this.anims.create({
                key: 'stun',
                frames: this.anims.generateFrameNumbers('marco', { frames: [3,4,5,9,10,11] }),
                frameRate: 8,
                repeat: -1
            })
            this.anims.create({
                key: 'fall',
                frames: this.anims.generateFrameNumbers('marco', { frames: [3,4,5,15,16,17] }),
                frameRate: 8,
                repeat: 0
            })
            this.anims.create({
                key: 'touch',
                frames: this.anims.generateFrameNumbers('marco', { frames: [7] }),
                frameRate: 8,
                repeat: 0
            })

        }else{
            this.anims.create({
                key: 'run',
                frames: this.anims.generateFrameNumbers('marco', { frames: [0, 1, 2, 6] }),
                frameRate: 6,
                repeat: -1
            })

            this.anims.create({
                key: 'idle',
                frames: this.anims.generateFrameNumbers('marco', { frames: [1] }),
                frameRate: 4,
                repeat: -1
            })

            
            this.anims.create({
                key: 'stun',
                frames: this.anims.generateFrameNumbers('marco', { frames: [3,4,5,9,10,11] }),
                frameRate: 8,
                repeat: -1
            })
            this.anims.create({
                key: 'fall',
                frames: this.anims.generateFrameNumbers('marco', { frames: [3,4,5,15,16,17] }),
                frameRate: 8,
                repeat: 0
            })
            this.anims.create({
                key: 'touch',
                frames: this.anims.generateFrameNumbers('marco', { frames: [7] }),
                frameRate: 8,
                repeat: 0
            })

        }

        

    }

    move(delta) {
        
        
        if(this.stunTimer < 0 && !this.dead && this.touchTimer <= 0){

        
            if(this.controlsType)
            {
                if(this.scene.cursors.left.isDown){
                    

                    if(this.accelerationX >=0){
                        this.accelerationX -= 0.001 * delta * this.turnDecelerationFactor;
                        
                    }
                    else if(this.accelerationX > -1){
                        this.accelerationX -= 0.001 * delta * this.accelerationFactor;
                    }
                    this.play('run',true);

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
                    this.play('run',true);

                }else{

                    if(this.accelerationX <= -0.02 ){
                        this.accelerationX += 0.001 * delta * this.decelerationFactor;
                    
                    }else if(this.accelerationX >= 0.02 ){
                        this.accelerationX -= 0.001 * delta * this.decelerationFactor;

                    }else{
                        this.accelerationX = 0;

                    }
                    this.play('idle',true);
                }
                //up and doww
                if(this.scene.cursors.up.isDown){
                    

                    if(this.accelerationY >=0){
                        this.accelerationY -= 0.001 * delta * this.turnDecelerationFactor;
                        
                    }
                    else if(this.accelerationY > -1){
                        this.accelerationY -= 0.001 * delta * this.accelerationFactor;
                    }
                    this.play('run',true);
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
                    this.play('run',true);
                    
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
                    this.play('run',true);
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
                    this.play('run',true);
                    
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
                    this.play('run',true);

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
                    this.play('run',true);

                    
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

            //this.setTint(0xff0000);
            if(!this.dead){
            this.play('stun',true);

            }
            this.accelerationX = this.lerp(this.accelerationX,0,delta * 0.0015 * this.decelerationFactor);
            this.accelerationY = this.lerp(this.accelerationY,0,delta * 0.0015 * this.decelerationFactor);



        }else{
            this.setTint(0xffffff);
        }
        if(this.hasChoco){
            this.score += delta;
            this.setVelocityX(this.accelerationX * this.speed);
            this.setVelocityY(this.accelerationY * this.speed);
            //this.setTint(0xffff00);
        }else{
            this.setVelocityX(this.accelerationX * this.speed * 1.1);
            this.setVelocityY(this.accelerationY * this.speed * 1.1);
            
        }
        if(this.safeTimer >= 0){
            this.safeTimer -=1;
        }
        if(this.touchTimer >=0){

            this.touchTimer -=delta *0.001;
            this.play('touch',true);
        }
    } 

    depthUpdate() {
        this.depth = this.y;
    }


    endGame(tagged,tempchoco){
        if(this.stunTimer <0 && tagged.stunTimer <0 && tagged.safeTimer <0){
            this.touchTimer = 2*0.125;
            this.hasChoco = true;
            tagged.hasChoco = false;
            tagged.stunTimer = 1500;
            tagged.dead = true;
            tagged.play('fall',true);
            if(tagged.x - this.x < 0 ){
                    tagged.accelerationX = -2.1 * randomfloat(0.6,0.9);

            }
            else{
                tagged.accelerationX = 2.1 * randomfloat(0.6,0.9);

            }
            if(tagged.y - this.y < 0 ){

                tagged.accelerationY = -2.1 * randomfloat(0.6,0.9);
            }
            else{
                tagged.accelerationY = 2.1 * randomfloat(0.6,0.9);
            }
            tempchoco.getChoco();
        }
        
    }


    tryTag(tagged,tempchoco){
        
        if(this.stunTimer <0 && tagged.stunTimer <0 && tagged.safeTimer <0){
            this.touchTimer = 2*0.125;
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
            tagged.stunTimer = 1200;

            if(tagged.x - this.x < 0 ){
                    tagged.accelerationX = -1.5 * randomfloat(0.6,0.9);

            }
            else{
                tagged.accelerationX = 1.5 * randomfloat(0.6,0.9);

            }
            if(tagged.y - this.y < 0 ){

                tagged.accelerationY = -1.5 * randomfloat(0.6,0.9);
            }
            else{
                tagged.accelerationY = 1.5 * randomfloat(0.6,0.9);
            }
           tempchoco.getChoco(); 
        }
        
    }



    animate() {

        if (this.accelerationX + this.accelerationY != 0) {
            if (this.accelerationX >= 0.05) {
                //this.play('run',true);
                this.flipX = true;
            }
            if (this.accelerationX <= -0.05) {
                //this.play('run',true);
                this.flipX = false;
            }

                
        }
        else {
            this.anims.play('idle',true);
        }
    }

    lerp (start, end, amt){//fonction qui fait transition entre deux valeur selon un facteur atm
        return (1-amt)*start+amt*end;
    }
}