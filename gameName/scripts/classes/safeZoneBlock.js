class SafeZoneBlock extends Phaser.Physics.Arcade.Sprite {
    constructor(_scene, _x = 64, _y = 64, _parent = null) {
        super(_scene, _x, _y, 'transparent');

        _scene.add.existing(this);
        _scene.physics.add.existing(this);

        this.scene = _scene;

        this.y0 = _y;
        this.parent = parent;

        this.setImmovable();
    }

    swap() {
        console.log('swap');
        if (this.y = this.y0) {
            this.y = this.y0 + 6000;
        }
        else {
            this.y = this.y0;
        }
    }

    swap2(playerIndex) {
        if (this.parent.isActive) {
            if (playerIndex == 1) {
                if (this.scene.player1.hasChoco) {
                    // console.log('pas là');
                    this.y = this.y0 + 6000;
                }
                else {
                    this.y = this.y0;
                    // console.log('là');
                } 
            }
    
            else if (playerIndex == 2) {
                if (this.scene.player2.hasChoco) {
                    // console.log('pas là 2');
                    this.y = this.y0 + 6000;
                }
                else {
                    this.y = this.y0;
                } 
            }
        }
        else {
            // console.log('inactive swap');
            this.y = this.y0 + 6000;
            // this.body.enable=false;
            // console.log(this.y)
        }
        this.refreshBody();
    }

    swap3(playerIndex) {
        console.log('blocswap');
        if (playerIndex == 1) {
            if (this.scene.player1.hasChoco) {
                // console.log('pas là');
                this.y = this.y0 + 6000;
            }
            else {
                this.y = this.y0;
                // console.log('là');
            } 
        }
        else if (playerIndex == 2) {
            if (this.scene.player2.hasChoco) {
                // console.log('pas là 2');
                this.y = this.y0 + 6000;
            }
            else {
                this.y = this.y0;
            } 
        }
        this.refreshBody();
    }
}