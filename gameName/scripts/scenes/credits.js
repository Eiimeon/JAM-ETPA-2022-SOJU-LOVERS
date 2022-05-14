class Credits extends Phaser.Scene {
    constructor() {
        super({
            key: 'Credits',
        })
    }



    preload() { }

    create() {
        this.add.image(1920 / 2, 1080 / 2, 'controlsMenu');

        
        this.cameras.main.pan(0,2000,10000);
        this.timer = this.time.addEvent({delay :10000,callbackScope : this,callback: function(){
            this.scene.start('StartScreen');
        }})
    }

    update() { 
        console.log(this.timer.getElapsed());
    }
}   