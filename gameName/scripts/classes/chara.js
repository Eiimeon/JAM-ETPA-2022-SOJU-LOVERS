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
        this.turnDecelerationFactor = 4;

        this.hasChoco = false;
        this.stunTimer = -1;


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

        this.setVelocityX(this.accelerationX * this.speed);
        this.setVelocityY(this.accelerationY * this.speed);
        if(this.stunTimer >= 0){
            //do stun stuff
            this.stunTimer -= delta;
            this.setTint(0xff0000);
        }else{
            this.setTint(0xffffff);
        }
        if(this.hasChoco){

            this.setTint(0xffff00);
        }
    } 

    depthUpdate() {
        this.depth = this.y;
    }


    tryTag(tagged){

        if(this.stunTimer <0 && tagged.stunTimer <0){
            this.hasChoco = true;
            tagged.hasChoco = false;
            tagged.stunTimer = 2000;

            if(tagged.x - this.x < 0 ){
                    tagged.accelerationX = -1 * randomfloat(0.9,1.2);

            }
            else{
                tagged.accelerationX = 1 * randomfloat(0.9,1.2);

            }
            if(tagged.y - this.y < 0 ){

                tagged.accelerationY = -1 * randomfloat(0.9,1.2);
            }
            else{
                tagged.accelerationY = 1 * randomfloat(0.9,1.2);
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
}