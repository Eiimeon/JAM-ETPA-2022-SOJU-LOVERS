class SafeZoneBlock extends Phaser.Physics.Arcade.Sprite {
    constructor(_scene, _x = 64, _y = 64, _root) {
        super(_scene, _x, _y, 'transparent');

        _scene.add.existing(this);
        _scene.physics.add.existing(this);

        this.y0 = _y;
        this.root = _root;

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
        if (playerIndex == 1) {
            if (this.scene.player1.hasChoco) {
                this.y = this.y0 + 6000;
            }
            else {
                this.y = this.y0;
            } 
        }
        // else if (playerIndex == 1 && overlap) {
        //     if (this.scene.player1.hasChoco) {
        //         this.y = this.y0;
        //     } 
        //     else {
        //         this.y = y0 + 6000;
        //     } 
        // }
        else if (playerIndex == 2) {
            if (this.scene.player2.hasChoco) {
                this.y = this.y0 + 6000;
            }
            else {
                this.y = this.y0;
            } 
        }
        // else if (playerIndex == 2 && overlap) {
        //     if (this.scene.player1.hasChoco) {
        //         this.y = this.y0;
        //     } 
        //     else {
        //         this.y = y0 + 6000;
        //     } 
        // }
    }
}