import 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
  }

  updateMovement(cursors, walkSound) {
    // Move left
    if (cursors.left.isDown && !cursors.up.isDown && !cursors.down.isDown) {
      this.setVelocityX(-160);
      //this.anims.play('left', true);
    }
    // Move right
    else if (cursors.right.isDown && !cursors.up.isDown && !cursors.down.isDown) {
      this.setVelocityX(160);
      //this.anims.play('right', true);
    }
    // Move up
    else if (cursors.up.isDown && !cursors.left.isDown && !cursors.right.isDown) {
      this.setVelocityY(-160);
      //this.anims.play('left', true);
    }
    // Move down
    else if (cursors.down.isDown && !cursors.left.isDown && !cursors.right.isDown) {
      this.setVelocityY(160);
      //this.anims.play('right', true);
    }
    
    // Neutral (no movement)
    else {
      this.setVelocity(0, 0);
      //this.anims.play('turn');
    }
    // if (cursors.up.isDown && this.body.touching.down){
    //   this.setVelocityY(-330);
    //   jumpSound.play();
    // }
  }

  // Check which controller button is being pushed and execute movement & animation
  update(cursors, walkSound) {
    this.updateMovement(cursors, walkSound);
  }
}