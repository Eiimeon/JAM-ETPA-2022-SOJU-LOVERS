class SafeZone {
    constructor(_scene, _blocks = new Array(), _playerIndex, _colliderVersion = null) {

        this.scene = _scene;
        this.blocks = _blocks;
        this.playerIndex = _playerIndex;

        this.blocks.forEach((block) => {
            block.parent = this;
        })

        this.aled = 4;

        this.colliderVersion = _colliderVersion;
        this.isActive = true;

        this.hasPlayerOnIt = false;
        this.playerStayDuration = 0;
        this.timeAllowedOnSafeZone = 5000;
    }

    disableBody() {
        this.blocks.forEach((safeBlock) => {
            safeBlock.disableBody();
        })
    }

    update(delta) {
        // console.log(this.blocks[0].y);
        // console.log('hasPlayerOnIt : ' + this.hasPlayerOnIt)
        // console.log(this.playerStayDuration);


        // ### Check Présence ###
        if (this.scene.player1.safeTimer > 0 || this.scene.player2.safeTimer > 0) {
            this.hasPlayerOnIt = true;
        }
        else {
            this.hasPlayerOnIt = false;
        }


        // if (this.playerIndex == 1) {
        //     if (this.scene.player1.safeTimer<0) {
        //         this.hasPlayerOnIt = false;
        //     }
        // }
        // else if (this.playerIndex == 2) {
        //     if (this.scene.player2.safeTimer<0) {
        //         this.hasPlayerOnIt = false;
        //     }
        // }

        // ### Check Timer ###

        if (this.hasPlayerOnIt) {
            this.playerStayDuration += delta;
        }
        else {
            this.playerStayDuration = 0;
        }

        // ### Check Activité ###

        if ((this.playerStayDuration > this.timeAllowedOnSafeZone) && this.isActive) {

            // console.log(this.isActive)
            this.isActive = false;
            this.swap();
            this.scene.time.addEvent({ delay: 5000, callbackScope: this, callback: function () { this.isActive = true; console.log('retour de barrières') } });
            console.log(('hasPlayer : ' + this.hasPlayerOnIt))
            console.log(('active : ' + this.isActive))
        }

        // ### Make Tick ###
        
    }

    swap() {
        console.log('zoneswap')
        this.blocks.forEach((block) => {
            if (this.isActive) {
                block.swap3(this.playerIndex);
            }
            else {
                block.y = block.y0 + 6000;
            }
        })
    }
}