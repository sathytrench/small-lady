export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);

    //animations
    scene.anims.create({
      key: 'player-left',
      frames: scene.anims.generateFrameNumbers(spriteKey, {
        start: 0,
        end: 1
      }),
      frameRate: 10,
      repeat: -1
    })
    scene.anims.create({
      key: 'player-right',
      frames: scene.anims.generateFrameNumbers(spriteKey, {
        start: 0,
        end: 1
      }),
      frameRate: 10,
      repeat: -1
    })
    scene.anims.create({
      key: 'player-up',
      frames: scene.anims.generateFrameNumbers(spriteKey, {
        start: 0,
        end: 1
      }),
      frameRate: 10,
      repeat: -1
    })
    scene.anims.create({
      key: 'player-down',
      frames: scene.anims.generateFrameNumbers(spriteKey, {
        start: 0,
        end: 1
      }),
      frameRate: 10,
      repeat: -1
    })
    scene.anims.create({
      key: 'player-rest',
      frames: scene.anims.generateFrameNumbers(spriteKey, {
        start: 0,
        end: 0
      })
    })
  }

  moveInMap(direction) {
    if (direction === 'left'){
      this.scene.playerInMotion = true;
      this.setVelocityX(-160);
      this.anims.play('player-left', true);   
    } else if (direction === 'right'){
      this.scene.playerInMotion = true;
      this.setVelocityX(160);
      this.anims.play('player-right', true);  
    } else if (direction === 'up'){
      this.scene.playerInMotion = true;
      this.setVelocityY(-160);
      this.anims.play('player-up', true);
    } else if (direction === 'down'){
      this.scene.playerInMotion = true;
      this.setVelocityY(160);
      this.anims.play('player-down', true);
    } else {
      this.scene.playerInMotion = false;
      this.setVelocity(0,0);
      this.anims.play('player-rest', true);
      this.scene.currentLocation = this.scene.nextLocation;
      this.scene.playerDirection = '';
      this.scene.keyPressed = '';
    }
  }

  // updateMovement(cursors, walkSound) {
  //   // Move left
  //   if (cursors.left.isDown && !cursors.up.isDown && !cursors.down.isDown) {
  //     this.setVelocityX(-160);
  //     //this.anims.play('left', true);
  //   }
  //   // Move right
  //   else if (cursors.right.isDown && !cursors.up.isDown && !cursors.down.isDown) {
  //     this.setVelocityX(160);
  //     //this.anims.play('right', true);
  //   }
  //   // Move up
  //   else if (cursors.up.isDown && !cursors.left.isDown && !cursors.right.isDown) {
  //     this.setVelocityY(-160);
  //     //this.anims.play('left', true);
  //   }
  //   // Move down
  //   else if (cursors.down.isDown && !cursors.left.isDown && !cursors.right.isDown) {
  //     this.setVelocityY(160);
  //     //this.anims.play('right', true);
  //   }
    
  //   // Neutral (no movement)
  //   else {
  //     this.setVelocity(0, 0);
  //     //this.anims.play('turn');
  //   }
  //   // if (cursors.up.isDown && this.body.touching.down){
  //   //   this.setVelocityY(-330);
  //   //   jumpSound.play();
  //   // }
  // }

  // // Check which controller button is being pushed and execute movement & animation
  // update(cursors, walkSound) {
  //   this.updateMovement(cursors, walkSound);
  // }
}